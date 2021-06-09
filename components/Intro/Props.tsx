import React from "react";

interface IProps {}

const Props = (props: IProps) => {
  return (
    <div className="props">
      <div className="camp">
        <div className="title">陣營卡</div>淸道夫以及搗蛋鬼兩種卡牌。
      </div>
      <div className="food">
        <div className="title">食物卡</div>
        上面有食物名稱、便便指數以及該食物中營養與排便相關的連結，便便指數有－２、－１、０、１、２五種數値。
      </div>
      <div className="event">
        <div className="title">事件卡</div>
        敘述怎麼樣的身體狀況會影響排便與消化，在洗牌的過程夾雜在食物卡中，可以傳遞給別人、也可以在出牌回合打出，一回合只能出一張食物卡或是事件卡。
      </div>
    </div>
  );
};

export default Props;
