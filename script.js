let questions = [
  {
    question: 'Welches Land ist das größte der Welt nach Fläche?',
    answer_1: 'China',
    answer_2: 'Kanada',
    answer_3: 'Russland',
    answer_4: 'USA',
    right_answer: 3,
  },
  {
    question: 'Welcher Fluss ist der längste der Welt?',
    answer_1: 'Amazonas',
    answer_2: 'Nil',
    answer_3: 'Mississippi',
    answer_4: 'Yangtze',
    right_answer: 2,
  },
  {
    question: 'In welchem Land befindet sich die Stadt Sydney?',
    answer_1: 'Kanada',
    answer_2: 'Australien',
    answer_3: 'USA',
    answer_4: 'Südafrika',
    right_answer: 2,
  },
  {
    question: 'Welcher Kontinent ist der kleinste der Welt?',
    answer_1: 'Asien',
    answer_2: 'Europa',
    answer_3: 'Australien',
    answer_4: 'Afrika',
    right_answer: 3,
  },
  {
    question: 'Wie viele Kontinente gibt es auf der Erde?',
    answer_1: '5',
    answer_2: '6',
    answer_3: '7',
    answer_4: '8',
    right_answer: 3,
  },
];

let rightQuestions = 0;
let currentQuestion = 0;

let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
  document.getElementById('all_questions').innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById('end_screen').style = '';
  document.getElementById('question_body').style = 'display: none';
  document.getElementById('amount_of_questions').innerHTML = questions.length;
  document.getElementById('amount_of_right_questions').innerHTML = rightQuestions;
  document.getElementById('header_img_top').src = 'img/trophy.jpg';
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById('single_question').innerHTML = currentQuestion + 1;

  document.getElementById('questionText').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = question['answer_1'];
  document.getElementById('answer_2').innerHTML = question['answer_2'];
  document.getElementById('answer_3').innerHTML = question['answer_3'];
  document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById('progress_bar').innerHTML = `${percent} %`;
  document.getElementById('progress_bar').style.width = `${percent}%`;
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);

  let idOfRightAnswer = `answer_${question['right_answer']}`;

  if (rightAnswerSelected(selectedQuestionNumber)) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    AUDIO_SUCCESS.play();
    rightQuestions++;
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
  }

  document.getElementById('btn_nextQuestion').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
  return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
  currentQuestion++;

  document.getElementById('btn_nextQuestion').disabled = true;

  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document.getElementById('answer_1').parentNode.classList.remove('bg-success');
  document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success');
  document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success');
  document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success');
  document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame() {
  document.getElementById('header_img_top').src = 'img/pencil.jpg';
  document.getElementById('end_screen').style = 'display: none'; // endscreen ausblenden
  document.getElementById('question_body').style = ''; // questionBody wieder anzeigen

  rightQuestions = 0;
  currentQuestion = 0;

  init();
}
