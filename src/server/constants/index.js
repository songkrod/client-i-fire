const ROOM_ID = (Math.random() + 1).toString(36).substring(7).toUpperCase();
const MAX_CARD = 104;
const CARD_SOCRE = {
  b2: [5, 15, 25, 35, 45, 65, 75, 85, 95],
  b3: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  b5: [11, 22, 33, 44, 66, 77, 88, 99],
  b7: [55]
}

module.exports = {
  ROOM_ID,
  MAX_CARD,
  CARD_SOCRE
}