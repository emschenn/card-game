import React, { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import styles from "../styles/Home.module.scss";

// components
import Floating from "../components/Home/Floating";
import MovingElement from "../components/Home/MovingElement";
import Modal from "../components/Intro/Modal";

export default function Home() {
  const [openIntroModal, setOpenIntroModal] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.home}>
      <MovingElement variation={[10, 10]} styles={styles}>
        <div
          className={styles.mainImg}
          onClick={() => {
            setOpenIntroModal(true);
          }}
        >
          <Image
            src="/img/main.png"
            alt="Game"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </MovingElement>
      <div
        className={styles.button}
        onClick={() => {
          router.push(`/startGame`);
        }}
      >
        <span>試玩遊戲</span>
      </div>
      <AnimatePresence>
        {openIntroModal && <Modal setOpenIntroModal={setOpenIntroModal} />}
      </AnimatePresence>
    </div>
  );
}
