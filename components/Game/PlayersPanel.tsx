import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// interface
import { IPlayer, IGameConfig } from "../../interfaces/gameConfig";

// components
import Player from "./Player";
import CampCard from "./CampCard";

// utils
import { getNextAlivePlayerId } from "../../utils/gameUtils";

interface IProps {
  id: string;
  gameState: IGameConfig;
  styles: CSSModule;
}

interface IPlayerArray {
  id: string;
  name: string;
  isAlive: boolean;
  handCards: number[];
  camp: number;
}

const PlayersPanel = ({ id, gameState, styles }: IProps) => {
  const [enablePlayerClick, setEnablePlayerClick] = useState(true);
  const [selectPlayer, setSelectPlayer] = useState<IPlayerArray | null>();
  const { step, players, playersCount, votePlayers } = gameState;

  const { me } = useContext(GameContext);
  const db = useContext(FirebaseContext);

  useEffect(() => {
    if (!me.isAlive) {
      setEnablePlayerClick(false);
      return;
    }
    if (step === 3) {
      setEnablePlayerClick(true);
    } else {
      setEnablePlayerClick(false);
    }
  }, [step, votePlayers]);

  const playerArray = Object.entries(players).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const playersPlaceholder = Array.from(
    { length: playersCount - Object.entries(players).length },
    (v, i) => ({
      id: i.toString(),
      name: "",
      isAlive: false,
      handCards: [],
      camp: -1,
    })
  );

  return (
    <div className={styles.playersPanel}>
      <div className={styles.playersContainer}>
        {gameState.isStart && <CampCard camp={me.camp} styles={styles} />}{" "}
        <Player
          player={{ id: me.id, ...players[me.id] }}
          key={me.id}
          clickable={enablePlayerClick}
          isSelect={false}
          isPlaceHolder={false}
          setSelectPlayer={setSelectPlayer}
          styles={styles}
        />
        <span className={styles.divider} />
        <div className={styles.overflow}>
          {playerArray.map((player) => {
            if (player.id !== me.id)
              return (
                <Player
                  player={player}
                  key={player.id}
                  clickable={enablePlayerClick}
                  isSelect={
                    me.isAlive &&
                    player.id === getNextAlivePlayerId(me.id, players)
                  }
                  isPlaceHolder={false}
                  setSelectPlayer={setSelectPlayer}
                  styles={styles}
                />
              );
          })}
          {playersPlaceholder.map((player, i) => (
            <Player
              player={player}
              key={i}
              clickable={enablePlayerClick}
              isSelect={false}
              isPlaceHolder={true}
              setSelectPlayer={setSelectPlayer}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersPanel;
