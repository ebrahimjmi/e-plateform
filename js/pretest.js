const questions = [
  {
    question: "which is the largest animal in the world",
    answer: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue whale",
        correct: true,
      },
      {
        text: "Elephan",
        correct: false,
      },
      {
        text: "Giraffe",
        correct: false,
      },
    ],
  },
  {
    question: "which is the smallest country in the world",
    answer: [
      {
        text: "Vetikan city",
        correct: true,
      },
      {
        text: "Bhutan",
        correct: false,
      },
      {
        text: "Shri lanka",
        correct: false,
      },
      {
        text: "Nepal",
        correct: false,
      },
    ],
  },
  {
    question: "which is the largest Desert in the world",
    answer: [
      {
        text: "kalahri",
        correct: false,
      },
      {
        text: "gobi",
        correct: false,
      },
      {
        text: "Sahara",
        correct: false,
      },
      {
        text: "Antartika",
        correct: true,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

let btnClasses = [
  "d-block",
  "border",
  "border-1",
  "w-100",
  "text-start",
  "mt-2",
];

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    btnClasses.forEach((cls) => {
      button.classList.add(cls);
    });
    answerBtn.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  console.log(e.target);
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if(isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  }
  else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach(button => {
    console.log(button);
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disable = true;
  })
  nextBtn.style.display = "block";
}

function showScore () {
  resetState();
  questionElement.innerHTML = `your record ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again"; 
  nextBtn.style.display = 'block'
}
function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion()
  }else {
    showScore();
  }
}


nextBtn.addEventListener("click", function() {
  if(currentQuestionIndex < questions.length) {
    handleNextButton()
  } else {
    startQiz();
  }
})

startQiz();
