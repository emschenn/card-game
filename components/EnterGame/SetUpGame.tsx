import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// utils
import { getRandomCardNum, getCampConfig } from "../../utils/gameUtils";

const SetUpGame = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [countErrorMsg, setCountErrorMsg] = useState("");
  const [count, setCount] = useState(0);
  const db = useContext(FirebaseContext);
  const { setMe } = useContext(GameContext);

  const onNameInputChange = (e) => {
    setName(e.target.value);
    if (name) setNameErrorMsg("");
  };

  const onCountInputChange = (e) => {
    setCount(parseInt(e.target.value));
    if (count) setCountErrorMsg("");
  };

  const onCreateClick = (e) => {
    e.preventDefault();
    if (!count || !name) {
      if (!count) setCountErrorMsg("請選擇人數");
      if (!name) setNameErrorMsg("姓名不得為空");
      return;
    }
    const gamesRef = db.ref("games");
    const newGameRef = gamesRef.push();
    const campConfig = getCampConfig(count);
    newGameRef.set({
      isStart: false,
      playersCount: count,
      pooPoint: 0,
      round: 1,
      step: 0,
      passCards: { isEmpty: true },
      playCards: { isEmpty: true },
      votePlayers: { isEmpty: true },
      players: [],
      campConfig,
    });
    const gamePlayerRef = db.ref(`games/${newGameRef.key}/players`);
    const newPlayerRef = gamePlayerRef.push();
    const camp = campConfig[0];
    newPlayerRef.set({
      name,
      handCards: getRandomCardNum(3),
      isAlive: true,
      camp,
    });
    setMe({ id: newPlayerRef.key, camp, isAlive: true });
    router.push(`/game/${newGameRef.key}`);
  };

  return (
    <div className="setup-game form">
      <div className="title">開創新局</div>
      <div className="desc">
        選擇遊玩人數，建立新局，再用邀請碼邀請朋友加入🙋🏻
      </div>
      <input
        className={nameErrorMsg && "error"}
        placeholder="輸入你的名字"
        value={name}
        onChange={onNameInputChange}
      ></input>
      <span className="error-msg">{nameErrorMsg}</span>
      <input
        className={countErrorMsg && "error"}
        type="number"
        placeholder="輸入人數"
        value={count}
        onChange={onCountInputChange}
      ></input>
      <span className="error-msg">{countErrorMsg}</span>
      <div className="button" onClick={onCreateClick}>
        <span>開局</span>
      </div>
    </div>
  );
};

export default SetUpGame;
