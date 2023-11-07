// Define your HTML elements
const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionElement = document.getElementById("question-title");
const answersElement = document.getElementById("choices");
const scoreElement = document.getElementById("final-score");
const leaderboardElement = document.getElementById("leaderboard");

// Define your questions and answers
const questions = [
  {
        question: "What is Javascript?",
        answers: ["1. A type of mobile device", "2. One of the core programming languages of the World Wide Web", "3. A method for ordering coffee. A 'Java Script'", "4. A JavaScript is a term used when CSS is written in a HTML file"],
        correctAnswer: 1
    },
    {
        question: "Which is the most used programming language in the world today?",
        answers: ["1. JavaScript", "2. PHP", "3. Python", "4. C#"],
        correctAnswer: 0
    },
    {
        question: "What is the working methodology applied at most tech companies?",
        answers: ["1. Fast", "2. Nifty", "3. Agile", "4. Sporty"],
        correctAnswer: 2
    },
    {
        question: "How do you make a new file in Git Bash?",
        answers: ["1. Git add filename", "2. git commit filename", "3. ls filename", "4. touch filename"],
        correctAnswer: 3
    },
    {
        question: "What is an API in programming?",
        answers: ["1. A Private Internet", "2. Application Programming Interface", "3. Applied Programming Intelligence", "4. Automated Profit Investing"],
        correctAnswer: 1
    }
];

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Sound effects
const correctSound = new Audio('assets/sfx/correct.wav');
const incorrectSound = new Audio('assets/sfx/incorrect.wav');

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  displayQuestion(currentQuestionIndex);
  setTimer();
}

// Function to display a question
function displayQuestion(index) {
  // Display the question and answer options
  const question = questions[index];
  questionElement.textContent = question.question;
  answersElement.innerHTML = "";
  question.answers.forEach((answer, i) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(i));
    answersElement.appendChild(button);
  });
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  if (selectedIndex === question.correctAnswer) {
    score++;
    correctSound.play();
  } else {
    timer -= 10;
    incorrectSound.play();
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

// Function to set and update the timer
function setTimer() {
  timer = 60;
  timerElement.textContent = timer;
  const countdown = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer <= 0) {
      clearInterval(countdown);
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Display final score
  questionElement.textContent = "Quiz Over!";
  answersElement.innerHTML = "";
  scoreElement.textContent = `Your Score: ${score}`;
  leaderboardElement.style.display = "block";
}

// Event listener for starting the quiz
startButton.addEventListener("click", startQuiz);