//import all the questions from the bank
import { JSQuestions } from '/bank/jsQuestions.js';
import { CSSQuestions } from '/bank/cssQuestions.js';
import { htmlQuestions } from '/bank/htmlQuestions.js';


// Function to get random items from an array
function getRandomItems(array, count) {
    // Shuffle the array
    let shuffled = array.sort(() => 0.5 - Math.random());
    // Get the first `count` elements
    return shuffled.slice(0, count);
  }
  
  
  // Number of items to select from each array
  let count1 = 15;  // 30% of 50
  let count2 = 15;  // 30% of 50
  let count3 = 20;  // 20% of 50
  
  // Get random items from each array
  let selected1 = getRandomItems(htmlQuestions, count1);
  let selected2 = getRandomItems(CSSQuestions, count2);
  let selected3 = getRandomItems(JSQuestions, count3);
//   let selected4 = getRandomItems(array4, count4);
  
  // Combine all selected items into one array
  let combinedArray = [...selected1, ...selected2, ...selected3];
  
  // Optionally, shuffle the combined array if needed
  combinedArray.sort(() => 0.5 - Math.random());

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const progressElement = document.getElementById('progress');
  const timeout = document.getElementById('timeout');
  const viewResult = document.getElementById('viewresult');
  let circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");


  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  //function to shuffle the options
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  //function to display the questions
  function displayQuestion() {
    timeout.style.display = 'none';
    const questionData = combinedArray[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
    
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);

      
      
    }    

    //change the next button to submit button when the last question is reached
    if(currentQuestion + 1 == combinedArray.length){
        submitButton.innerHTML = 'Submit';
      }
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);


    //show the progress bar
    let progressStartValue = calculatePercentage(currentQuestion + 1, combinedArray.length);
    circularProgress.style.background = `conic-gradient(#fa2854 ${progressStartValue * 3.6}deg, #ededed 0deg)`
    progressValue.textContent = `${currentQuestion + 1}/${combinedArray.length}`;

    startCountdown();
    
  }
  
  //check if the selected option is correct and push incorrect answers to an array
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === combinedArray[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: combinedArray[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: combinedArray[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < combinedArray.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  // display the result of the quiz and disable irrelevant buttons
  function displayResult() {
    quizContainer.style.display = 'none';
    progressElement.style.display = 'none';
    submitButton.style.display = 'none';
    timeout.style.display = 'none';
    circularProgress.style.display = 'none';
    document.getElementById('timer').style.display = 'none';

    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${combinedArray.length}!`;
  }
  
  //reset the quiz
  function retryQuiz() {
        window.location.href = '/index.html';
  }
  
  //show corrections for incorrect selections after completion of the quiz
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${combinedArray.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }

  let timeRemaining = 3600; // 1 hour in seconds
  let interval;

  function startCountdown() {
    clearInterval(interval);
      interval = setInterval(function() {
          let minutes = Math.floor(timeRemaining / 60);
          let seconds = timeRemaining % 60;

          // Format time as mm:ss
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          // Display the countdown
          document.getElementById('timer').textContent = "time left: " + minutes + ":" + seconds;

          // Decrease time remaining
          if (--timeRemaining < 0) {
              clearInterval(interval); // Stop the countdown when time is up
              timeout.style.display = 'block';
              quizContainer.style.display = 'none';
                progressElement.style.display = 'none';
                submitButton.style.display = 'none';
                document.getElementById('timer').style.display = 'none';
                circularProgress.style.display = 'none';
                retryButton.style.display = 'none';
                showAnswerButton.style.display = 'none';
            //   displayResult();
          }
      }, 1000);
  }


  function calculatePercentage(currentQuestion, totalQuestions){
    return (currentQuestion / totalQuestions) * 100;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  viewResult.addEventListener('click', displayResult);
  
  displayQuestion();

  //register the service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
    }