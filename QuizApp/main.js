const start_quiz = document.querySelector(".start_quiz");
const start_btn = start_quiz.querySelector(".start_quiz .start--btn");
const quiz_rules = document.querySelector(".quiz_rules");
const quit_btn = quiz_rules.querySelector("#quit");
const continue_btn = document.getElementById("continue");
const quiz = document.querySelector(".quiz");
const next_btn = document.getElementById("next_btn");
const timer = document.querySelector(".timer");
const time_line = document.querySelector(".time_line");
const time_left = document.querySelector(".time_left");
const score_text = document.querySelector(".score_text");

start_btn.onclick = () => {
  start_quiz.classList.add("active");
  quiz_rules.classList.add("opened");
};

quit_btn.onclick = () => {
  start_quiz.classList.remove("active");
  quiz_rules.classList.remove("opened");
};

continue_btn.onclick = () => {
  quiz_rules.classList.add("closed");
  quiz.classList.add("show");
  showQuestions(0);
  queCounter(1);
  startTimer(20);
  clearInterval(counterLine);
  startTimerLine(widthValue);
};

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

const option_list = document.querySelector(".option_list");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz.classList.add("show");
  result_box.classList.remove("activeResult");
  que_count = 0;
  que_numb = 1;
  timeValue = 20;
  widthValue = 0;
  userScore = 0;
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  next_btn.style.display = "none";
};

quit_quiz.onclick = () => {
  window.location.reload();
};

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    time_left.textContent = "Time left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions Completed");
    showResultBox();
  }
};

function showQuestions(index) {
  const que_text = document.querySelector(".question");
  let que_tag = `<h3>${questions[index].numb}. ${questions[index].question}</h3>`;
  let opt_tag = ` <div class="options"><span>${questions[index].options[0]}</span></div>
    <div class="options"><span>${questions[index].options[1]}</span></div>
    <div class="options"><span>${questions[index].options[2]}</span></div>
    <div class="options"><span>${questions[index].options[3]}</span></div>`;
  que_text.innerHTML = que_tag;
  option_list.innerHTML = opt_tag;
  const option = document.querySelectorAll(".options");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = `<i class="tick fas fa-check-square"></i>`;
let crossIcon = ` <i class="cross fas fa-times-circle"></i> `;

function optionSelected(answer) {
  const userAnswer = answer.textContent;
  clearInterval(counter);
  clearInterval(counterLine);
  let correctAnswer = questions[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAnswer === correctAnswer) {
    userScore++;
    console.log(userScore);
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent === correctAnswer) {
        option_list.children[i].setAttribute("class", "options correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultBox() {
  quiz.classList.remove("show");
  quiz_rules.classList.remove("opened");
  result_box.classList.add("activeResult");
  let score_tag;
  if (userScore <= 3) {
    score_tag = `<span>and sorry <i class="sad far fa-frown-open"></i>, You got only <span> ${userScore} </span> out of <span> ${questions.length} </span></span>`;
  } else {
    score_tag = `<span>and Congratulations <i class="crown fas fa-crown"></i> !, You got <span> ${userScore} </span> out of <span> ${questions.length} </span></span>`;
  }
  score_text.innerHTML = score_tag;
}

function startTimer(time) {
  counter = setInterval(countTime, 980);
  function countTime() {
    timer.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timer.textContent;
      timer.textContent = `0${addZero}`;
    }
    if (time < 0) {
      clearInterval(counter);
      timer.textContent = "00";

      let correctAnswer = questions[que_count].answer;
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent === correctAnswer) {
          option_list.children[i].setAttribute("class", "options correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
      time_left.textContent = "Time off";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timerLine, 31.2);
  function timerLine() {
    time++;
    time_line.style.width = `${time}px`;
    if (time >= 600) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  const que_counter = quiz.querySelector(".total_que");
  let totalQuesTag = `<div><span>${index}</span> of <span>${questions.length} <span>Questions</span></div>`;
  que_counter.innerHTML = totalQuesTag;
}
