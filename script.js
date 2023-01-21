let currentQuestion = 0;

function init(){
    document.getElementById('all-questionId').innerHTML = questions.length;

    showQuestion();
}

function showQuestion(){
let question = questions[currentQuestion];

document.getElementById('questionId').innerHTML = question.question;
document.getElementById('answer_1_Id').innerHTML = question.answer_1;
document.getElementById('answer_2_Id').innerHTML = question.answer_2;
document.getElementById('answer_3_Id').innerHTML = question.answer_3;
document.getElementById('answer_4_Id').innerHTML = question.answer_4;


}