export type PlayerType = {
  id: string;
  name: string;
}

export type PlayerReadyStateType = {
  [playerId: string]: boolean;
}
