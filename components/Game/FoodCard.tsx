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
  styles: CSSModule;
}

const FoodCard = ({
  index,
  card,
  isSelect,
  setSelectCard,
  clickable,
  styles,
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
    <div className={styles.cardContainer}>
      <motion.div
        className={styles.foodCard}
        onClick={onCardClick}
        whileHover={clickable ? { scale: 1.1 } : {}}
      >
        <motion.img src={img} alt={name} onClick={onCardClick} />
      </motion.div>
      {isSelect && <div>this</div>}
    </div>
  );
};

export default FoodCard;
