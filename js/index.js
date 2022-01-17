"use strict";
// Settings
let seconds = 750;
let clock;
let questionCount = 0;
let score = 0;
let player = "";
// Sounds
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const gameOver = document.getElementById("game_over");
const highscoreNoise = document.getElementById("highscoreNoise");
// Global Elements
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
    {
        question: "What is the syntax for a for loop?",
        answers:
            ["<p data-answer='true' class='correct'>for (let i = 0; i < 4; i++){code here}</p>",
                "<p>for (let i = 0; i < 4; i+){code here}</p>",
                "<p>for (let i < 0; i = 4; i++){code here}</p>",
                "<p>for (let i = 0 i < 4 i++){code here}</p>"]
    },
    {
        question: "Functions that belong to an object are called ____________.",
        answers:
            ["<p data-answer='true' class='correct'>Methods</p>",
                "<p>function objects</p>",
                "<p>funky objects</p>",
                "<p>properties</p>"]
    },
    {
        question: "What is one good use for 'console.log'?",
        answers:
            ["<p data-answer='true' class='correct'>check for variables with debugging</p>",
                "<p>give user feedback</p>",
                "<p>change error codes</p>",
                "<p>checking for error codes</p>"]
    },
    {
        question: "We declare ___________ in order to create ____________",
        answers:
            ["<p data-answer='true' class='correct'>HTML tags / DOM elements</p>",
                "<p>for-loops / HTML tags </p>",
                "<p>arrays / DOM elements</p>",
                "<p>DOM elements / HTML tags</p>"]
    },
    {
        question: "What is one precaution you must take when using a while or for-loop?",
        answers:
            ["<p data-answer='true' class='correct'>Make sure there's a valid stopping condition</p>",
                "<p>forgetting to make key-value pairs</p>",
                "<p>not putting quotation marks</p>",
                "<p>remembering that for loops are for objects and while loops are for arrays</p>"]
    },
    {
        question: "What is the difference between 'const' and 'let' declarations?",
        answers:
            ["<p data-answer='true' class='correct'>let declarations can be changed</p>",
                "<p>const declarations cannot be changed</p>",
                "<p>there is no difference</p>",
                "<p>const declarations can only be made outside functions</p>"]
    }
]
const shuffledProblems = shuffle(problems);
const highscores = JSON.parse(localStorage.getItem("js_highscore")) || [];

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
    headerLinkEl.addEventListener("click", showHighScores);
}

const showHighScores = function () {
    clearInterval(clock);
    clearElement("main");
    // create div
    const highscoreDivEl = document.createElement("div")
    highscoreDivEl.className = "highscore_div";
    mainEl.appendChild(highscoreDivEl);
    // create h2 title
    const titleEl = document.createElement("h2");
    titleEl.textContent = "High scores:";
    highscoreDivEl.appendChild(titleEl);
    // Sort array of high scores from highest to lowest
    highscores.sort((a, b) => b.points - a.points)
    // Create array with top 5 socres. 
    highscores.splice(5);
    for (let i = 0; i < highscores.length; i++) {
        // create highscore
        const highscore = document.createElement("p");
        highscore.className = "highscore_display";
        highscore.textContent = (i + 1) + ". " + highscores[i].name + " - " + highscores[i].points;
        highscoreDivEl.appendChild(highscore);
    }
    // make buttons "Go back" and "Clear high scores";
    const highscoreBtnDivEl = document.createElement("div")
    highscoreBtnDivEl.innerHTML = "<input type='button' class='highscorePageBtn' id='go_back' value='Go Back'><input type='button' class='highscorePageBtn' id='clear_highscore' value='Clear high scores'>"
    highscoreDivEl.appendChild(highscoreBtnDivEl);
    const goBack = document.querySelector("#go_back");
    const clearHighscore = document.querySelector("#clear_highscore");
    // add functionality to buttons
    goBack.addEventListener("click", resetGame)
    clearHighscore.addEventListener("click", clearLocalStorage);
}

