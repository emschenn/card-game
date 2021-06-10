import React from "react";

interface IProps {
  styles: CSSModule;
}

const Props = ({ styles }: IProps) => {
  return (
    <div className={styles.props}>
      <div className={styles.camp}>
        <div className={styles.title}>陣營卡</div>淸道夫以及搗蛋鬼兩種卡牌。
      </div>
      <div className={styles.food}>
        <div className={styles.title}>食物卡</div>
        上面有食物名稱、便便指數以及該食物中營養與排便相關的連結，便便指數有－２、－１、０、１、２五種數値。
      </div>
      <div className={styles.event}>
        <div className={styles.title}>事件卡</div>
      </div>
    </div>
  );
};

export default Props;
