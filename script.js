let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('mp3/correct.mp3');
let AUDIO_FAIL = new Audio('mp3/wrong.mp3');


function init() {
    document.getElementById('all-questionId').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        endScreen();
    } else {
        resetForNextQuestion();
        percentProgressBar();
        let question = questions[currentQuestion];

        document.getElementById('questionId').innerHTML = question.question;
        document.getElementById('answer_1_Id').innerHTML = question.answer_1;
        document.getElementById('answer_2_Id').innerHTML = question.answer_2;
        document.getElementById('answer_3_Id').innerHTML = question.answer_3;
        document.getElementById('answer_4_Id').innerHTML = question.answer_4;
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionsNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_` + question.right_answer + `_Id`;

    if (rightAnswerSelected(selectedQuestionsNumber, question)) {
        document.getElementById(selection + '_Id').parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightAnswers++;
    }
    else {
        document.getElementById(selection + '_Id').parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
    dontClickButton();
}

function rightAnswerSelected(selectedQuestionsNumber, question) {
    return selectedQuestionsNumber == question.right_answer;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    clickButton();
}

function resetForNextQuestion() {
    document.getElementById('next-button').disabled = true;
    document.getElementById('question-numberId').innerHTML = currentQuestion + 1;

    /* loop to reset all buttons */
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i + '_Id').parentNode.classList.remove('bg-danger', 'bg-success');
    }
}

function endScreen() {
    document.getElementById('endscreenId').style = '';
    document.getElementById('question-bodyId').style = 'display: none';
    document.getElementById('progressBarId').parentNode.style = 'display:none;';
    document.getElementById('right-questionId').innerHTML = rightAnswers;
    document.getElementById('all-questionId-end').innerHTML = questions.length;
}

function percentProgressBar() {
    let percent = 100 / questions.length * (currentQuestion + 1);
    let width = 'width:' + percent + '%';

    if (currentQuestion == 0)
        document.getElementById('progressBarId').style = 'width: 0%';
    else
        document.getElementById('progressBarId').style = width;
}

function restartGame() {
    currentQuestion = 0;
    rightAnswers = 0;
    document.getElementById('question-bodyId').style = '';
    document.getElementById('progressBarId').parentNode.style = '';
    document.getElementById('endscreenId').style = 'display: none';
    init();
}

function dontClickButton() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i + '_Id').parentNode.removeAttribute("onclick");
        document.getElementById('answer_' + i + '_Id').parentNode.classList.remove('quiz-answer-card');
    }
}

function clickButton() {
    let onclick;

    for (let i = 1; i < 5; i++) {
        onclickVar = "answer('answer_" + i + "')";
        document.getElementById('answer_' + i + '_Id').parentNode.setAttribute("onclick", onclickVar);
        document.getElementById('answer_' + i + '_Id').parentNode.classList.add('quiz-answer-card');
    }
}