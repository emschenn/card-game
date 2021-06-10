import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// interface
import { IGameConfig } from "../../interfaces/gameConfig";

// components
import OwnPanel from "./OwnPanel";
import PlayersPanel from "./PlayersPanel";
import AnimateModal from "../ui/AnimateModal";
import GameIdBox from "./GameIdBox";
import Modal from "../Intro/Modal";

// utils
import {
  getAlivePlayersArray,
  receivePassCardArray,
  calculateTotalPooPoint,
  decideDiePlayer,
  getRandomCardNum,
  checkIsAllAlivePlayersThreeCards,
  decideWhoWins,
} from "../../utils/gameUtils";

interface IProps {
  id: string;
  gameState: IGameConfig;
  setGameState: Function;
  styles: CSSModule;
}

const Game = ({ id, gameState, setGameState, styles }: IProps) => {
  const router = useRouter();
  const db = useContext(FirebaseContext);
  const { me, setMe } = useContext(GameContext);
  const [msg, setMsg] = useState("");
  const [modalConfig, setModalConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [openIntroModal, setOpenIntroModal] = useState(false);
  const [showDrawCardButton, setShowDrawCardButton] = useState(false);

  const openModal = (props) => {
    console.log("show modal!");
    console.log(props);
    setModalConfig(props);
    setShowModal(true);
  };

  useEffect(() => {
    // if (!me) {
    //   router.push("/");
    // }
    const ref = db.ref(`games/${id}`);
    ref.on("value", (snapshot) => {
      const newState = snapshot.val();
      setGameState(newState);
      const updates = {};
      const {
        step,
        isStart,
        players,
        pooPoint,
        playersCount,
        round,
        passCards,
        playCards,
        votePlayers,
      } = newState;
      const alivePlayers = getAlivePlayersArray(players);
      if (step === 0) {
        if (!isStart) {
          setMsg("等待大家加入...");
          // if everybody join
          if (Object.keys(players).length === playersCount) {
            openModal({ title: "遊戲開始💩" });
            setMsg("選擇要傳給隔壁的人的牌");
            // only the last person do the global update
            if (Object.keys(players)[playersCount - 1] === me.id) {
              updates[`games/${id}/step`] = 1;
              updates[`games/${id}/isStart`] = true;
              db.ref().update(updates);
            }
          }
        } else {
          // if everybody is ready for the next round
          if (checkIsAllAlivePlayersThreeCards(players)) {
            openModal({
              title: "遊戲開始💩",
              subtitle: `第${round}回合`,
            });
            setMsg("選擇要傳給隔壁的人的牌");
            updates[`games/${id}/step`] = 1;
            db.ref().update(updates);
          }
        }
      } else if (step === 1) {
        if (
          !passCards.isEmpty &&
          Object.keys(passCards).length === alivePlayers.length
        ) {
          setMsg("選擇要出的牌");
          // only the last person do the global update, other update own cards
          //Object.keys(passCards)[alivePlayers.length - 1] === me.id
          if (me.isAlive) {
            updates[`games/${id}/players/${me.id}/handCards`] =
              receivePassCardArray(me.id, players, passCards);
            updates[`games/${id}/step`] = 2;
            db.ref().update(updates);
          }
        }
      } else if (step === 2) {
        if (
          !playCards.isEmpty &&
          Object.keys(playCards).length === alivePlayers.length
        ) {
          const newPoint = calculateTotalPooPoint(playCards, pooPoint);
          openModal({
            title: `更新💩指數 ${newPoint}`,
            subtitle: `目前是第${round}回合`,
          });
          if (round !== 3) {
            setMsg("選擇要淘汰的人");
          } else {
            setMsg("");
          }
          // only the last person do the global update
          if (Object.keys(playCards)[alivePlayers.length - 1] === me.id) {
            updates[`games/${id}/pooPoint`] = newPoint;
            updates[`games/${id}/step`] = 3;
            db.ref().update(updates);
          }
        }
      } else if (step === 3) {
        if (round === 3) {
          const winCamp = decideWhoWins(pooPoint, playersCount);
          showResult(me.camp, winCamp);
          return;
        }
        if (
          !votePlayers.isEmpty &&
          Object.keys(votePlayers).length === alivePlayers.length
        ) {
          const diePlayer = decideDiePlayer(votePlayers);
          if (!diePlayer) {
            openModal({ title: "平手，請大家重投" });
            // only the last person do the global update
            if (Object.keys(votePlayers)[alivePlayers.length - 1] === me.id) {
              updates[`games/${id}/votePlayers`] = { isEmpty: true };
              db.ref().update(updates);
            }
            return;
          }
          if (me.id === diePlayer) {
            openModal({
              title: "你已被淘汰",
              subtitle: "👋🏼👋🏼",
              showButton: true,
            });
            setMe({ ...me, isAlive: false });
          } else {
            openModal({
              title: `${players[diePlayer].name}已被淘汰`,
              subtitle: "進入第二回合，開始前請先抽牌",
              showButton: true,
            });
            setShowDrawCardButton(true);
          }
          // only the last person do the global update
          if (Object.keys(votePlayers)[alivePlayers.length - 1] === me.id) {
            updates[`games/${id}/players/${diePlayer}/isAlive`] = false;
            updates[`games/${id}/round`] = round + 1;
            updates[`games/${id}/step`] = 0;
            updates[`games/${id}/votePlayers`] = { isEmpty: true };
            updates[`games/${id}/passCards`] = { isEmpty: true };
            updates[`games/${id}/playCards`] = { isEmpty: true };
            db.ref().update(updates);
          }
          setMsg("");
        }
      }
    });

    return () => ref.off();
  }, [me]);

  const drawCard = () => {
    const myCards = gameState.players[me.id].handCards;
    if (myCards.length < 3) {
      const updates = {};
      updates[`games/${id}/players/${me.id}/handCards`] = [
        ...myCards,
        ...getRandomCardNum(1),
      ];
      db.ref().update(updates);
      setShowDrawCardButton(false);
    }
  };

  const showResult = (myCamp, winCamp) => {
    const winner = winCamp === 0 ? "清道夫勝利" : "搗蛋鬼勝利";
    const subtitle = myCamp === winCamp ? `恭喜，${winner}` : `歪歪，${winner}`;
    openModal({
      title: "遊戲結束",
      subtitle,
    });
  };

  const restartTheGame = () => {};

  return (
    <div className={styles.game}>
      <PlayersPanel id={id} gameState={gameState} styles={styles} />
      <AnimatePresence>
        {showModal && (
          <AnimateModal
            config={modalConfig}
            show={showModal}
            setShow={setShowModal}
          />
        )}
      </AnimatePresence>

      <div className={styles.msg}>{msg} </div>
      {gameState.isStart ? (
        <>
          <div className={styles.pooPoint}> 💩: {gameState.pooPoint}</div>
          <OwnPanel
            id={id}
            gameState={gameState}
            setMsg={setMsg}
            styles={styles}
          />
          {showDrawCardButton && (
            <div className={styles.drawCard} onClick={drawCard}>
              抽牌
            </div>
          )}
        </>
      ) : (
        <GameIdBox id={id} styles={styles} />
      )}
      <div
        className={styles.openIntro}
        onClick={() => {
          setOpenIntroModal(true);
        }}
      ></div>
      <AnimatePresence>
        {openIntroModal && <Modal setOpenIntroModal={setOpenIntroModal} />}
      </AnimatePresence>
    </div>
  );
};

export default Game;
