let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = e => {
  if (boardLocked) return;

  const target = e.target.parentElement;

  if (target === firstCard) return;

  target.classList.add("flip");
  
  if (hasFlippedCard === false) {
    hasFlippedCard = true;
    firstCard = target;
  } else {
    hasFlippedCard = false;
    secondCard = target;

    checkForMatch();
  }
};

const checkForMatch = () => {
  const isEqual = firstCard.dataset.name === secondCard.dataset.name;
  isEqual ? disableCards() : unflipCards();
};

    const disableCards = (e) => {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    };

    const unflipCards = () => {
      boardLocked = true;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
      
        resetBoard();
      }, 800);
    };

const resetBoard = () => {
  hasFlippedCard = boardLocked = false;
  firstCard = secondCard = null;
};

const cards = document.querySelectorAll(".flipper");

cards.forEach(card => {
  card.addEventListener('click', flipCard);
  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
});
