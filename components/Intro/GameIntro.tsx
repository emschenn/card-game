import React from "react";

interface IProps {
  styles: CSSModule;
}

const GameIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.gameIntro}>
      <h1>
        每個人的腸胃，都存在著可以幫助人們大便的淸道夫以及阻礙人們排便的搗蛋鬼
      </h1>
      <div className={styles.container}>
        <img src="/img/box.jpeg" />
        <div className={styles.desc}>
          <div className={styles.detail}>遊戲對象 遊戲人數 花費時間</div>
          <h2>
            腸胃淸道夫是一個陣營遊戲，透過讓玩家們化身為友善的淸道夫、調皮的搗蛋鬼，用不同的角度去理解在日常生活中的種種細節，是如何影響到大便的誕生！
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
