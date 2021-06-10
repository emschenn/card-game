import React from "react";

interface IProps {
  styles: CSSModule;
}
const Rule = ({ styles }: IProps) => {
  return (
    <div className={styles.rule}>
      <div className={styles.prepare}>
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
      <div className={styles.winCondition}>
        <div className={styles.title}>獲勝條件</div>
        淸道夫陣營拉出大便 or 搗蛋鬼陣營阻止拉出大便（參考表）
      </div>
      <div className={styles.action}>
        <div className={styles.title}>回合動作</div>
        <ul>
          <li>
            傳牌：每個玩家將手上的任意一張牌傳給左手邊的玩家，並且傳遞後抽取一張卡牌，使手中的卡牌始終維持３張。
          </li>
          <li>
            出牌：所有玩家同時出牌，將所有人出牌的大便指數進行加總，則為這回合大家所累計的大便指數。　　
          </li>
          <li>
            發言：依序從１號、２號玩家開始發言表達自己對於哪位玩家是扮演淸道夫與搗蛋鬼的想法，可以涉及傳牌的內容，在發言過程中，其他的玩家不可加入討論，只有發言玩家可以表示自己的想法。
          </li>
          <li>
            投票：每個人同時根據發言與出牌，同時投票出認為是搗蛋鬼陣營的玩家，投票時間為３０秒，若是平票的狀況，則１號玩家的一票代表兩票，獲得最高票者，這一回合就立即淘汰，不可以再加入發言，下一回合則直接略過該淘汰玩家進行。{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Rule;
