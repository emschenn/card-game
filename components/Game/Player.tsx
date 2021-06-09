import React from "react";
import { motion } from "framer-motion";

import { IPlayer } from "../../interfaces/gameConfig";

interface IProps {
  player: IPlayer;
  isSelect: boolean;
  setSelectPlayer: Function;
  clickable: boolean;
  isPlaceHolder: boolean;
}

const Player = ({
  player,
  isSelect,
  setSelectPlayer,
  isPlaceHolder,
  clickable,
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
      className="player-container"
      style={{
        opacity: isPlaceHolder || !player.isAlive ? 0.5 : 1,
        scale: isSelect ? 1.1 : 1,
      }}
    >
      <motion.div
        className="avatar"
        onClick={onPlayerClick}
        whileHover={{
          scale: isPlaceHolder || !isAlive || !clickable ? 1 : 1.1,
        }}
      >
        {name[0]}
      </motion.div>
      <div className="name">{name}</div>
    </div>
  );
};

export default Player;
