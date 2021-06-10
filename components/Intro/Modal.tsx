import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Modal.module.scss";

// components
import Header from "./Header";
import GameIntro from "./GameIntro";
import CardIntro from "./CardIntro";
import PrepareIntro from "./PrepareIntro";
import StepIntro from "./StepIntro";
import WinIntro from "./WinIntro";

interface IProps {
  setOpenIntroModal: (boolean) => void;
}

const modalAnimation = {
  hidden: {
    y: "-100vh",
    // opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: {
      // delay: 0.3,
    },
  },
  exit: {
    y: "-100vh",
    // opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Modal = ({ setOpenIntroModal }: IProps) => {
  const [selected, setSelected] = useState(0);

  const config = [
    {
      title: "遊戲說明",
      Component: (props) => <GameIntro {...props} />,
    },
    { title: "卡牌介紹", Component: (props) => <CardIntro {...props} /> },
    { title: "前置準備", Component: (props) => <PrepareIntro {...props} /> },
    { title: "回合動作", Component: (props) => <StepIntro {...props} /> },
    { title: "獲勝條件", Component: (props) => <WinIntro {...props} /> },
  ];

  const Children = config[selected].Component;

  return (
    <motion.div
      className={styles.introModal}
      variants={modalAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className={styles.close}
        onClick={() => setOpenIntroModal(false)}
      >
        <path d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z" />
      </svg>
      <div className={styles.modal}>
        <Header
          config={config}
          styles={styles}
          selected={selected}
          setSelected={setSelected}
        />
        <Children styles={styles} />
      </div>
    </motion.div>
  );
};

export default Modal;
