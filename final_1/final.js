const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let availableNumbers = 1;
let phoneNumber = "";

const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const playerScoreDiv = document.getElementById('player-score');
const dealerScoreDiv = document.getElementById('dealer-score');
const messageDiv = document.getElementById('message');
const numberCountSpan = document.getElementById('number-count');
const phoneInput = document.getElementById('phone-number');
const overlayDiv = document.getElementById('overlay');

document.getElementById('bet-button').addEventListener('click', startRound);
document.getElementById('hit-button').addEventListener('click', playerHit);
document.getElementById('stand-button').addEventListener('click', playerStand);

function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11; // initially treat Ace as 11
    }
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
    hand.forEach(card => {
        score += getCardValue(card);
        if (card.value === 'ace') aceCount++;
    });

    // Adjust for ace automatically if bust
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function startRound() {
    hideOverlay();
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';
    messageDiv.textContent = '';

    for (let i = 0; i < 2; i++) {
        drawPlayerCard();
    }
    playerScore = calculateScore(playerHand);
    playerScoreDiv.textContent = `Score: ${playerScore}`;
}

function drawPlayerCard() {
    const card = getRandomCard();
    if (card.value === 'ace') {
        let aceChoice = confirm("You drew an Ace! OK for 11, Cancel for 1");
        if (!aceChoice) {
            card.value = '1';
        }
    }
    playerHand.push(card);
    renderCard(card, playerCardsDiv);
}

function playerHit() {
    drawPlayerCard();
    playerScore = calculateScore(playerHand);
    playerScoreDiv.textContent = `Score: ${playerScore}`;

    if (playerScore > 21) {
        endRound(false); // Player bust
    }
}

function playerStand() {
    dealerTurn();
}

function dealerTurn() {
    dealerPull();
}

function dealerPull() {
    const interval = setInterval(() => {
        const card = getRandomCard();
        dealerHand.push(card);
        renderCard(card, dealerCardsDiv);
        dealerScore = calculateScore(dealerHand);
        dealerScoreDiv.textContent = `Score: ${dealerScore}`;

        if (dealerScore >= 17) {
            clearInterval(interval);
            determineWinner();
        } else if (dealerScore > 21) {
            clearInterval(interval);
            endRound(true); // Dealer bust
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
    if (playerWon) {
        messageDiv.textContent = "You Win!";
        availableNumbers *= 2;
        showOverlay('green');
    } else {
        messageDiv.textContent = "You Lose!";
        availableNumbers = Math.floor(availableNumbers / 2);
        showOverlay('red');

        if (availableNumbers <= 0) {
            messageDiv.textContent += " Restarting phone input!";
            phoneNumber = "";
            availableNumbers = 1;
        }
    }
    numberCountSpan.textContent = availableNumbers;
    updatePhoneInput();
}

function updatePhoneInput() {
    const digits = '0123456789';
    for (let i = 0; i < availableNumbers; i++) {
        const randomDigit = digits[Math.floor(Math.random() * digits.length)];
        phoneNumber += randomDigit;
    }
    phoneInput.value = phoneNumber;
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
