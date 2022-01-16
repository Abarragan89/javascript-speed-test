"use strict";
let seconds = 75;
let clock;
let questionCount = 0;
let score = 0;
let player = "";

const bodyEl = document.querySelector("body");
const startBtnEl = document.getElementById("startBtn");
const mainEl = document.createElement("main");
const problems = [
    {
        question: "String values must be enclosed within ______ when being assigned to variable.",
        answers:
            ["<p data-answer='true' class='correct'>parenthesis</p>",
                "<p>commas</p>",
                "<p>quotes</p>",
                "<p>curly brackets</p>"]
    },
    {
        question: "What is a function?",
        answers:
            ["<p data-answer='true' class='correct'>block of code that will execute when called</p>",
                "<p>a specific type of for-loop</p>",
                "<p>an object with that cannot be changed</p>",
                "<p>code that will execute automatically</p>"]
    },
    {
        question: "What are arrays used for?",
        answers:
            ["<p data-answer='true' class='correct'>to store data as a list</p>",
                "<p>store data as key-value pairs</p>",
                "<p>iterate through objects</p>",
                "<p>iterate through DOM elements</p>"]
    },
    {
        question: "How can we access HTML elements using Javascript?",
        answers:
            ["<p data-answer='true' class='correct'>by accessing the Document Object Model</p>",
                "<p>by accessing the objects in the HTML</p>",
                "<p>by accessing CSS selectors</p>",
                "<p>you cannot access the HTML with Javascript</p>"]
    },
    // {
    //     question: "What is the syntax for a for loop?",
    //     answers:
    //         ["<p data-answer='true' class='correct'>for (let i = 0; i < 4; i++){code here}</p>",
    //             "<p>for (let i = 0; i < 4; i+){code here}</p>",
    //             "<p>for (let i < 0; i = 4; i++){code here}</p>",
    //             "<p>for (let i = 0 i < 4 i++){code here}</p>"]
    // },
    // {
    //     question: "Functions that belong to an object are called ____________.",
    //     answers:
    //         ["<p data-answer='true' class='correct'>Methods</p>",
    //             "<p>function objects</p>",
    //             "<p>funky objects</p>",
    //             "<p>properties</p>"]
    // },
    // {
    //     question: "What is one good use for 'console.log'?",
    //     answers:
    //         ["<p data-answer='true' class='correct'>check for variables with debugging</p>",
    //             "<p>give user feedback</p>",
    //             "<p>change error codes</p>",
    //             "<p>checking for error codes</p>"]
    // },
    // {
    //     question: "We declare ___________ in order to create ____________",
    //     answers:
    //         ["<p data-answer='true' class='correct'>HTML tags / DOM elements</p>",
    //             "<p>for-loops / HTML tags </p>",
    //             "<p>arrays / DOM elements</p>",
    //             "<p>DOM elements / HTML tags</p>"]
    // },
    // {
    //     question: "What is one precaution you must take when using a while or for-loop?",
    //     answers:
    //         ["<p data-answer='true' class='correct'>Make sure there's a valid stopping condition</p>",
    //             "<p>forgetting to make key-value pairs</p>",
    //             "<p>not putting quotation marks</p>",
    //             "<p>remembering that for loops are for objects and while loops are for arrays</p>"]
    // },
    // {
    //     question: "What is the difference between 'const' and 'let' declarations?",
    //     answers:
    //         ["<p data-answer='true' class='correct'>let declarations can be changed</p>",
    //             "<p>const declarations cannot be changed</p>",
    //             "<p>there is no difference</p>",
    //             "<p>const declarations can only be made outside functions</p>"]
    // }
]
const shuffledProblems = shuffle(problems);
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
    headerTimerEl.innerHTML = "<p>Timer: </p><span id='timer'>" + seconds + "</span>";
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
    clearElement("main");
    displayProblem();
    // initial timer
    clock = setInterval(countdown, 1000);
    // give buttons event handlers
    answerBtnFunctionality();
}

const displayProblem = function () {
    if (questionCount === problems.length) {
        endGamePage();
    } else {
        // create question div
        console.log(questionCount);
        const questionDiv = document.createElement("div");
        questionDiv.className = "question_div";
        const question = document.createElement("h2");
        question.className = "question";
        // pick a question
        question.textContent = shuffledProblems[questionCount].question
        questionDiv.appendChild(question);
        // display answers
        const answerArr = shuffle(problems[questionCount].answers);
        for (let i = 0; i < 4; i++) {
            const answerButton = document.createElement("button");
            answerButton.className = "btn answerBtn";
            answerButton.innerHTML = (i + 1) + ". " + answerArr[i];
            questionDiv.appendChild(answerButton);
        }
        mainEl.appendChild(questionDiv);
        questionCount++;
    }
}
// Countdown function
const countdown = function () {
    seconds--;
    const timer = document.getElementById("timer");
    timer.textContent = seconds;
    if (seconds <= 0) {
        seconds = 0;
        alert("Times Up");
        clearInterval(clock);
        endGamePage();
    }
};