// Start game event handler
const startGame = function () {
    //shuffle array
    clearElement("main");
    displayProblem();
    // initial timer
    clock = setInterval(countdown, 100);
    // give buttons event handlers
    answerBtnFunctionality();
}
// cycle through the problems
const displayProblem = function () {
    // Check to see if you went through all the problems
    if (questionCount === problems.length) {
        endGamePage();
    } else {
        // Display next question
        // create question div
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
        clearElement("main");
        displayProblem();
        answerBtnFunctionality();
        showCorrect();
        correct.play();
    } else {
        seconds -= 100;
        clearElement("main");
        displayProblem();
        answerBtnFunctionality();
        showWrong();
        incorrect.play();
    }
}
// Remove footer when hover over button
const removeFooter = function () {
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
// add message of "wrong" / "right" in footer
// Right: 
const showCorrect = function () {
    const questionDivEl = document.querySelector(".question_div");
    const footer = document.createElement("footer");
    footer.textContent = "Correct!"
    if (questionDivEl) {
        questionDivEl.appendChild(footer);
    }
}
// Wrong:
const showWrong = function () {
    const questionDivEl = document.querySelector(".question_div");
    const footer = document.createElement("footer");
    footer.textContent = "Wrong!"
    if (questionDivEl) {
        questionDivEl.appendChild(footer);
    }
}
// Stop game and show End game page
const endGamePage = function () {
    // show seconds at zero and clear interval and main element
    gameOver.play();
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
    formEl.innerHTML = "<label for='highscore'><p>Enter Initials: </p></label> <input type='text' name='highscore' id='highscore'><input type='submit' value='submit' id='submit'>";
    mainEl.appendChild(formEl);
    // add functionality to submit button
    const submit = document.getElementById("submit");
    submit.className = "btn"
    submit.addEventListener("click", onSubmit);
}

// Submit Event hander
const onSubmit = function (event) {
    event.preventDefault();
    const form = document.querySelector("form");
    score = seconds;
    let player = form.querySelector("input[type='text']").value;
    if (!player) {
        alert("Please enter your initials");
        onSubmit();
    }
    // save user info in an object
    const userScore = {
        points: score,
        name: player
    }
    // add user info into local storage array
    highscores.push(userScore);
    localStorage.setItem("js_highscore", JSON.stringify(highscores));
    highscorePage(userScore);
}

// Display high score page and retrieve high score from local storage
const highscorePage = function (userScore) {
    clearElement("main");
    // create div
    const highscoreDivEl = document.createElement("div")
    highscoreDivEl.className = "highscore_div";
    mainEl.appendChild(highscoreDivEl);
    // create h2 title
    const titleEl = document.createElement("h2");
    titleEl.textContent = "High scores:";
    highscoreDivEl.appendChild(titleEl);
    // Sort array of high scores from highest to lowest
    highscores.sort((a, b) => b.points - a.points)
    // Create array with top 5 socres. 
    highscores.splice(5);
    for (let i = 0; i < highscores.length; i++) {
        // create highscore
        const highscore = document.createElement("p");
        highscore.className = "highscore_display";
        highscore.textContent = (i + 1) + ". " + highscores[i].name + " - " + highscores[i].points;
        highscoreDivEl.appendChild(highscore);
    }
    // make buttons "Go back" and "Clear high scores";
    const highscoreBtnDivEl = document.createElement("div")
    highscoreBtnDivEl.innerHTML = "<input type='button' class='highscorePageBtn' id='go_back' value='Go Back'><input type='button' class='highscorePageBtn' id='clear_highscore' value='Clear high scores'>"
    highscoreDivEl.appendChild(highscoreBtnDivEl);
    const goBack = document.querySelector("#go_back");
    const clearHighscore = document.querySelector("#clear_highscore");
    // add functionality to buttons
    goBack.addEventListener("click", resetGame)
    clearHighscore.addEventListener("click", clearLocalStorage);
    if (userScore.points === highscores[0].points) {
        highscoreNoise.play();
        const highscoreMessage = document.createElement("h3")
        highscoreMessage.textContent = "NEW HIGH SCORE!!!"
        mainEl.appendChild(highscoreMessage);
    }
}
// Event Handler to Clear Local Storage
const clearLocalStorage = function () {
    localStorage.removeItem("js_highscore");
    const display = document.querySelectorAll("p.highscore_display");
    display[0].textContent = "No High scores";
    for (let i = 1; i < display.length; i++) {
        display[i].remove();
    }
}
// Event Handler for Go Back. Resets global variables
const resetGame = function () {
    seconds = 750;
    clock;
    questionCount = 0;
    score = 0;
    clearElement("main")
    clearElement("body");
    homePage();
    location.reload();
}
// Initial Function Call
homePage();
////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////
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
/////////////// Sounds //////////////
//correct sound function
function correctNoise() {
    if (correct.play()) {
        correct.pause();
        correct.currentTime = 0;
    }
    correct.play();
}
//incorrect sound function
function incorrectNoise() {
    if (incorrect.play()) {
        incorrect.pause();
        incorrect.currentTime = 0;
    }
    incorrect.play();
}