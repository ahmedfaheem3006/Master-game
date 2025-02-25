const questions = [
    { text: "Which team has won the most English Premier League titles?", image: "" },
    { text: "Who is the all-time top scorer in the Spanish La Liga?", image: "" },
    { text: "Which Italian club is known as 'The Old Lady'?", image: "" },
    { text: "What is the name of the French football league's top division?", image: "" },
    { text: "Which German club has won the most Bundesliga titles?", image: "" },
    { text: "Who won the UEFA Champions League in 2020?", image: "" },
    { text: "Which player has the most Ballon d'Or awards?", image: "" },
    { text: "Which club is known as 'The Red Devils'?", image: "" },
    { text: "Who is the current manager of Manchester City?", image: "" },
    { text: "Which country won the FIFA World Cup in 2018?", image: "" },
    { text: "What is the name of the stadium where Barcelona plays?", image: "" },
    { text: "Which club is known for the 'Galácticos' era?", image: "" },
    { text: "Who is the all-time top scorer for the German national team?", image: "" },
    { text: "Which club did Zlatan Ibrahimović join in 2020?", image: "" },
    { text: "What is the nickname of the Italian national football team?", image: "" },
    { text: "Which player is known as 'The Pharaoh'?", image: "" },
    { text: "What is the capacity of Wembley Stadium?", image: "" },
    { text: "Which club did Cristiano Ronaldo join in 2021?", image: "" },
    { text: "Who is the captain of the Argentine national team?", image: "" },
    { text: "Which club is known as 'The Blues'?", image: "" }
];

let timeLeft = 30;
let timer;
let timerRunning = false;
let questionAnswered = false; // ⬅️ متغير جديد لمنع تكرار السكور

const timerElem = document.getElementById("clock");

// إضافة هذا الكود في بداية الملف
document.addEventListener('DOMContentLoaded', function() {
    // استرجاع أسماء الفرق من localStorage
    const team1Name = localStorage.getItem('team1Name');
    const team2Name = localStorage.getItem('team2Name');
    
    // تحديث عناصر العرض
    if (team1Name) {
        document.getElementById('team1-name').textContent = team1Name;
        document.getElementById('team1').textContent = team1Name;
    }
    
    if (team2Name) {
        document.getElementById('team2-name').textContent = team2Name;
        document.getElementById('team2').textContent = team2Name;
    }
});

function startTimer() {
    if (!timerRunning) {
        timeLeft = 30;
        timerElem.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElem.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timerRunning = false;
                questionAnswered = true; // منع الإجابة بعد انتهاء الوقت
                
                // 🕒 Alert انتهاء الوقت
                Swal.fire({
                    title: "انتهى الوقت!",
                    text: "لم يتم اختيار إجابة في الوقت المحدد ⏳",
                    icon: "warning",
                    confirmButtonColor: "#f39c12",
                    confirmButtonText: "التالي",
                    timer: 3000,
                    showClass: {
                        popup: 'animate_animated animate_shakeX'
                    },
                    hideClass: {
                        popup: 'animate_animated animate_fadeOut'
                    }
                });

                removeActiveTeam(); // إزالة لون الفريق المختار
            }
        }, 1000);
        timerRunning = true;
    }
}


function stopTimer() {
    clearInterval(timer);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    timerElem.textContent = "30";
}

let currentQuestion = 0;
function isArabicText(text) {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
}

function displayQuestion() {
    const questionElem = document.getElementById('question');
    const questionImage = document.getElementById('question-image');
    
    const questionNumber = currentQuestion + 1;
    const questionText = questions[currentQuestion].text;
    
    // التحقق من لغة السؤال
    if (isArabicText(questionText)) {
        // إذا كان السؤال بالعربية
        questionElem.innerHTML = `<span class="question-number">${questionNumber}</span> ${questionText}`;
        questionElem.style.direction = 'rtl';
    } else {
        // إذا كان السؤال بالإنجليزية
        questionElem.innerHTML = `<span class="question-number">${questionNumber}</span> ${questionText}`;
        questionElem.style.direction = 'ltr';
    }
    
    if (questions[currentQuestion].image) {
        questionImage.src = questions[currentQuestion].image;
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }

    resetTimer();
    questionAnswered = false;
}

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