// Checks to see if the answer is correct, adds score or subtracts time. 
const reviewer = function (event) {
    if (event.target.hasAttribute("data-answer") || event.target.querySelector(".correct")) {
        console.log("correct")
        clearElement("main");
        displayProblem();
        answerBtnFunctionality();
        showCorrect();
    } else {
        console.log("incorrect");
        seconds -= 10;
        clearElement("main");
        displayProblem();
        answerBtnFunctionality();
        showWrong();
    }
}
// Remove footer when hover over button
const removeFooter = function() {
    const questionDivEl = document.querySelector(".question_div");
    const footer = document.querySelector("footer");
    if (footer) {
        questionDivEl.removeChild(footer);
    }
}

// Make buttons clickable
const answerBtnFunctionality = function () {
    const buttonAnswerArr = document.querySelectorAll(".answerBtn");
    for (let i = 0; i < buttonAnswerArr.length; i++) {
        buttonAnswerArr[i].addEventListener("click", reviewer);
        buttonAnswerArr[i].addEventListener("mouseout", removeFooter);
    }
}

// add message of "wrong" / "right"
const showCorrect = function () {
    const questionDivEl = document.querySelector(".question_div");
    const footer = document.createElement("footer");
    footer.textContent = "Correct!"
    if (questionDivEl) {
        questionDivEl.appendChild(footer);
    }
}
const showWrong = function () {
    const questionDivEl = document.querySelector(".question_div");
    const footer = document.createElement("footer");
    footer.textContent = "Wrong!"
    if (questionDivEl) {
        questionDivEl.appendChild(footer);
    }
}
// Show the ending page
const endGamePage = function() {
    document.querySelector("#timer").textContent = seconds;
    clearInterval(clock);
    clearElement("main");
    // Add message and show score
    const endingDivEl = document.createElement("div")
    endingDivEl.className = "end_page";
    mainEl.appendChild(endingDivEl);
    const title = document.createElement("h2");
    title.textContent = "All done!";
    endingDivEl.appendChild(title)
    const message = document.createElement("p")
    message.innerHTML = "Your final score is " + seconds;
    endingDivEl.appendChild(message);
    // Add form
    const formDivEl = document.createElement("div")
    formDivEl.className = "form_div";
    const formEl = document.createElement("form")
    formEl.innerHTML = "<label for='highscore'><p>Enter Initials: </p></label> <input type='text' name='highscore' id='highscore'><input type='button' value='submit' id='submit'>";
    mainEl.appendChild(formEl);
    // add functionality to submit button
    const submit = document.getElementById("submit");
    submit.className = "btn"
    submit.addEventListener("click", onSubmit);   
}

// Submit Event hander
const onSubmit = function(event) {
    event.preventDefault();
    const form = document.querySelector("form")
    let player = form.querySelector("input[type='text']").value
    console.log(player)
    const score = seconds;
    console.log(score)
    saveHighscore(score, player);
    highscorePage();
}
const saveHighscore = function (score, player) {
    score = seconds
    const pastHighscore = localStorage.getItem("js_highscore");
    if (!pastHighscore || score > pastHighscore) {
        localStorage.setItem("js_highscore", score);
        localStorage.setItem("player", player);
        alert("New highscore!")
    } else {
        alert("You did not beat the highscore. Try again.")
    }
}
const highscorePage = function() {
    clearElement("main");
    // create div
    const highscoreDivEl = document.createElement("div")
    highscoreDivEl.className = "highscore_div";
    mainEl.appendChild(highscoreDivEl);
    // create h2 title
    const titleEl = document.createElement("h2");
    titleEl.textContent = "High score:";
    highscoreDivEl.appendChild(titleEl);
    // create highscore
    const highscore = document.createElement("p");
    highscore.className = "highscore_display";
    // retrieve and display local storage highscore
    const player = localStorage.getItem("player");
    const score = localStorage.getItem("js_highscore")
    highscore.textContent = "1. " + player + " - " + score;
    highscoreDivEl.appendChild(highscore);
    // make buttons "Go back" and "Clear high scores";
    const highscoreBtnDivEl = document.createElement("div")
    highscoreBtnDivEl.innerHTML = "<input type='button' class='highscorePageBtn' id='go_back' value='Go Back'><input type='button' class='highscorePageBtn' id='clear_highscore' value='Clear high scores'>"
    highscoreDivEl.appendChild(highscoreBtnDivEl);
    const goBack = document.querySelector("#go_back");
    const clearHighscore = document.querySelector("#clear_highscore");
    goBack.addEventListener("click", resetGame)
    clearHighscore.addEventListener("click", clearLocalStorage);
}
const clearLocalStorage = function() {
    localStorage.removeItem("player");
    localStorage.removeItem("js_highscore");
    const display = document.querySelector("p.highscore_display");
    display.textContent = "No high score";
}
const resetGame = function() {
    seconds = 75;
    clock;
    questionCount = 0;
    score = 0;
    clearElement("main")
    clearElement("body");
    homePage();
}

// Initial Function Call
homePage();


// HELPER FUNCTIONS
// insert after
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// erase the main section
function clearElement(element) {
    element = document.querySelector(element)
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
};
