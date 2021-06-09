import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// interface
import { IGameConfig } from "../../interfaces/gameConfig";

// components
import OwnPanel from "./OwnPanel";
import PlayersPanel from "./PlayersPanel";
import AnimateModal from "../ui/AnimateModal";
import GameIdBox from "./GameIdBox";

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

const Poops = styled.div`
  margin: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  background-color: brown;
`;

interface IProps {
  id: string;
  gameState: IGameConfig;
  setGameState: Function;
}

const Game = ({ id, gameState, setGameState }: IProps) => {
  const router = useRouter();
  const db = useContext(FirebaseContext);
  const { me, setMe } = useContext(GameContext);
  const [msg, setMsg] = useState("");
  const [modalConfig, setModalConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDrawCardButton, setShowDrawCardButton] = useState(false);

  const openModal = (props) => {
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
      if (newState.step === 0) {
        if (!newState.isStart) {
          setMsg("等待大家加入...");
          if (Object.keys(newState.players).length === newState.playersCount) {
            openModal({ title: "遊戲開始💩" });
            updates[`games/${id}/step`] = 1;
            setMsg("選擇要傳給隔壁的人的牌");
            updates[`games/${id}/isStart`] = true;
            db.ref().update(updates);
          }
        } else {
          if (checkIsAllAlivePlayersThreeCards(newState.players)) {
            openModal({
              title: "遊戲開始💩",
              subtitle: `第${newState.round}回合`,
            });
            updates[`games/${id}/step`] = 1;
            setMsg("選擇要傳給隔壁的人的牌");
            db.ref().update(updates);
          }
        }
      } else if (newState.step === 1) {
        if (
          !newState.passCards.isEmpty &&
          Object.keys(newState.passCards).length ===
            getAlivePlayersArray(newState.players).length
        ) {
          const { players, passCards } = newState;
          updates[`games/${id}/step`] = 2;
          setMsg("選擇要出的牌");
          if (me.isAlive) {
            updates[`games/${id}/players/${me.id}/handCards`] =
              receivePassCardArray(me.id, players, passCards);
          }
          console.log(updates);
          db.ref().update(updates);
        }
      } else if (newState.step === 2) {
        if (
          !newState.playCards.isEmpty &&
          Object.keys(newState.playCards).length ===
            getAlivePlayersArray(newState.players).length
        ) {
          const { playCards, pooPoint } = newState;
          const newPoint = calculateTotalPooPoint(playCards, pooPoint);
          updates[`games/${id}/pooPoint`] = newPoint;
          updates[`games/${id}/step`] = 3;
          if (newState.round !== 3) {
            setMsg("選擇要淘汰的人");
          } else {
          }
          openModal({
            title: `更新💩指數 ${newPoint}`,
            subtitle: `第${newState.round}回合`,
          });
          db.ref().update(updates);
        }
      } else if (newState.step === 3) {
        if (newState.round === 3) {
          const { pooPoint, playerCount } = newState;
          const winCamp = decideWhoWins(pooPoint, playerCount);
          showResult(me.camp, winCamp);
          return;
        }

        if (
          !newState.votePlayers.isEmpty &&
          Object.keys(newState.votePlayers).length ===
            getAlivePlayersArray(newState.players).length
        ) {
          const { votePlayers, players } = newState;
          const diePlayer = decideDiePlayer(votePlayers);
          if (!diePlayer) {
            openModal({ title: "平手，請大家重投" });
            updates[`games/${id}/votePlayers`] = { isEmpty: true };
            db.ref().update(updates);
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
          updates[`games/${id}/players/${diePlayer}/isAlive`] = false;
          updates[`games/${id}/round`] = newState.round + 1;
          updates[`games/${id}/step`] = 0;
          updates[`games/${id}/votePlayers`] = { isEmpty: true };
          updates[`games/${id}/passCards`] = { isEmpty: true };
          updates[`games/${id}/playCards`] = { isEmpty: true };
          db.ref().update(updates);
          setMsg("");
        }
      }
    });

    return () => ref.off();
  }, []);

  console.log("me");
  console.log(me);
  console.log("gameState");
  console.log(gameState);

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
    <div className="game">
      <PlayersPanel id={id} gameState={gameState} />
      <AnimateModal
        config={modalConfig}
        show={showModal}
        setShow={setShowModal}
      />
      <div className="msg">{msg} </div>
      {gameState.isStart ? (
        <>
          <div className="poo-point">💩: {gameState.pooPoint}</div>
          <OwnPanel id={id} gameState={gameState} setMsg={setMsg} />
          {showDrawCardButton && (
            <div className=" button draw-card" onClick={drawCard}>
              抽牌
            </div>
          )}
        </>
      ) : (
        <GameIdBox id={id} />
      )}
    </div>
  );
};

export default Game;
