import React from "react";

interface IProps {
  styles: CSSModule;
}

const StepIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.stepIntro}>
      <ul>
        <li>
          <div className={styles.title}>
            <span>傳 牌</span>
            <svg
              width="6"
              height="22"
              viewBox="0 0 6 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 0V20L5.5 14.5" stroke="#5E493C" />
            </svg>
          </div>
          <div className={styles.content}>
            每個玩家將手上的任意一張牌傳給左手邊的玩家，並且傳遞後抽取一張卡牌，使手中的卡牌始終維持
            3 張。
          </div>
        </li>
        <li>
          <div className={styles.title}>
            <span>出 牌</span>
            <svg
              width="6"
              height="22"
              viewBox="0 0 6 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 0V20L5.5 14.5" stroke="#5E493C" />
            </svg>
          </div>

          <div className={styles.content}>
            所有玩家同時出牌，將所有人出牌的大便指數進行加總，則為這回合大家所累計的大便指數。　　
          </div>
        </li>
        <li>
          <div className={styles.title}>
            <span>發 言</span>
            <svg
              width="6"
              height="22"
              viewBox="0 0 6 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 0V20L5.5 14.5" stroke="#5E493C" />
            </svg>
          </div>

          <div className={styles.content}>
            依序從 1 號、2
            號玩家開始發言表達自己對於哪位玩家是扮演淸道夫與搗蛋鬼的想法，可以涉及傳牌的內容，在發言過程中，其他的玩家不可加入討論，只有發言玩家可以表示自己的想法。
          </div>
        </li>
        <li>
          <div className={styles.title}>
            <span>投 票</span>
          </div>

          <div className={styles.content}>
            個人同時根據發言與出牌，同時投票出認為是搗蛋鬼陣營的玩家，投票時間為
            30 秒，若是平票的狀況，則 1
            號玩家的一票代表兩票，獲得最高票者，這一回合就立即淘汰，不可以再加入發言，下一回合則直接略過該淘汰玩家進行。
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StepIntro;
