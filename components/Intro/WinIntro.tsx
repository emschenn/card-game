import React from "react";

interface IProps {
  styles: CSSModule;
}

const WinIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.winIntro}>
      {" "}
      <div className={styles.title}>獲勝條件</div>
      淸道夫陣營拉出大便 or 搗蛋鬼陣營阻止拉出大便（參考表）
    </div>
  );
};

export default WinIntro;