displayQuestion();

let score1 = 0;
let score2 = 0;
let currentTeam = 0;

document.getElementById('correct').addEventListener('click', () => {
    if (!questionAnswered) { // ⬅️ التحقق من عدم احتساب النقطة من قبل
        if (currentTeam === 1) {
            score1++;
            document.getElementById('score1').innerText = score1;
        } else if (currentTeam === 2) {
            score2++;
            document.getElementById('score2').innerText = score2;
        }
        questionAnswered = true; // ⬅️ منع احتساب نقطة أخرى لنفس السؤال

        Swal.fire({
            title: "إجابة صحيحة!",
            text: " تم احتساب النقطة ✅",
            icon: "success",
            confirmButtonColor: "#038369",
            confirmButtonText: "التالي",
            timer: 2000,
            showClass: {
                popup: 'animate_animated animate_fadeInDown'
            },
            hideClass: {
                popup: 'animate_animated animate_fadeOutUp'
            }
            });

    }
    stopTimer();
});

document.getElementById('wrong').addEventListener('click', () => {
    stopTimer();
    questionAnswered = true; // ⬅️ منع إعادة الإجابة على السؤال

    Swal.fire({
        title: "إجابة خاطئة!",
        text: " ",
        icon: "error",
        confirmButtonColor: "#c64f17",
        confirmButtonText: "التالي",
        timer: 2000,
        showClass: {
            popup: 'animate_animated animate_shakeX'
        },
        hideClass: {
            popup: 'animate_animated animate_fadeOut'
        }
    });

    removeActiveTeam();

});


document.getElementById('team1').addEventListener('click', () => {
    currentTeam = 1;
    startTimer();
    highlightActiveTeam("team1");
});

document.getElementById('team2').addEventListener('click', () => {
    currentTeam = 2;
    startTimer();
    highlightActiveTeam("team2");
});

// دالة تغيير لون الزرار للفريق النشط
function highlightActiveTeam(teamId) {
    document.getElementById('team1').classList.remove("active-team");
    document.getElementById('team2').classList.remove("active-team");
    document.getElementById(teamId).classList.add("active-team");
}

// عند اختيار إجابة، يتم إزالة التمييز من الفريق
document.getElementById('correct').addEventListener('click', () => {
    if (!questionAnswered) {
        if (currentTeam === 1) {
            score1++;
            document.getElementById('score1').innerText = score1;
        } else if (currentTeam === 2) {
            score2++;
            document.getElementById('score2').innerText = score2;
        }
        questionAnswered = true;
    }
    stopTimer();
    removeActiveTeam();
});

document.getElementById('wrong').addEventListener('click', () => {
    stopTimer();
    questionAnswered = true;
    removeActiveTeam();
});

// دالة لإزالة التحديد بعد الإجابة
function removeActiveTeam() {
    document.getElementById('team1').classList.remove("active-team");
    document.getElementById('team2').classList.remove("active-team");
}

function checkFinalScore() {
    // تخزين النقاط في localStorage
    localStorage.setItem("mcqTeam1Points", score1);
    localStorage.setItem("mcqTeam2Points", score2);

    const team1Name = localStorage.getItem('team1Name');
    const team2Name = localStorage.getItem('team2Name');
    
    if (score1 > score2) {
        Swal.fire({
            title: `${team1Name} Wins!`,
            text: "تم إضافة نقطة للفريق الفائز",
            icon: "success",
            confirmButtonText: "العودة للقائمة الرئيسية",
        }).then(() => {
            window.location.href = 'Competition.html';
        });
    } else if (score2 > score1) {
        Swal.fire({
            title: `${team2Name} Wins!`,
            text: "تم إضافة نقطة للفريق الفائز",
            icon: "success",
            confirmButtonText: "العودة للقائمة الرئيسية",
        }).then(() => {
            window.location.href = 'Competition.html';
        });
    } else {
        Swal.fire({
            title: "تعادل!",
            text: "لم يتم احتساب نقاط",
            icon: "info",
            confirmButtonText: "العودة للقائمة الرئيسية",
        }).then(() => {
            window.location.href = 'Competition.html';
        });
    }
}

document.getElementById('finish-game').addEventListener('click', checkFinalScore);