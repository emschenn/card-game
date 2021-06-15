import React from "react";

interface IProps {
  styles: CSSModule;
}

const PrepareIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.prepareIntro}>
      <ul className={styles.content}>
        <li>
          <div>1</div>
          <p>
            每一個玩家分別抽取一張陣營卡，依照不同遊戲人數 5 - 6
            人遊戲中，每一回合當中會有 3 張淸道夫、2
            張搗蛋鬼，其餘人數請參照下方對照表
          </p>
        </li>
        <li>
          <div>2</div>
          <p>每一個玩家分別抽取 3 張食物卡</p>
        </li>
        <li>
          <div>3</div>
          <p>決定玩家們的出牌順位後，以順時針的方向出牌</p>
        </li>
      </ul>

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>遊戲人數</th>
              <th>大便指數</th>
              <th>清道夫人數</th>
              <th>搗蛋鬼人數</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.playerCount}>
              <td>5-6</td>
              <td>10</td>
              <td>3-4</td>
              <td>2</td>
            </tr>
            <tr>
              <td>7-8</td>
              <td>14</td>
              <td>4-5</td>
              <td>3</td>
            </tr>
            <tr>
              <td>9</td>
              <td>18</td>
              <td>5</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrepareIntro;
