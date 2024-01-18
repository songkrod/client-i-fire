import { PlayerType } from "./player.interface";

export type CardType = {
  no: number;
  score: number;
}

export type StacksType = {
  stack1: CardType[];
  stack2: CardType[];
  stack3: CardType[];
  stack4: CardType[];
}

export type PlayerPickedType = {
  [playerId: string]: CardType;
}

export type PlayerJoinStateType = {
  [playerId: string]: boolean;
}

export type PlayerScoreType = PlayerType & {
  score: number;
}

export type BuyerType = {
  buyer: PlayerType;
}

export type BoughtType = {
  buyer: PlayerType;
  stack: number;
  stacks: StacksType;
}

type ActivityTakeAllType = {
  stackNo: number;
  score: number;
}

type ActivitPushType = {
  stackNo: number;
  cardNo: number;
}

export type ActivityType = {
  player: PlayerType;
  action: 'PUSH' | 'TAKEAll';
  detail: ActivityTakeAllType | ActivitPushType;
  stacks: StacksType;
}