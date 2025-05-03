const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let availableNumbers = 1;
let phoneDigits = "";

const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const playerScoreDiv = document.getElementById('player-score');
const dealerScoreDiv = document.getElementById('dealer-score');
const messageDiv = document.getElementById('message');
const numberCountSpan = document.getElementById('number-count');
const phoneInput = document.getElementById('phone-number');
const overlayDiv = document.getElementById('overlay');
const betButton = document.getElementById('bet-button');
const submitButton = document.getElementById('submit-button');

document.getElementById('hit-button').addEventListener('click', playerHit);
document.getElementById('stand-button').addEventListener('click', playerStand);
betButton.addEventListener('click', startRound);
submitButton.addEventListener('click', submitPhoneNumber);

function closeRules() {
  document.getElementById('rules-popup').style.display = 'none';
}

window.onload = () => {
  showRules();
  updatePhoneInput();
};

function showRules() {
  document.getElementById('rules-popup').style.display = 'block';
}

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

function getCardValue(card) {
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

function renderCard(card, container) {
  const img = document.createElement('img');
  img.src = `playing-cards-master/${card.suit}_${card.value}.png`;
  img.alt = `${card.value} of ${card.suit}`;
  container.appendChild(img);
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;
  for (let card of hand) {
    score += getCardValue(card);
    if (card.value === 'A') aceCount++;
  }
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }
  return score;
}

function setGameButtons(state) {
    document.getElementById('hit-button').disabled = !state;
    document.getElementById('stand-button').disabled = !state;
    betButton.disabled = !state || availableNumbers >= 10;
}  

function startRound() {
    if (availableNumbers >= 10) return;
  
    hideOverlay();
    setGameButtons(true);
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';
    messageDiv.textContent = '';
  
    for (let i = 0; i < 2; i++) drawPlayerCard();
    playerScore = calculateScore(playerHand);
    playerScoreDiv.textContent = `Score: ${playerScore}`;
}  

function drawPlayerCard() {
  const card = getRandomCard();
  if (card.value === 'A') {
    let aceChoice = confirm("You drew an Ace! OK for 11, Cancel for 1");
    if (!aceChoice) card.value = '1';
  }
  playerHand.push(card);
  renderCard(card, playerCardsDiv);
}

function playerHit() {
  drawPlayerCard();
  playerScore = calculateScore(playerHand);
  playerScoreDiv.textContent = `Score: ${playerScore}`;
  if (playerScore > 21) endRound(false);
}

function playerStand() {
    setGameButtons(false);
    dealerTurn();
}
  

function dealerTurn() {
    setGameButtons(false);
    const interval = setInterval(() => {
      const card = getRandomCard();
      dealerHand.push(card);
      renderCard(card, dealerCardsDiv);
      dealerScore = calculateScore(dealerHand);
      dealerScoreDiv.textContent = `Score: ${dealerScore}`;
      if (dealerScore >= 17 || dealerScore > 21) {
        clearInterval(interval);
        determineWinner();
      }
    }, 1000);
}  

function determineWinner() {
  if (playerScore > dealerScore || dealerScore > 21) {
    endRound(true);
  } else {
    endRound(false);
  }
}

function endRound(playerWon) {
    setGameButtons(false);

    if (playerWon) {
        messageDiv.textContent = "You Win!";
        availableNumbers = Math.min(availableNumbers * 2, 10);
        showOverlay('green');
    } else {
        messageDiv.textContent = "You Lose!";
        availableNumbers = Math.floor(availableNumbers / 2);
        showOverlay('red');
        if (availableNumbers <= 0) {
        messageDiv.textContent += " Restarting phone input!";
        phoneDigits = "";
        availableNumbers = 1;
        }
    }

    if (availableNumbers >= 10) {
        alert("You now have 10 digits! Enter and submit your full phone number.");
    }

    updatePhoneInput();
    numberCountSpan.textContent = availableNumbers;
}
  

function updatePhoneInput() {
    const existing = phoneDigits.substring(0, availableNumbers);
    const placeholderX = 'x'.repeat(10 - existing.length);
    phoneInput.value = existing + placeholderX;
    phoneInput.disabled = false;
  
    if (availableNumbers >= 10) {
      betButton.disabled = true;
      submitButton.disabled = false;
    } else {
      betButton.disabled = false;
      submitButton.disabled = true;
    }
}  

phoneInput.addEventListener('input', (e) => {
  let raw = e.target.value.replace(/[^0-9]/g, '').substring(0, availableNumbers);
  phoneDigits = raw;
  updatePhoneInput();
});

function submitPhoneNumber() {
  if (phoneDigits.length === 10) {
    alert("Phone number completed!");
    resetGame();
  }
}

function showOverlay(color) {
  overlayDiv.style.backgroundColor = color === 'green' ? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 0, 0, 0.4)';
  overlayDiv.style.display = 'block';
  setTimeout(() => {
    overlayDiv.style.display = 'none';
  }, 2000);
}

function hideOverlay() {
  overlayDiv.style.display = 'none';
}

function resetGame() {
  phoneDigits = "";
  availableNumbers = 1;
  updatePhoneInput();
  numberCountSpan.textContent = availableNumbers;
  playerCardsDiv.innerHTML = '';
  dealerCardsDiv.innerHTML = '';
  playerScoreDiv.textContent = "Score: 0";
  dealerScoreDiv.textContent = "Score: 0";
  messageDiv.textContent = "";
}

// Developer shortcut
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'D') {
      availableNumbers = 10;
      phoneDigits = "1234567890";
      updatePhoneInput();
      numberCountSpan.textContent = availableNumbers;
      alert("Developer test: Phone input unlocked for testing.");
    }
  });
  

