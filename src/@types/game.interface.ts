export type CardType = {
  no: number;
  buff: number;
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