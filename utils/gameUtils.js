import { FOOD_CARD } from "../data/card";

export const withdrawACard = (myCards, card) => {
  myCards.splice(card, 1);
  return myCards;
};

export const getAlivePlayersArray = (players) => {
  const playersArray = Object.entries(players).map(([id, value]) => ({
    id,
    ...value,
  }));
  const alivePlayers = playersArray.filter(({ isAlive }) => isAlive);
  return alivePlayers;
};

export const getNextAlivePlayerId = (myId, players) => {
  const playersArray = Object.entries(players).map(([key, value]) => {
    return { id: key, ...value };
  });
  const myIndex = playersArray.findIndex((player) => player.id === myId);
  for (let i = myIndex + 1; i < playersArray.length; i++) {
    if (playersArray[i].isAlive) {
      return playersArray[i].id;
    }
  }
  for (let i = 0; i < playersArray.length; i++) {
    if (playersArray[i].isAlive) {
      return playersArray[i].id;
    }
  }
};

export const getPrevAlivePlayerName = (myId, players) => {
  const playersArray = Object.entries(players).map(([key, value]) => {
    return {
      id: key,
      ...value,
    };
  });
  const myIndex = playersArray.findIndex((player) => player.id === myId);
  for (let i = myIndex - 1; i >= 0; i--) {
    if (playersArray[i].isAlive) {
      return playersArray[i].name;
    }
  }
  for (let i = playersArray.length - 1; i > myIndex; i--) {
    if (playersArray[i].isAlive) {
      return playersArray[i].name;
    }
  }
};

export const receivePassCardArray = (myId, players, passCard) => {
  let newCards;
  Object.entries(passCard).forEach(([key, value]) => {
    if (key === myId) {
      newCards = [...players[myId].handCards, value];
      return;
    }
  });
  return newCards;
};

export const receiveCardFromWho = (myId, players, passCard) => ({
  from: getPrevAlivePlayerName(myId, players),
  card: FOOD_CARD[passCard[myId]].name,
});

export const drawNewCardArray = (myId, players) => {
  const cards = players[myId].handCards;
  let newCards = cards;
  while (newCards.length < 3) {
    newCards.push(getRandomCardNum(1)[0]);
  }
  return newCards;
};

export const calculateTotalPooPoint = (playCard, pooPoint) => {
  Object.entries(playCard).forEach(([_, value]) => {
    pooPoint += FOOD_CARD[value].point;
  });
  return pooPoint;
};

export const calculatePooPoint = (playCard) => {
  let i = 0;
  Object.entries(playCard).forEach(([_, value]) => {
    i += FOOD_CARD[value].point;
  });
  return i >= 0 ? `+${i}` : `-${Math.abs(i)}`;
};

export const decideDiePlayer = (votePlayers) => {
  const counts = {};
  Object.entries(votePlayers).forEach(([_, value]) => {
    counts[value] = counts[value] ? counts[value] + 1 : 1;
  });
  let max = 0;
  let diePlayerId;
  Object.entries(counts).forEach(([key, value]) => {
    if (value > max) {
      max = value;
      diePlayerId = key;
    }
  });
  const duplicateCount = Object.entries(counts).find(
    ([key, value]) => value == max && key != diePlayerId
  );
  return duplicateCount ? "" : diePlayerId;
};

export const checkIsAllAlivePlayersThreeCards = (players) => {
  const alivePlayersArray = getAlivePlayersArray(players);
  return alivePlayersArray.every(({ handCards }) => handCards.length === 3);
};

export const getRandomCardNum = (count) => {
  const array = [];
  while (array.length < count) {
    array.push(Math.floor(Math.random() * 40));
  }
  return array;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getCampConfig = (count) => {
  // 0 for good, 1 for bad
  const campArray = (count) => {
    if (count == 5) return [0, 0, 0, 1, 1];
    else if (count == 6) return [0, 0, 0, 0, 1, 1];
    else if (count == 7) return [0, 0, 0, 0, 1, 1, 1];
    else if (count == 8) return [0, 0, 0, 0, 0, 1, 1, 1];
    else if (count == 9) return [0, 0, 0, 0, 0, 1, 1, 1, 1];
    else if (count == 2) return [0, 1];
    else if (count == 3) return [0, 0, 1];
    else if (count == 4) return [0, 0, 1, 1];
  };
  return shuffleArray(campArray(count));
};

export const decideWhoWins = (pooPoint, playerCount) => {
  const winPointConfig = {
    2: 2,
    3: 3,
    4: 5,
    5: 10,
    6: 10,
    7: 14,
    8: 14,
    9: 18,
  };
  if (pooPoint > winPointConfig[playerCount]) {
    return 0; // good wins
  }
  return 1; // bad wins
};
