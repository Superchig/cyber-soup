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

  return false; // required to not refresh the page; just leave this here
}; //this ends the submit function
