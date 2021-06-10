import React, { useContext } from "react";
import { ICard } from "../../interfaces/gameConfig";
import { motion } from "framer-motion";

// context
import { FirebaseContext, GameContext } from "../../src/context";

interface ISelectCard {
  card: ICard;
  index: number;
}
interface IProps {
  index: number;
  card: ICard;
  selectCard: ISelectCard;
  setSelectCard: Function;
  clickable: boolean;
  styles: CSSModule;
  onOkClick: () => void;
}

const FoodCard = ({
  index,
  card,
  selectCard,
  setSelectCard,
  clickable,
  styles,
  onOkClick,
}: IProps) => {
  const { point, img, name } = card;

  const onCardClick = (e) => {
    e.stopPropagation();
    if (clickable) {
      setSelectCard({ card, index });
    }
  };

  const onDoubleClick = (e) => {
    e.stopPropagation();
    onOkClick();
  };

  return (
    <div className={styles.cardContainer}>
      <motion.div
        className={styles.foodCard}
        onClick={onCardClick}
        whileHover={clickable ? { scale: 1.1 } : {}}
      >
        <img src={img} alt={name} onClick={onCardClick} />
        {index === selectCard?.index && (
          <div className={styles.cardOverlay} onClick={onDoubleClick}>
            <div className={styles.text}>
              確定這張嗎
              <span>再按一次送出</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FoodCard;
