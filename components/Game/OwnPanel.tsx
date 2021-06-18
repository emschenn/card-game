import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

// data
import { FOOD_CARD } from "../../data/card";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// interface
import { ICard, IGameConfig } from "../../interfaces/gameConfig";

// components
import FoodCard from "./FoodCard";

//utils
import { withdrawACard, getNextAlivePlayerId } from "../../utils/gameUtils";

interface IProps {
  id: string;
  gameState: IGameConfig;
  setMsg: Function;
  styles: CSSModule;
  drawCard: () => void;
  showDrawCardButton: boolean;
}

interface ISelectCard {
  card: ICard;
  index: number;
}

const OwnPanel = ({
  id,
  gameState,
  setMsg,
  styles,
  drawCard,
  showDrawCardButton,
}: IProps) => {
  const [enableCardClick, setEnableCardClick] = useState(true);
  const [selectCard, setSelectCard] = useState<ISelectCard | null>();

  const { me } = useContext(GameContext);
  const db = useContext(FirebaseContext);
  const { handCards } = gameState.players[me?.id];
  const { passCards, playCards, step, players } = gameState;

  useEffect(() => {
    if (!me.isAlive) {
      setEnableCardClick(false);
      return;
    }
    if (step === 1 || step === 2) {
      setEnableCardClick(true);
    } else {
      setEnableCardClick(false);
    }
  }, [step, me]);

  const withdrawOwnCardAndAddToCards = (action, cards) => {
    const updates = {};
    const newCard = {};
    if (action === "passCards") {
      newCard[getNextAlivePlayerId(me.id, players)] = selectCard?.card.id;
    } else {
      newCard[me.id] = selectCard?.card.id;
    }
    updates[`games/${id}/${action}`] = cards.isEmpty
      ? newCard
      : { ...cards, ...newCard };
    updates[`games/${id}/players/${me.id}/handCards`] = withdrawACard(
      players[me.id].handCards,
      selectCard?.index
    );
    db.ref().update(updates);
    setEnableCardClick(false);
  };

  const handleOkClick = () => {
    setSelectCard(null);
    if (step === 1) {
      if (me.isAlive) setMsg("等待他人完成動作...");
      withdrawOwnCardAndAddToCards("passCards", passCards);
    } else if (step === 2) {
      if (me.isAlive) setMsg("等待他人出牌...");
      withdrawOwnCardAndAddToCards("playCards", playCards);
    }
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {showDrawCardButton && me.isAlive && (
          <div className={styles.cardContainer}>
            <Image
              src="/img/emptyFoodCard.png"
              alt="empty card"
              layout="fill"
              objectFit="contain"
              onClick={drawCard}
            />
          </div>
        )}
        {handCards.map((num, index) => (
          <FoodCard
            key={index}
            index={index}
            card={FOOD_CARD[num]}
            selectCard={selectCard}
            setSelectCard={setSelectCard}
            clickable={enableCardClick}
            styles={styles}
            onOkClick={handleOkClick}
          />
        ))}
      </div>
    </>
  );
};

export default OwnPanel;
