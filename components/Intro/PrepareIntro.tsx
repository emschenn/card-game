import React from "react";

interface IProps {
  styles: CSSModule;
}

const PrepareIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.prepareIntro}>
      <div className={styles.title}>前置準備</div>
      <ul>
        <li>
          每一個玩家分別抽取一張陣營卡，依照不同遊戲人數５－６人遊戲中，每一回合當中會有３張淸道夫、２張搗蛋鬼，其餘人數請參照下方對照表
        </li>
        <li>
          每一個玩家分別抽取基礎版：食物卡／進階版：食物卡＋事件卡混合牌組共５張
        </li>
        <li>決定玩家們的出牌順位後，以順時針的方向出牌</li>
      </ul>
    </div>
  );
};

export default PrepareIntro;
