import React from "react";
import { motion } from "framer-motion";

import { IPlayer } from "../../interfaces/gameConfig";

interface IPlayerArray {
  id: string;
  name: string;
  isAlive: boolean;
  handCards: number[];
  camp: number;
}
interface IProps {
  player: IPlayerArray;
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
    console.log(player);
    if (clickable) {
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
      <span
        style={{
          visibility: isPlaceHolder || !isSelect ? "hidden" : "visible",
        }}
      >
        傳牌對象
      </span>
    </div>
  );
};

export default Player;
