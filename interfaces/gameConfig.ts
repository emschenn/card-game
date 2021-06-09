export interface IGameConfig {
  isStart: boolean;
  playersCount: number;
  pooPoint: number;
  round: number;
  step: number;
  passCards: ICollect;
  playCards: ICollect;
  votePlayers: ICollect;
  players: IPlayer[];
  campConfig: number[];
}

export interface ICollect {
  isEmpty: boolean;
}

export interface IPlayer {
  name: string;
  isAlive: boolean;
  handCards: number[];
  camp: number;
}

export interface ICard {
  id: number;
  name: string;
  img: string;
  point: number;
}
