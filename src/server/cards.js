const MAX_CARD = 104;

const buff = {
  b2: [5, 15, 25, 35, 45, 65, 75, 85, 95],
  b3: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  b5: [11, 22, 33, 44, 66, 77, 88, 99],
  b7: [55]
}

const cards = Array.apply(null, Array(MAX_CARD)).map(function (x, i) {
  const no = i + 1;
  let buffScore = 1;

  if (buff.b2.includes(no)) {
    buffScore = 2;
  } else if (buff.b3.includes(no)) {
    buffScore = 3;
  } else if (buff.b5.includes(no)) {
    buffScore = 5;
  } else if (buff.b7.includes(no)) {
    buffScore = 7;
  }
  

  return {
    no: no,
    buff: buffScore,
  }
});

const shuffle = (_cards) => {
  const array = [..._cards];
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getCards = () => {
  return shuffle(cards);
}

module.exports = {
  getCards,
  shuffle
}