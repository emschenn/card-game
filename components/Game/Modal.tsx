import React, { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

// context
import { GameContext } from "../../src/context";

import styles from "../../styles/Popup.module.scss";

// utils
import { decideWhoWins, calculatePooPoint } from "../../utils/gameUtils";

/*******************
 * 0: go discussion
 * 1: go vote
 * 2: safe
 * 3: out
 * 4: tie
 *******************/

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

const AnimateModal = ({
  gameState,
  closeModal,
  goVote,
  goDiscuss,
  num,
  closeDiscussion,
}) => {
  const { me } = useContext(GameContext);

  const router = useRouter();

  const showResult = (myCamp, winCamp) => {
    const winner = winCamp === 0 ? "清道夫勝利" : "搗蛋鬼勝利";
    const text = myCamp === winCamp ? `恭喜，${winner}` : `歪歪，${winner}`;
    return text;
  };

  const point = calculatePooPoint(gameState.playCards);

  const Config = {
    0: {
      imgStyle: { top: "-115px", right: "30px" },
      buttonText: me.isAlive ? "前往討論" : "觀看討論",
      text: `大便指數\n${calculatePooPoint(gameState.playCards)}`,
      imgSrc: "/img/modal/go-talk.png",
      onClick: goDiscuss,
    },
    1: {
      imgStyle: { top: "-110px", left: "30px" },
      buttonText: me.isAlive ? "開始投票" : "觀看投票",
      text: "湯up!!",
      imgSrc: "/img/modal/go-vote.png",
      onClick: goVote,
    },
    2: {
      imgStyle: { top: "-110px", right: "30px" },
      buttonText: "忍痛觀賽",
      text: "歪歪...\n你被淘汰惹....",
      imgSrc: "/img/modal/out.png",
      onClick: closeDiscussion,
    },
    3: {
      imgStyle: { top: "-115px", left: "30px" },
      buttonText: "我誰～～",
      text: "不錯嘛～\n身分沒有曝光耶",
      imgSrc: "/img/modal/safe.png",
      onClick: closeDiscussion,
    },
    4: {
      imgStyle: { top: "-115px", left: "30px" },
      buttonText: "我誰～～",
      text: "平手，請大家重投",
      imgSrc: "/img/modal/safe.png",
      onClick: closeModal,
    },
    5: {
      imgStyle: { top: "-115px", left: "30px" },
      buttonText: "遊戲結束",
      text: showResult(
        me.camp,
        decideWhoWins(gameState.pooPoint, gameState.playersCount)
      ),
      imgSrc: "/img/modal/safe.png",
      onClick: () => {
        router.push(`/`);
      },
    },
  };

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={styles.modal}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.header}>
          <span></span>
          <span></span>
          <span
            style={{ background: "#5E493C" }}
            // onClick={Config[num]?.onClick}
          ></span>
        </div>
        <div className={styles.body}>
          <div
            className={styles.content}
            style={{ order: num % 2 == 0 ? 1 : 2 }}
          >
            <p>{Config[num]?.text}</p>
            <div className={styles.button} onClick={Config[num]?.onClick}>
              {Config[num]?.buttonText}
            </div>
          </div>
          <div
            className={styles.img}
            style={{ ...Config[num]?.imgStyle, order: num % 2 == 0 ? 2 : 1 }}
          >
            <Image
              src={Config[num]?.imgSrc}
              alt={Config[num]?.text}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimateModal;
