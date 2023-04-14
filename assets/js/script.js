// Questions Array
var questions = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyperloop Text Master Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Cascading Syntax Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What does JavaScript do?",
      choices: ["Adds interactivity to websites", "Creates website layouts", "Defines website styles", "None of the above"],
      answer: "Adds interactivity to websites"
    },
    {
      question: "What is the purpose of a for loop?",
      choices: ["To repeat a set of instructions a specified number of times", "To create a new function", "To select elements on a web page", "To style elements on a web page"],
      answer: "To repeat a set of instructions a specified number of times"
    },
    {
      question: "What does the keyword 'const' do?",
      choices: ["Defines a variable that can be reassigned", "Defines a variable that cannot be reassigned", "Defines a function", "None of the above"],
      answer: "Defines a variable that cannot be reassigned"
    }
  ];
  
  // Correct Answers Array
  var correctAnswers = [
    "Hyper Text Markup Language",
    "Cascading Style Sheets",
    "Adds interactivity to websites",
    "To repeat a set of instructions a specified number of times",
    "Defines a variable that cannot be reassigned"
  ];
  
  // Variables
  var startBtn = document.querySelector("#start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
  }
  
  var questionCard = document.querySelector(".question-card");
  var questionEl = document.getElementById("question");
  var choiceBtns = document.querySelectorAll(".choice-btn");
  var gameOverCard = document.querySelector(".game-over-card");
  var initialsInput = document.querySelector("input[type='text']");
  var form = document.querySelector("form");
  var timeEl = document.getElementById("time");
  var quizCard = document.querySelector(".quiz-card");

  var currentQuestionIndex;
  var timeLeft;
  var timerInterval;
  var score=0
  
  // Event Listeners
  startBtn.addEventListener("click", startQuiz);
  form.addEventListener("submit", saveScore);
  
  // Functions
  function startQuiz() {
    // Hide Quiz Card and Show Question Card
    quizCard.style.display = "none";
    questionCard.style.display = "block";
  
    // Set Variables to Initial Values
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
  
    // Display First Question
    showQuestion();
  
    // Start Timer
    timerInterval = setInterval(updateTimer, 1000);
    timeEl.textContent = timeLeft
  }
  
  function updateTimer() {
    timeLeft--
    timeEl.textContent = timeLeft
    if (timeLeft <= 0){
      clearInterval(timerInterval)
    }
  }
  

  function showQuestion() {
    // Display Question and Answer Choices
    questionEl.textContent = questions[currentQuestionIndex].question;
    for (var i = 0; i < choiceBtns.length; i++) {
      choiceBtns[i].textContent = questions[currentQuestionIndex].choices[i];
      choiceBtns[i].addEventListener("click", checkAnswer);
    }
  }
  
  function checkAnswer(event) {
    // Check if Answer is Correct
    var selectedBtn = event.target;
    var selectedAnswer = selectedBtn.textContent;
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      score++;
    } else {
      timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion()
    }
  }
  
  function saveScore(event) {
    event.preventDefault()

    // Get User's Initials
    var initials = initialsInput.value.trim();
    
    // Validate Input
    if (initials === "") {
      alert("Please enter your initials.");
      return;
    }
    
    // Create Object for Score
    var scoreObj = {
      initials: initials,
      score: score
    };
    
    // Retrieve Scores from Local Storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
    // Add Score Object to Scores Array
    highScores.push(scoreObj);
    
    // Sort Scores Array by Score in Descending Order
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });
    
    // Keep Only Top 5 Scores
    highScores.splice(5);
    
    // Save Scores to Local Storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // Show Game Over Card
    questionCard.style.display = "none";
    gameOverCard.style.display = "block";
    
    // Display Scores
    var scoresList = document.getElementById("scores-list");
    scoresList.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
      var li = document.createElement("li");
      li.textContent = highScores[i].initials + " - " + highScores[i].score;
      scoresList.appendChild(li);
    }
  }
  