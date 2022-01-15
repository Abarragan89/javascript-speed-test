"use strict";
const bodyEl = document.querySelector("body");
const startBtnEl = document.getElementById("startBtn");
const mainEl = document.createElement("main");
const problems = [
    {
        question: "String values must be enclosed within ______ when being assigned to variable.",
        answers: 
        ["<p data-answer='true'>parenthesis</p>", 
        "<p>commas</p>", 
        "<p>quotes</p>",
        "<p>curly brackets</p>"]
    }
]


// Set up the opening page
const homePage = function () {
    // Header (create 'view high scores' and timer elements)
    // view high scores:
    const headerEl = document.createElement("header");
    bodyEl.appendChild(headerEl);
    const headerLinkEl = document.createElement("a");
    headerLinkEl.textContent = "View high scores"
    headerLinkEl.setAttribute("href", "#")
    headerEl.appendChild(headerLinkEl);
    // timer element:
    const headerTimerEl = document.createElement("div");
    headerTimerEl.innerHTML = "<p>Timer: </p><span id='timer'>" + timer.seconds + "</span>";
    headerEl.appendChild(headerTimerEl)

    // Main (create title, instructions, and start button) 
    // title:
    insertAfter(mainEl, headerEl)
    const homepageTitleEl = document.createElement("h1");
    homepageTitleEl.textContent = "Coding Quiz Challenge";
    homepageTitleEl.className = "title"
    mainEl.appendChild(homepageTitleEl);
    // instructions:
    const instructionsEl = document.createElement("p")
    instructionsEl.className = "instructions"
    instructionsEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    mainEl.appendChild(instructionsEl);
    // button: 
    const startBtnEl = document.createElement("button");
    startBtnEl.className = "btn"
    startBtnEl.id = "startBtn"
    startBtnEl.textContent = "Start Quiz"
    mainEl.appendChild(startBtnEl);
    // give the button functionality
    startBtnEl.addEventListener("click", startGame)
}

const startGame = function () {
    //shuffle array
    shuffle(problems);
    deleteMain();
    displayProblem();
    // initial timer
    timer.clock();
    answerFunctionality();

    // recreate main
}
const displayProblem = function () {
    // display question
    const questionDiv = document.createElement("div");
    questionDiv.className = "question_div"
    const question = document.createElement("h2");
    question.className = "question"
    question.textContent = problems[0].question
    questionDiv.appendChild(question);
    // display answers
    const answerArr = shuffle(problems[0].answers)
    console.log(answerArr);
    for(let i = 0; i < 4; i++) {
        const answerButton = document.createElement("button");
        answerButton.className = "btn answerBtn";
        answerButton.innerHTML = (i + 1)+". " + answerArr[i];
        // check to see if it was the correct answer and add class to it if it is. 
        // class is needed to check when adding event handler
        // if (answerArr[i].hasAttribute("data-answer")){
        //     answer
        // }

        questionDiv.appendChild(answerButton);
    }
    mainEl.appendChild(questionDiv);
}
// Timer object
const timer = {
    seconds: 5,
    countdown: function() {
        this.seconds--;
        const timer = document.getElementById("timer");
        timer.textContent = this.seconds;
        if (this.seconds === 0){
            alert("Times Up")
            clearInterval(clock);
        }
    },
    clock: function() {
        setInterval(this.countdown, 1000);
    }
};

// add event listener to .question_div
// if event.target.class === 'correct' execute correct function
// else execute incorrect function
const reviewer = function(event) {
    if (event.target.hasAttribute("data-answer")) {
        alert("correct");
    } else {
        alert("incorrect");
    }
}

const answerFunctionality = function () {
    const buttonAnswerArr = document.querySelectorAll(".answerBtn");
    for (let i =0; i < buttonAnswerArr.length; i++){
        buttonAnswerArr[i].addEventListener("click", reviewer);
    }
}



// Initial Function Call
homePage();










// HELPER FUNCTIONS
// insert after
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// erase the main section
function deleteMain() {
    let element = document.querySelector("main")
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
// Random Number
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Shuffle Array 
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}