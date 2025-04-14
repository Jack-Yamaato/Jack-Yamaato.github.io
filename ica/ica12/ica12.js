let currentQuestion = null;
const newQuoteButton = document.querySelector('#js-new-quote');
const answerContainer = document.getElementById('js-answer-buttons');
const feedbackText = document.getElementById('js-feedback-text');

newQuoteButton.addEventListener('click', getTrivia);

function getTrivia() {
    fetch('https://the-trivia-api.com/v2/questions')
        .then(res => res.json())
        .then(data => {
            const trivia = data[0];
            currentQuestion = {
                question: trivia.question.text,
                correctAnswer: trivia.correctAnswer,
                answers: shuffleArray([trivia.correctAnswer, ...trivia.incorrectAnswers])
            };
            displayTrivia(currentQuestion);
        })
        .catch(err => {
            console.error("Error fetching trivia:", err);
            alert("Failed to load trivia.");
        });
}

function displayTrivia(trivia) {
    document.getElementById('js-quote-text').textContent = trivia.question;
    feedbackText.textContent = '';
    answerContainer.innerHTML = '';

    trivia.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.classList.add('answer-button');
        btn.addEventListener('click', () => checkAnswer(answer));
        answerContainer.appendChild(btn);
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === currentQuestion.correctAnswer) {
        feedbackText.textContent = "✅ Correct!";
        feedbackText.style.color = "green";
    } else {
        feedbackText.textContent = `❌ Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`;
        feedbackText.style.color = "red";
    }

    Array.from(answerContainer.children).forEach(btn => {
        btn.disabled = true;
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.addEventListener('DOMContentLoaded', getTrivia);
