// console.log(document.cookie);

function renderLastScore() {
  const lastScore = window.localStorage.getItem("lastScore");
  console.log(`lastScore: ${lastScore}`);
  if (lastScore) {
    document.getElementById(
      "last_grade"
    ).innerHTML = `Your last grade was: ${lastScore}`;
  }
}
renderLastScore();

function colorLabel(label) {
  const input = label.querySelector("input.quiz-circle");
  const score = parseInt(input.value);

  if (score === 1) {
    label.classList.add("quiz-option-correct");
  } else if (input.checked) {
    label.classList.add("quiz-option-incorrect");
  } else {
    label.classList.remove("quiz-option-correct", "quiz-option-incorrect");
  }
}

document.getElementById("form1").onsubmit = function () {
  const checkedCircles = Array.from(document.querySelectorAll("input.quiz-circle:checked"));
  // console.log(checkedCircles);

  const scoreAdder = (accumulator, current) => {
    const value = parseInt(current.value);
    if (value !== 0 && value !== 1) {
      throw new Error(`Quiz input ${current} has invalid value ${value}.`);
    }
    return accumulator + value;
  }
  const scoreTotal = checkedCircles.reduce(scoreAdder, 0);
  // console.log(scoreTotal);

  const rightAnswers = document.querySelectorAll('input.quiz-circle[value = "1"]').length;

  result = (scoreTotal * 100) / rightAnswers;

  document.getElementById("grade").innerHTML = result;

  // document.cookie = `lastScore=${result}`;
  window.localStorage.setItem("lastScore", result);
  renderLastScore();

  /// Highlight correct and false answers
  for (const label of document.querySelectorAll("label.quiz-option")) {
    colorLabel(label);
  }

  /// Show explanation elements
  for (const expl of document.querySelectorAll("#form1 p.explanation")) {
    expl.style.display = "inline-block";
  }

  return false; // required to not refresh the page; just leave this here
}; //this ends the submit function

/// Implement the password-choice functionality
for (const choiceQuiz of document.querySelectorAll(".password-choice")) {
  choiceQuiz.onsubmit = choiceQuizOnSubmit;
}

function choiceQuizOnSubmit() {
  if (this.querySelectorAll("label.quiz-option input:checked").length <= 0) {
    return false;
  }

  for (const option of this.querySelectorAll("label.quiz-option")) {
    colorLabel(option);
  }

  for (const expl of this.querySelectorAll(".explanation")) {
    expl.style.display = "inline-block";
  }

  return false;
}

// This function dynamically creates a password quiz form
function createPasswordQuiz(
  name,
  answerIndex,
  options,
  explanation
) {
  const quizzesParent = document.querySelector("#password-quizzes");

  const rootForm = document.createElement("form");
  quizzesParent.appendChild(rootForm);
  rootForm.classList.add("password-choice", "stack-options", "dynamic-quiz");
  rootForm.onsubmit = choiceQuizOnSubmit;

  const optionsDiv = document.createElement("div");
  rootForm.appendChild(optionsDiv);

  function createOption(text) {
    const option = document.createElement("label");
    optionsDiv.appendChild(option);
    option.classList.add("quiz-option");

    const input = document.createElement("input");
    option.appendChild(input);
    input.classList.add("quiz-circle");
    input.name = name;
    input.type = "radio";
    option.append(text);

    return input;
  }

  for (const [i, option] of options.entries()) {
    const elem = createOption(option);
    if (i === answerIndex) {
      elem.value = "1";
    }
  }

  const explElem = document.createElement("p");
  optionsDiv.appendChild(explElem);
  explElem.classList.add("explanation");
  explElem.textContent = explanation;

  const submitDiv = document.createElement("div");
  rootForm.appendChild(submitDiv);
  // submitDiv.classList.add("aligned-button");

  const submitButton = document.createElement("button");
  submitDiv.appendChild(submitButton);
  submitButton.type = "submit";
  submitButton.value = "Submit";
  submitButton.textContent = "Submit";
}