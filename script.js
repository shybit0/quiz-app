const quizUrl = 'quiz.json';
const quizContainer = document.querySelector(".quiz-container");

let questionIndex = 0;
let correctAnswers = 0;

fetch(quizUrl)
.then(res => res.json())
.then(quiz => loadQuiz(quiz));

async function loadQuiz(quiz){
    quizContainer.innerHTML = `
            <h1 class="quiz-header">TRIVIA Quiz</h1>
            <button id="start">Start Quiz</button>
    `;
    
    const startButton = quizContainer.querySelector("#start");
    startButton.addEventListener('click', e => {
        renderQuestion();
    });

    const totalQuestions = quiz.results.length;

    function renderQuestion(){
        const quizData = quiz.results[questionIndex];

        const question = quizData.question;
        const incorrectAnswers = quizData.incorrect_answers;
        const correctAnswer = quizData.correct_answer;
    
        const answers = [...incorrectAnswers, correctAnswer];
        quizContainer.innerHTML = `
                <h2 class="question-header">${question}</h2>
                <ul class="answers">
                    ${answers.map(ans => (
                        `<li>
                            <label data-correct="${quizData.correct_answer === ans ? '1' : '0'}">
                                <input type="radio" name="question_${questionIndex}"/> ${ans}
                            </label>
                        </li>`
                    )).join("")}
                </ul>
                <button id="next">Next</button>
            `;
        
        const nextButton = document.querySelector("#next");
        nextButton.addEventListener("click", () => {
            const checked = document.querySelector('input:checked');
            if(!checked) return;

            const label  = checked.parentNode;
            const isCorrect = label.dataset.correct === "1";
            if(isCorrect){
                correctAnswers++;
            }

            questionIndex++;

            if(questionIndex >= totalQuestions){
                // Display score
                renderResult();
                return;
            }
    
            renderQuestion();
        });
    }

    function renderResult(){
        quizContainer.innerHTML = `
                <h2 class="quiz-header">TRIVIA Quiz</h2>
                <p>Your score is <span>${correctAnswers}<span> out of <span>${totalQuestions}<span></p>
                <button id="restart">Restart Quiz</button>
        `;

        const restartButton = quizContainer.querySelector("#restart");
        restartButton.onclick = e => {
            questionIndex = 0;
            correctAnswers = 0;
            renderQuestion(questionIndex);
        }
    }
}



