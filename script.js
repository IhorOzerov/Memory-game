let matchedCard = 0;
let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;
const CARDS = document.querySelectorAll(".flipper");
const MAIN_BOARD = document.querySelector(".flip-container")
const WIN_TABLE = document.querySelector(".winTable");
const WIN_BUTTON = document.querySelector(".winButton");

function winner() {
  setTimeout(() => {
    WIN_TABLE.style.display = 'grid';
  }, 1500);
};

function tryAgain() {
  WIN_TABLE.style.display = 'none'
} 

WIN_BUTTON.addEventListener('click', tryAgain);

function flipCard(e){
  if (boardLocked === true) { return };
  
  const TARGET = e.target.parentElement;

  if (TARGET === MAIN_BOARD) { return };

  TARGET.classList.add("flip");
 
  if (hasFlippedCard === false) {
    hasFlippedCard = true;
    firstCard = TARGET;
    firstCard.style.pointerEvents = "none";
  } else {
    secondCard = TARGET;
    firstCard.style.pointerEvents = "auto"; 

    checkForMatch();
    
    hasFlippedCard = false;
  }
};

function checkForMatch() {
const isEqual = firstCard.dataset.name === secondCard.dataset.name;
isEqual ? disableCards() : unflipCards();
};

function disableCards() {
firstCard.style.pointerEvents = "none";
secondCard.style.pointerEvents = "none";
  
  matchedCard++; 
  if (matchedCard === 8) {
      setTimeout(() => {                       
        CARDS.forEach(card => {
          card.style.pointerEvents = "auto";
        })
      return shuffleCard();
      }, 2000);
    return winner();
}};

function unflipCards() { 
                     
boardLocked = true;
                    
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    hasFlippedCard = false;
    boardLocked = false;
    }, 1000);
  };
        
  function shuffleCard() {
    matchedCard = 0;
    boardLocked = false;

    CARDS.forEach(card => {
    card.addEventListener('click', flipCard);
    card.classList.remove("flip");
    
    const RANDOM_INDEX = Math.floor(Math.random() * CARDS.length);
    card.style.order = RANDOM_INDEX;
  })
};
shuffleCard();
