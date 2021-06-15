import React from "react";
import Image from "next/image";

interface IProps {
  styles: CSSModule;
}

const GameIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.gameIntro}>
      <div className={styles.img}>
        <Image
          src="/img/intro.png"
          alt="card-game-intro"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.desc}>
          <h2>
            腸胃淸道夫是一個陣營遊戲，透過讓玩家們化身為友善的
            <br />
            淸道夫、調皮的搗蛋鬼，用不同的角度去理解在日常生活
            <br />
            中的種種細節，是如何影響到大便的誕生！
          </h2>
          <div className={styles.detail}>
            7 歲以上 ｜ 5 - 9 人 ｜ 15 - 20 分鐘
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
