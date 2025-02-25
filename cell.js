const grid = document.getElementById("gameGrid");
let currentTeam = "";
const team1Btn = document.getElementById("team1Btn");
const team2Btn = document.getElementById("team2Btn");
let team1Score = 0;
let team2Score = 0;
const team1ScoreDisplay = document.getElementById("team1-score");
const team2ScoreDisplay = document.getElementById("team2-score");

// استرجاع أسماء الفرق من localStorage
document.addEventListener("DOMContentLoaded", function () {
  const team1Name = localStorage.getItem("team1Name") || "Team 1";
  const team2Name = localStorage.getItem("team2Name") || "Team 2";

  document.getElementById("team1-name").textContent = team1Name;
  document.getElementById("team2-name").textContent = team2Name;
  document.getElementById("team1Btn").textContent = team1Name;
  document.getElementById("team2Btn").textContent = team2Name;
});

function createGrid() {
  for (let i = 1; i <= 25; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = i;
    cell.dataset.index = i - 1;
    cell.onclick = () => markCell(cell);
    grid.appendChild(cell);
  }
}

// تعديل دالة تحديد الفريق لتستخدم onclick
team1Btn.onclick = () => setTeam("team1");
team2Btn.onclick = () => setTeam("team2");

function setTeam(team) {
  currentTeam = team;
  team1Btn.classList.remove("active-team");
  team2Btn.classList.remove("active-team");

  if (team === "team1") {
    team1Btn.classList.add("active-team");
  } else if (team === "team2") {
    team2Btn.classList.add("active-team");
  }
}

function markCell(cell) {
  if (
    !cell.classList.contains("team1") &&
    !cell.classList.contains("team2") &&
    currentTeam
  ) {
    cell.classList.add(currentTeam);
    checkLines(parseInt(cell.dataset.index));
  }
}

function checkLines(cellIndex) {
  const row = Math.floor(cellIndex / 5);
  const col = cellIndex % 5;

  let scoreAdded = false;

  // التحقق من الصف
  if (checkRow(row)) {
    updateScore(currentTeam);
    scoreAdded = true;
  }

  // التحقق من العمود
  if (checkColumn(col)) {
    updateScore(currentTeam);
    scoreAdded = true;
  }
}

function checkRow(row) {
  const cells = document.querySelectorAll(".cell");
  let count = 0;
  for (let col = 0; col < 5; col++) {
    const cell = cells[row * 5 + col];
    if (cell.classList.contains(currentTeam)) {
      count++;
    }
  }
  return count === 5;
}

function checkColumn(col) {
  const cells = document.querySelectorAll(".cell");
  let count = 0;
  for (let row = 0; row < 5; row++) {
    const cell = cells[row * 5 + col];
    if (cell.classList.contains(currentTeam)) {
      count++;
    }
  }
  return count === 5;
}

function updateScore(team) {
  if (team === "team1") {
    team1Score++;
    team1ScoreDisplay.textContent = team1Score + " Points";
  } else if (team === "team2") {
    team2Score++;
    team2ScoreDisplay.textContent = team2Score + " Points";
  }
}

createGrid();

function checkFinalScore() {
  // تخزين النقاط في localStorage
  localStorage.setItem("cellTeam1Points", team1Score);
  localStorage.setItem("cellTeam2Points", team2Score);

  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");

  // Get current total scores
  let totalTeam1Score = parseInt(localStorage.getItem("totalTeam1Score")) || 0;
  let totalTeam2Score = parseInt(localStorage.getItem("totalTeam2Score")) || 0;

  // Add point to winner
  if (team1Score > team2Score) {
    totalTeam1Score += 1;
    localStorage.setItem("totalTeam1Score", totalTeam1Score);

    Swal.fire({
      title: `${team1Name} Wins!`,
      text: `النتيجة النهائية: ${team1Score} - ${team2Score}`,
      icon: "success",
      confirmButtonText: "العودة للقائمة الرئيسية",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(() => {
      window.location.href = "Master-game/Competition.html";
    });
  } else if (team2Score > team1Score) {
    totalTeam2Score += 1;
    localStorage.setItem("totalTeam2Score", totalTeam2Score);

    Swal.fire({
      title: `${team2Name} Wins!`,
      text: `النتيجة النهائية: ${team1Score} - ${team2Score}`,
      icon: "success",
      confirmButtonText: "العودة للقائمة الرئيسية",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(() => {
      window.location.href = "Master-game/Competition.html";
    });
  } else {
    Swal.fire({
      title: "تعادل!",
      text: `النتيجة النهائية: ${team1Score} - ${team2Score}`,
      icon: "info",
      confirmButtonText: "العودة للقائمة الرئيسية",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(() => {
      window.location.href = "Master-game/Competition.html";
    });
  }
}

// إضافة event listener لزر Finish
document
  .getElementById("finish-game")
  .addEventListener("click", checkFinalScore);
