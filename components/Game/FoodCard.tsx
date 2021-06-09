import React, { useContext } from "react";
import { ICard } from "../../interfaces/gameConfig";
import { motion } from "framer-motion";

// context
import { FirebaseContext, GameContext } from "../../src/context";

interface IProps {
  index: number;
  card: ICard;
  isSelect: boolean;
  setSelectCard: Function;
  clickable: boolean;
}

const FoodCard = ({
  index,
  card,
  isSelect,
  setSelectCard,
  clickable,
}: IProps) => {
  const db = useContext(FirebaseContext);
  const { me } = useContext(GameContext);
  const { point, img, name } = card;

  const onCardClick = (e) => {
    if (clickable) {
      e.preventDefault();
      setSelectCard({ card, index });
    }
  };

  return (
    <div className="card-container">
      <motion.div
        className="card"
        onClick={onCardClick}
        whileHover={clickable ? { scale: 1.1 } : {}}
      >
        {/* {point} */}
        <motion.img
          src={img}
          alt={name}
          onClick={onCardClick}
          // initial={{ "--rotate": "0deg" } as any}
          // whileHover={clickable ? { rotate: 45, scale: 1.1 } : {}}
        />
      </motion.div>
      {isSelect && <div>this</div>}
    </div>
  );
};

export default FoodCard;
