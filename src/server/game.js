const { getCards, shuffle } = require('./cards');
const { ROOM_ID } = require('./const');

let cards = [];

let playerHands = {
  // [playerId]: cards[]
};

let playerScores = {
  // [playerId]: cards[]
}

let playerJoinedGame = [];

let playersSelectedCard = {
  // [playerId]: card
};

let stacks = {
  stack1: [],
  stack2: [],
  stack3: [],
  stack4: [],
};

function sortCard( a, b ) {
  if ( a.no < b.no ) {
    return -1;
  }

  if ( a.no > b.no ) {
    return 1;
  }

  return 0;
}

const resetGame = () => {
  cards = getCards();
  
  stacks = {
    stack1: [],
    stack2: [],
    stack3: [],
    stack4: [],
  };

  playerHands = {};
  playerJoinedGame = []
  playersSelectedCard = {};
}

const initStack = () => {
  const pick = [];

  [1, 2, 3, 4].map(() => {
    let index = Math.round(Math.random() * (cards.length - 1));

    const picked = cards.splice(index, 1);

    pick.push({
      ...picked[0]
    });
  });

  const sorted = pick.sort( sortCard );

  stacks.stack1.push(sorted[0]);
  stacks.stack2.push(sorted[1]);
  stacks.stack3.push(sorted[2]);
  stacks.stack4.push(sorted[3]);
}

const initPlayerHands = (playerIds) => {
  playerHands = {};

  playerIds.forEach((id) => {
    cards = shuffle(cards);
    const _cards = [...cards.splice(0, 10)];
    playerHands[id] = _cards.sort(sortCard);
  });
}

const initGame = (playerIds = []) => {
  resetGame();
  initStack();
  initPlayerHands(playerIds);
}

const getStacks = () => {
  return JSON.stringify(stacks);
}

const getPlayerHands = (id) => {
  return JSON.stringify(playerHands[id])
}

const joinGame = (id) => {
  playerJoinedGame.push(id);
}

const isPlayerReady = () => {
  return playerJoinedGame.length === Object.keys(playerHands).length;
}

const playerSelectCard = (playerId, card) => {
  playersSelectedCard[playerId] = card;

  playerHands[playerId] = playerHands[playerId].filter((_card) => _card.no !== card.no);

  return Object.keys(playersSelectedCard).length === Object.keys(playerHands).length;
}

const getPlayersSelectedCard = () => {
  return playersSelectedCard;
}

const calculateStacks = () => {
  

  // check existing stack
  const lowestCard = stacks.stack1.at(-1);
  const needToBuy = sortedCards[0].no < lowestCard.no;
  console.log(sortedCards[0].no, lowestCard.no, needToBuy);
}

const getsortedSelectedCard = () => {
  const _cards = Object.keys(playersSelectedCard).map((playerId) => ({
    ...playersSelectedCard[playerId],
    ownerId: playerId
  }));

  return _cards.sort(sortCard);
}

const shouldBuyStack = (_cards) => {
  // 
}

module.exports = {
  initGame,
  getStacks,
  getPlayerHands,
  joinGame,
  isPlayerReady,
  playerSelectCard,
  getPlayersSelectedCard,
  getsortedSelectedCard,
  shouldBuyStack
}