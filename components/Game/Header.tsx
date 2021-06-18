import React, { useState } from "react";
import Modal from "../Intro/Modal";
import { AnimatePresence, motion } from "framer-motion";

// interface
import { IGameConfig } from "../../interfaces/gameConfig";

interface IProps {
  styles: CSSModule;
  gameState: IGameConfig;
  msg: string;
}

const Header = ({ styles, gameState, msg }: IProps) => {
  const [openIntroModal, setOpenIntroModal] = useState(false);

  const round = {
    0: "等待大家加入...",
    1: "第一回合",
    2: "第二回合",
    3: "第三回合",
  };
  return (
    <>
      <div className={styles.header}>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenIntroModal(true);
          }}
        >
          👉🏼 遊戲指南 👈🏼
        </p>
        <p>
          {round[gameState?.round]}
          <span> {msg && `：${msg}`}</span>
        </p>
        <p>{gameState.isStart ? `大便指數：${gameState.pooPoint}` : ""}</p>
      </div>
      <AnimatePresence>
        {openIntroModal && <Modal setOpenIntroModal={setOpenIntroModal} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
