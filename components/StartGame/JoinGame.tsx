import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

// context
import { FirebaseContext, GameContext } from "../../src/context";

// utils
import { getRandomCardNum } from "../../utils/gameUtils";

const JoinGame = ({ styles }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [roomIdErrorMsg, setRoomIdErrorMsg] = useState("");
  const db = useContext(FirebaseContext);
  const { setMe } = useContext(GameContext);

  const onNameInputChange = (e) => {
    setName(e.target.value);
    if (name) setNameErrorMsg("");
  };
  const onRoomIdInputChange = (e) => {
    setRoomId(e.target.value);
    if (roomId) setRoomIdErrorMsg("");
  };
  const onJoinClick = (e) => {
    e.preventDefault();
    if (!roomId || !name) {
      if (!roomId) setRoomIdErrorMsg("邀請碼不得為空");
      if (!name) setNameErrorMsg("姓名不得為空");
      return;
    }
    const gameRef = db.ref(`games/${roomId}`);
    const gamePlayerRef = db.ref(`games/${roomId}/players`);
    const newPlayerKey = gamePlayerRef.push().key;
    let updates = {};
    let camp;
    gameRef
      .get()
      .then((snapshot) => {
        const campConfig = snapshot.val().campConfig;
        const currentPlayerCount = Object.keys(snapshot.val().players).length;
        camp = campConfig[currentPlayerCount];
        updates[`games/${roomId}/players/${newPlayerKey}`] = {
          name,
          handCards: getRandomCardNum(3),
          isAlive: true,
          camp,
        };
        db.ref().update(updates);
        setMe({ id: newPlayerKey, camp, isAlive: true });
        router.push(`/game/${roomId}`);
      })
      .catch((error) => {
        setRoomIdErrorMsg("邀請碼錯誤");
        console.log(error);
      });
  };

  return (
    <div className={`${styles.join} ${styles.form}`}>
      <div className={styles.title}>或是</div>
      <div className={styles.desc}>已有邀請碼，加入遊戲</div>
      <input
        className={nameErrorMsg ? styles.error : ""}
        placeholder="輸入你的名字"
        value={name}
        onChange={onNameInputChange}
      ></input>
      <span className={styles.errorMsg}>{nameErrorMsg}</span>
      <input
        className={roomIdErrorMsg ? styles.error : ""}
        placeholder="輸入邀請碼"
        value={roomId}
        onChange={onRoomIdInputChange}
      ></input>
      <span className={styles.errorMsg}>{roomIdErrorMsg}</span>
      <div className={styles.button} onClick={onJoinClick}>
        <span>加入遊戲</span>
      </div>
    </div>
  );
};

export default JoinGame;
