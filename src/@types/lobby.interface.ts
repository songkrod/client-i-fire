export type IdType = {
  id: string;
}

export type MemberType = {
  id: string;
  name: string;
}

export type MemberReadyStateType = {
  [playerId: string]: boolean;
}
