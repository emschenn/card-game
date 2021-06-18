import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Popup.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

// interface
import { IGameConfig } from "../../interfaces/gameConfig";

interface IProps {
  gameState: IGameConfig;
  winner: number;
}

const backdropAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
};

const modalAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const GameOver = ({ gameState, winner }: IProps) => {
  const router = useRouter();
  const { players } = gameState;

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={styles.gameOver}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => router.push("/")}
      >
        <div className={styles.content}>
          <h2>＝遊戲結束＝</h2>
          <div className={styles.players}>
            {Object.entries(players).map(([_, value]) => {
              if (value.camp === winner) {
                return <div className={styles.player}> {value.name} </div>;
              }
            })}
          </div>
          <h1>
            <span>{winner === 0 ? "清道夫" : "搗蛋鬼"}</span>勝利
          </h1>
        </div>
        <div
          className={styles.img}
          style={{ top: winner === 0 ? "1.5rem" : "3rem" }}
        >
          <Image
            src={
              winner === 0
                ? "/img/modal/good-win.png"
                : "/img/modal/bad-win.png"
            }
            alt={winner === 0 ? "清道夫" : "搗蛋鬼"}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;
