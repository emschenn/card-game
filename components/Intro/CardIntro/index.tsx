import React, { useState } from "react";
import Image from "next/image";

import Accordion from "./Accordion";

import { FOOD_CARD, EVENT_CARD, CAMP_CARD } from "../../../data/card";

import { ICardData } from "../../../interfaces/gameConfig";

interface IProps {
  styles: CSSModule;
}
interface IGetSelectCard {
  (): ICardData;
}

const CardIntro = ({ styles }: IProps) => {
  const [selectCard, setSelectCard] = useState(null);

  const items = [
    {
      id: "CAMP_CARD",
      desc: "淸道夫以及搗蛋鬼兩種卡牌",
      title: "陣營卡 (2)",
      text: CAMP_CARD.map(({ name }) => name),
    },
    {
      id: "FOOD_CARD",
      desc: "上面有食物名稱、便便指數以及該食物中營養與排便相關的連結，便便指數有 -2、-1、0、1、2 五種數値",
      title: "食物卡 (40)",
      text: FOOD_CARD.map(({ name }) => name),
    },
    {
      id: "EVENT_CARD",
      desc: "敘述怎麼樣的身體狀況會影響排便與消化，在洗牌的過程夾雜在食物卡中，可以傳遞給別人、也可以在出牌回合打出，一回合只能出一張食物卡或是事件卡",
      title: "事件卡 (4)",
      text: EVENT_CARD.map(({ name }) => name),
    },
  ];
  console.log(selectCard);

  const getSelectCard: IGetSelectCard = () => {
    const category =
      selectCard?.item.id === "CAMP_CARD"
        ? CAMP_CARD
        : selectCard?.item.id === "FOOD_CARD"
        ? FOOD_CARD
        : EVENT_CARD;
    const cardIndex = category.findIndex(
      ({ name }) => name === selectCard?.cardName
    );
    return category[cardIndex];
  };

  return (
    <div className={styles.cardIntro}>
      <div className={styles.cardsList}>
        <Accordion items={items} setSelectCard={setSelectCard} />
        {selectCard?.item.id === "EVENT_CARD" && (
          <div className={styles.note}>*註：{getSelectCard().desc}</div>
        )}
      </div>
      <div className={styles.cardsImg}>
        <div className={styles.desc}>{selectCard?.item.desc}</div>
        {selectCard?.item &&
          (selectCard?.item.id === "CAMP_CARD" ? (
            <div className={styles.rectangleCard}>
              <Image
                src={getSelectCard().img}
                alt={selectCard?.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            <div className={styles.diamondCard}>
              <Image
                src={getSelectCard().img}
                alt={selectCard?.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardIntro;
