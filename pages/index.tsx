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
        {/* <div
          style={{
            width: "16rem",
            height: "10rem",
            borderRadius: "70%",
            backgroundColor: "#f0d892",
            transform: "rotate(-50deg)",
          }}
        ></div> */}
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
      {/* <div className={styles.intro}>
        每個人都有便秘的時候，而對於每個人的腸胃來說，都存在著可以幫助人們大便的淸道夫以及阻礙人們排便的搗蛋鬼。
        <br />
        <br />
        腸胃淸道夫是一個陣營遊戲，透過讓玩家們化身為友善的淸道夫、調皮的搗蛋鬼，用不同的角度去理解在日常生活中的種種細節，是如何影響到大便的誕生！
        <div
          className={styles.button}
          onClick={() => {
            router.push(`/intro`);
          }}
        >
          {". . . "} 更多遊戲介紹
        </div>
      {/* </div>
      <div className={styles.start}> 
        <div
          className={styles.button}
          onClick={() => {
            router.push(`/startGame`);
          }}
        >
          <span>遊戲試玩</span>
        </div>
      </div> */}
      {/* <Floating
        duration={2}
        variationX={0}
        variationY={10}
        style={{ left: "10%", top: "5%", height: "10%" }}
        styles={styles}
      > 
      <MovingElement variation={[40, 40]} styles={styles}>
        <div
          style={{
            width: "16rem",
            height: "10rem",
            borderRadius: "70%",
            backgroundColor: "#f0d892",
            transform: "rotate(-50deg)",
          }}
        ></div>
      </MovingElement>
      </Floating> 
       <Floating
        duration={2}
        variationX={0}
        variationY={10}
        style={{ left: "20%", top: "80%", height: "5%" }}
        styles={styles}
      > 
      <MovingElement variation={[40, 40]} styles={styles}>
        <div
          style={{
            width: "8rem",
            height: "5rem",
            borderRadius: "50%",
            backgroundColor: "#9B452D",
            transform: "rotate(30deg)",
          }}
        ></div>
      </MovingElement>
    </Floating>  */}
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
