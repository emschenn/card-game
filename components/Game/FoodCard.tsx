import React, { useContext } from "react";
import { ICard } from "../../interfaces/gameConfig";
import Image from "next/image";

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
      <Image
        src={img}
        alt={name}
        layout="fill"
        objectFit="contain"
        onClick={onCardClick}
      />
      {index === selectCard?.index && (
        <div className={styles.cardOverlay} onClick={onDoubleClick}>
          <div className={styles.text}>
            確定嗎
            <span>再按一次送出</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCard;
