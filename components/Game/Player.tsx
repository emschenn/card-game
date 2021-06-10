import React from "react";
import { motion } from "framer-motion";

import { IPlayer } from "../../interfaces/gameConfig";

interface IProps {
  player: IPlayer;
  isSelect: boolean;
  setSelectPlayer: Function;
  clickable: boolean;
  isPlaceHolder: boolean;
  styles: CSSModule;
}

const Player = ({
  player,
  isSelect,
  setSelectPlayer,
  isPlaceHolder,
  clickable,
  styles,
}: IProps) => {
  const { name, isAlive } = player;

  const onPlayerClick = (e) => {
    e.preventDefault();
    if (clickable) {
      e.preventDefault();
      setSelectPlayer(player);
    }
  };

  return (
    <div
      className={styles.playerContainer}
      style={{
        opacity: isPlaceHolder || !player.isAlive ? 0.5 : 1,
        scale: isSelect ? 1.1 : 1,
      }}
    >
      <motion.div
        className={styles.avatar}
        onClick={onPlayerClick}
        whileHover={{
          scale: isPlaceHolder || !isAlive || !clickable ? 1 : 1.1,
        }}
      >
        {name[0]}
      </motion.div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default Player;
