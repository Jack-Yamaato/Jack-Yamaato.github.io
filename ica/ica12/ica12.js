let currentTrivia = null;

const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

newQuoteButton.addEventListener('click',getQuote);
answerButton.addEventListener('click',showAnswer);

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

function getQuote(){
    console.log("Button Clicked!");

    fetch(endpoint)
        .then(response => {
            if(!response.ok){
                throw new Error("Network was not ok");
            }
            return response.json();
        })
        .then(data =>{
            currentTrivia = data;
            console.log("Trivia",data.question);
            displayQuote(data);
        })
        .catch(error => {
            console.error("Fetch error:", error); // Step 6: Error logging
            alert("Failed to fetch trivia. Please try again later.");
        });
}

function displayQuote(data){
    const quoteText = document.getElementById('js-quote-text');
    const answerText = document.getElementById('js-answer-text');

    quoteText.textContent = data.question;
    answerText.textContent = '';
}

function showAnswer() {
    if (currentTrivia && currentTrivia.answer) {
      const answerText = document.getElementById('js-answer-text');
      answerText.textContent = currentTrivia.answer;
    } else {
      alert("No question loaded yet!");
    }
}

document.addEventListener('DOMContentLoaded', getQuote);