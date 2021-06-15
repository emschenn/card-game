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
import Modal from "./Modal";
import GameIdBox from "./GameIdBox";
import Header from "./Header";
import Helper from "./Helper";
import Discussion from "./Discussion";

// utils
import {
  receiveCardFromWho,
  getAlivePlayersArray,
  receivePassCardArray,
  calculateTotalPooPoint,
  decideDiePlayer,
  getRandomCardNum,
  checkIsAllAlivePlayersThreeCards,
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
  const [helper, setHelper] = useState({
    isOpen: false,
    config: { id: -1, text: "" },
  });
  const [modal, setModal] = useState({
    isOpen: false,
    num: -1,
  });
  const [discussion, setDiscussion] = useState({
    isOpen: false,
    state: -1,
  });
  const [showDrawCardButton, setShowDrawCardButton] = useState(false);

  useEffect(() => {
    if (!me) {
      router.push("/startGame");
    }
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
          // if everybody join
          if (Object.keys(players).length === playersCount) {
            openHelper(0, "快快確認角色牌\n準備上工!");
            setMsg("選擇要傳給隔壁的人的卡牌");
            // only the last person do the global update
            if (Object.keys(players)[playersCount - 1] === me.id) {
              updates[`games/${id}/step`] = 1;
              updates[`games/${id}/round`] = 1;
              updates[`games/${id}/isStart`] = true;
              db.ref().update(updates);
            }
          }
        } else {
          // if everybody is ready for the next round
          if (checkIsAllAlivePlayersThreeCards(players)) {
            openHelper(0, `開始第${round}回合`);
            if (me.isAlive) setMsg("選擇要傳給隔壁的人的卡牌");
            updates[`games/${id}/votePlayers`] = { isEmpty: true };
            updates[`games/${id}/passCards`] = { isEmpty: true };
            updates[`games/${id}/playCards`] = { isEmpty: true };
            updates[`games/${id}/step`] = 1;
            db.ref().update(updates);
          }
        }
      } else if (step === 1) {
        if (
          !passCards.isEmpty &&
          Object.keys(passCards).length === alivePlayers.length
        ) {
          if (me.isAlive) {
            setMsg("選擇要出的卡牌");
            const receive = receiveCardFromWho(me.id, players, passCards);
            openHelper(
              1,
              `叮咚!\n你收到了來自${receive.from}的${receive.card}`
            );
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
          if (round !== 3) {
            if (me.isAlive) setMsg("選擇要淘汰的人");
            openModal(0);
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
          // const winCamp = decideWhoWins(pooPoint, playersCount);
          // showResult(me.camp, winCamp);
          openModal(5);

          return;
        }

        if (
          !votePlayers.isEmpty &&
          Object.keys(votePlayers).length === alivePlayers.length
        ) {
          const diePlayer = decideDiePlayer(votePlayers);
          if (!diePlayer) {
            setDiscussion({ isOpen: true, state: 1 });
            setModal({ isOpen: true, num: 4 });
            // only the last person do the global update
            if (Object.keys(votePlayers)[alivePlayers.length - 1] === me.id) {
              updates[`games/${id}/votePlayers`] = { isEmpty: true };
              db.ref().update(updates);
            }
          } else {
            if (me.id === diePlayer) {
              setModal({ isOpen: true, num: 2 });
              setMe({ ...me, isAlive: false });
              setMsg("你已被淘汰，現在開始只能觀賽、不能動作");
            } else {
              if (!me.isAlive) {
                setDiscussion({ isOpen: false, state: -1 });
                openHelper(
                  2,
                  `投票結果：${players[diePlayer].name}已經被淘汰 👋🏼`
                );
                return;
              }
              setModal({ isOpen: true, num: 3 });
            }
            // only the last person do the global update
            if (Object.keys(votePlayers)[alivePlayers.length - 1] === me.id) {
              updates[`games/${id}/players/${diePlayer}/isAlive`] = false;
              updates[`games/${id}/round`] = round + 1;
              updates[`games/${id}/step`] = 0;
              db.ref().update(updates);
            }
            if (me.isAlive) setMsg("");
          }
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

  const openHelper = (id, text) => {
    setHelper({ isOpen: true, config: { id, text } });
  };

  const openModal = (num) => {
    setModal({ isOpen: true, num });
  };

  const goDiscuss = () => {
    setModal({ isOpen: false, num: -1 });
    setDiscussion({ isOpen: true, state: 0 });
  };

  const goVote = () => {
    setModal({ isOpen: false, num: -1 });
    setDiscussion({ ...discussion, state: 1 });
  };

  const closeDiscussion = () => {
    const diePlayer = decideDiePlayer(gameState.votePlayers);
    console.log(diePlayer);
    console.log(me);
    setDiscussion({ isOpen: false, state: -1 });
    setModal({ isOpen: false, num: -1 });
    if (diePlayer === me.id) {
      openHelper(2, `投票結果：你已經被淘汰 👋🏼`);
    } else {
      setShowDrawCardButton(true);
      openHelper(
        2,
        `投票結果：${gameState.players[diePlayer].name}已經被淘汰 👋🏼`
      );
    }
  };

  return (
    <div className={styles.game}>
      <AnimatePresence>
        {discussion.isOpen && (
          <Discussion
            id={id}
            state={discussion.state}
            gameState={gameState}
            setDiscussion={setDiscussion}
            setModal={setModal}
            setMe={setMe}
          />
        )}
      </AnimatePresence>
      <Header styles={styles} gameState={gameState} msg={msg} />
      <AnimatePresence>
        {helper.isOpen && (
          <Helper
            config={helper.config}
            closeHelper={() => {
              setHelper({ isOpen: false, config: { id: -1, text: "" } });
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {modal.isOpen && (
          <Modal
            num={modal.num}
            gameState={gameState}
            closeModal={() => {
              setModal({ isOpen: false, num: -1 });
            }}
            goVote={goVote}
            goDiscuss={goDiscuss}
            closeDiscussion={closeDiscussion}
          />
        )}
      </AnimatePresence>
      {gameState.isStart ? (
        <OwnPanel
          id={id}
          gameState={gameState}
          setMsg={setMsg}
          styles={styles}
          drawCard={drawCard}
          showDrawCardButton={showDrawCardButton}
        />
      ) : (
        <GameIdBox id={id} styles={styles} />
      )}
      <PlayersPanel id={id} gameState={gameState} styles={styles} />
    </div>
  );
};

export default Game;
{
  /* <div
        onClick={
          //    () => openHelper(1, "hellohellohel\nlohellohellohellohellohello")
          () => openModal(0)
        }
      >
        test helper
      </div> */
}

// {showDrawCardButton && (
//   <div className={styles.drawCard} onClick={drawCard}>
//     抽牌
//   </div>
// )}
