// Login Page
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple validation for demo purposes
    if (username === "admin" && password === "123") {
      document.getElementById("login-page").style.display = "none";
      document.getElementById("quiz-app").style.display = "block";
      initializeQuiz();
    } else {
      document.getElementById("login-error").innerText =
        "Invalid username or password";
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });

function initializeQuiz() {
  startQuiz(); // Start the quiz
}

//

const questions = [
  {
    question: `What is the correct way to declare a variable in JavaScript?`,
    answers: [
      { text: "var name = `John`", correct: false },
      { text: `let name = "John"`, correct: false },
      { text: `const name = "John"`, correct: false },
      { text: `All of the above`, correct: true },
    ],
  },
  {
    question: "How can you write a comment in JavaScript?",
    answers: [
      { text: "// This is a comment", correct: true },
      { text: "/* This is a comment */", correct: false },
      { text: "# This is a comment", correct: false },
      { text: "! This is a comment", correct: false },
    ],
  },
  {
    question: "Which operator is used for checking equality in JavaScript?",
    answers: [
      { text: "=", correct: false },
      { text: "==", correct: true },
      { text: "===", correct: false },
      { text: "!==", correct: false },
    ],
  },
  {
    question: `What is the data type of the following: let x = true;

    `,
    answers: [
      { text: "string", correct: false },
      { text: "number", correct: false },
      { text: "boolean", correct: true },
      { text: "array", correct: false },
    ],
  },
  {
    question: `How do you loop through the elements of an array?;

    `,
    answers: [
      { text: "for loop", correct: true },
      { text: "while loop", correct: false },
      { text: "do-while loop", correct: false },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question: `What method is used to convert a JavaScript object to a JSON string?;

    `,
    answers: [
      { text: "toString()", correct: false },
      { text: "toJSON()", correct: false },
      { text: "stringify()", correct: true },
      { text: "parse()", correct: false },
    ],
  },
  {
    question: `What is the scope of a variable declared with let?;

    `,
    answers: [
      { text: "Global scope", correct: false },
      { text: "Function scope", correct: true },
      { text: "Block scope", correct: false },
      { text: "Both function and block scope", correct: false },
    ],
  },
  {
    question: `How do you define a function in JavaScript?;

    `,
    answers: [
      { text: "function myFunction() { ... }", correct: true },
      { text: "def myFunction() { ... }", correct: false },
      { text: "func myFunction() { ... }", correct: false },
      { text: "createFunction myFunction() { ... }", correct: false },
    ],
  },
  {
    question: `What is the difference between == and === operators?;

    `,
    answers: [
      { text: "There is no difference.", correct: false },
      {
        text: "=== checks for strict equality (value and type), while == only checks for value equality.",
        correct: true,
      },
      { text: "=== is for strings, == is for numbers.", correct: false },
      {
        text: "== is for comparing objects, === is for primitives.",
        correct: false,
      },
    ],
  },
  {
    question: `What is an event listener in JavaScript?;

    `,
    answers: [
      {
        text: " A function that waits for a specific event to occur.",
        correct: true,
      },
      { text: "A variable that stores data.", correct: false },
      { text: "A way to loop through an object.", correct: false },
      { text: "A method for manipulating the DOM.", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  startTimer(60);
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  clearInterval(timer);
  timerElement.innerText = 60;
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  clearInterval(timer);

  startTimer(5);
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  timerElement.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
//
function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("quiz-app").style.display = "none";
  document.getElementById("login-page").style.display = "block";
  document.getElementById("login-form").reset();
  document.getElementById("login-error").innerText = "";
  timerElement.style.display = "block";
}
//
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    // startQuiz();
    restartQuiz();
  }
});

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

shuffleQuestions();

function startTimer(seconds) {
  timeLeft = seconds;
  timerElement.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNextButton();
    }
  }, 1000);
}
