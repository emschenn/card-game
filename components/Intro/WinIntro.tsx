import React from "react";

interface IProps {
  styles: CSSModule;
}

const WinIntro = ({ styles }: IProps) => {
  return (
    <div className={styles.winIntro}>
      <div className={styles.content}>
        三回合結束後的大便指數達標：成功拉出大便！<b>淸道夫陣營</b>勝利
        <br /> or <br />
        三回合結束後的大便指數未達標：順利阻止大便被拉出，<b>搗蛋鬼陣營</b>勝利
      </div>

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

export default WinIntro;
