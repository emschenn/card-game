import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface IProps {
  camp: number;
  styles: CSSModule;
}

const CampCard = ({ camp, styles }: IProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const backImg =
    camp === 1 ? "/img/campCard/bad.png" : "/img/campCard/good.png";
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
