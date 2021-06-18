import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import { CAMP_CARD } from "../../data/card";
interface IProps {
  camp: number;
  styles: CSSModule;
}

const CampCard = ({ camp, styles }: IProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const backImg = CAMP_CARD[camp].img;
  return (
    <div className={styles.campCard}>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        containerStyle={{ width: "10rem" }}
      >
        <img
          src="/img/campCard/back.png"
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        />
        <img
          src={backImg}
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        />
      </ReactCardFlip>
    </div>
  );
};

export default CampCard;
