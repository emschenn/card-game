import React from "react";
import styles from "../../styles/StartGame.module.scss";

// components
import JoinGame from "../../components/StartGame/JoinGame";
import SetUpGame from "../../components/StartGame/SetUpGame";

interface IProps {}

const StartGame = (props: IProps) => {
  return (
    <div className={styles.start}>
      <SetUpGame styles={styles} />
      <JoinGame styles={styles} />
      {/* <AnimateModal text="遊戲開始" /> */}
    </div>
  );
};

export default StartGame;
