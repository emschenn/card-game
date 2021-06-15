import React, { useContext, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import styles from "../../styles/Popup.module.scss";

// data
import { FOOD_CARD } from "../../data/card";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// interface
import { IGameConfig } from "../../interfaces/gameConfig";
import PoopsLoader from "../ui/PoopsLoader";

/*******************
 * 0: discussion
 * 1: vote
 * 2: pending
 *******************/

interface IProps {
  id: string;
  state: number;
  gameState: IGameConfig;
  setModal: ({}) => void;
  setMe: ({}) => void;
  setDiscussion: ({}) => void;
}

const animation = {
  hidden: { y: "-100vh ", opacity: 0 },
  visible: {
    y: "0vh ",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    // y: "0vh ",
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
};

const a = [
  { player: "dfer" },
  { player: "dfer" },
  { player: "dfer" },
  { player: "dfer" },
  { player: "dfer" },
  { player: "dfer" },
  { player: "dfer" },
];

const Discussion = ({
  id,
  state,
  gameState,
  setModal,
  setMe,
  setDiscussion,
}: IProps) => {
  const [sec, setSec] = useState(3);
  const [selectPlayer, setSelectPlayer] = useState(null);
  const config = Object.entries(gameState.playCards).map(([key, value]) => ({
    player: { id: key, ...gameState.players[key] },
    card: value,
  }));
  const { votePlayers } = gameState;

  const { me } = useContext(GameContext);
  const db = useContext(FirebaseContext);

  useEffect(() => {
    if (state !== 0) return;
    let timer;
    if (sec > 0) {
      timer = setInterval(() => setSec(sec - 1), 1000);
    }
    if (sec === 0) {
      setModal({ isOpen: true, num: 1 });
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [sec]);

  const doubleOnClick = (e) => {
    setDiscussion({ isOpen: true, state: 2 });
    setSelectPlayer(null);
    e.stopPropagation();
    const updates = {};
    const votePlayer = {};
    votePlayer[me.id] = selectPlayer;
    updates[`games/${id}/votePlayers`] = votePlayers.isEmpty
      ? votePlayer
      : { ...votePlayers, ...votePlayer };
    db.ref().update(updates);
  };

  return (
    <motion.div
      className={styles.discussion}
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {config.map(({ player, card }) => (
        <div
          key={player.id}
          className={state === 0 ? styles.container : styles.voteContainer}
          onClick={
            state === 0 || !me.isAlive ? null : () => setSelectPlayer(player.id)
          }
          style={{
            backgroundColor:
              player.id === selectPlayer && state === 1
                ? "#8b827580 "
                : "transparent",
          }}
        >
          {player.id === selectPlayer && state === 1 && (
            <div className={styles.isSelect} onClick={doubleOnClick}>
              確定淘汰 {player.name}？<p>點擊這裡確定送出</p>
            </div>
          )}
          <div className={styles.img}>
            <Image
              src={FOOD_CARD[card].img}
              alt="text"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.avatar}>{player.name}</div>
        </div>
      ))}
      {state === 0 && <div className={styles.timer}>{sec}</div>}{" "}
      <div className={styles.hint}>
        {(state === 2 || !me.isAlive) && (
          <>
            <div className={styles.loading}>
              <PoopsLoader />
            </div>
            <p style={{ marginTop: "-1.8rem" }}>等待大家完成投票</p>
          </>
        )}
        {state === 1 && me.isAlive && (
          <>
            <div className={styles.voting}>
              <svg
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 84C7 84 0 84 0 77C0 70 7 49 42 49C77 49 84 70 84 77C84 84 77 84 77 84H7ZM42 42C47.5695 42 52.911 39.7875 56.8492 35.8492C60.7875 31.911 63 26.5695 63 21C63 15.4305 60.7875 10.089 56.8492 6.15076C52.911 2.21249 47.5695 0 42 0C36.4305 0 31.089 2.21249 27.1508 6.15076C23.2125 10.089 21 15.4305 21 21C21 26.5695 23.2125 31.911 27.1508 35.8492C31.089 39.7875 36.4305 42 42 42Z"
                  fill="#5E493C"
                />
                <circle cx="42" cy="31" r="31" fill="#5E493C" />
                <path
                  d="M41.04 60.624C39.984 60.624 39.104 60.272 38.4 59.568C37.696 58.832 37.344 57.904 37.344 56.784C37.344 55.664 37.696 54.736 38.4 54C39.104 53.232 39.984 52.848 41.04 52.848C42.064 52.848 42.944 53.216 43.68 53.952C44.384 54.72 44.736 55.664 44.736 56.784C44.736 57.904 44.384 58.832 43.68 59.568C42.976 60.272 42.096 60.624 41.04 60.624ZM40.8 48.72C40.096 48.72 39.536 48.448 39.12 47.904C38.736 47.392 38.528 46.752 38.496 45.984C38.688 44.608 39.2 43.232 40.032 41.856C40.512 41.024 41.36 39.888 42.576 38.448C43.664 37.136 44.4 36.144 44.784 35.472C45.424 34.384 45.744 33.344 45.744 32.352C45.744 30.976 45.344 29.872 44.544 29.04C43.68 28.144 42.512 27.696 41.04 27.696C39.568 27.696 38.192 28.16 36.912 29.088C35.792 30.112 34.704 30.16 33.648 29.232C32.624 28.272 32.608 27.296 33.6 26.304C36 24.224 38.688 23.184 41.664 23.184C44.512 23.184 46.784 23.952 48.48 25.488C50.24 27.056 51.12 29.216 51.12 31.968C51.12 33.504 50.688 35.008 49.824 36.48C49.312 37.344 48.384 38.576 47.04 40.176L46.944 40.272C46.912 40.304 46.864 40.352 46.8 40.416C45.872 41.568 45.216 42.448 44.832 43.056C44.192 44.048 43.776 45.008 43.584 45.936C43.52 46.8 43.248 47.488 42.768 48C42.288 48.48 41.632 48.72 40.8 48.72Z"
                  fill="white"
                />
              </svg>
            </div>
            <p style={{ marginTop: "1rem" }}>點擊你要投票的對象</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Discussion;
