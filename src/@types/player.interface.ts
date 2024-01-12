export type PlayerType = {
  id: string;
  name: string;
  isLeader: boolean;
}

export type PlayerReadyStateType = {
  [playerId: string]: boolean;
}
