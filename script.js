// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== Learn Section: Show Content by Age Group =====
function showContent() {
  const contentArea = document.getElementById("contentArea");
  const ageGroup = document.getElementById("ageGroup").value;

  let content = "";
  if (ageGroup === "kids") {
    content = `
      <div class="card">📚 Learn with fun apps like puzzles & drawing games!</div>
      <div class="card">🚫 Avoid using phones during meals or study time.</div>`;
  } else if (ageGroup === "teens") {
    content = `
      <div class="card">💬 Use phones for learning and creative ideas.</div>
      <div class="card">🚫 Don’t overshare personal info online.</div>`;
  } else if (ageGroup === "adults") {
    content = `
      <div class="card">💼 Manage time and use phones for productivity.</div>
      <div class="card">🧘 Balance work, health, and digital life.</div>`;
  } else {
    content = "";
  }

  contentArea.innerHTML = content;
}

// ===== Quiz Section =====
const quizData = [
  {
    question: "How many times does an average person check their phone daily?",
    options: ["20", "50", "96", "150"],
    answer: "96",
  },
  {
    question: "What is one healthy phone habit?",
    options: [
      "Using the phone before sleeping",
      "Taking regular screen breaks",
      "Scrolling endlessly on social media",
      "Texting while walking",
    ],
    answer: "Taking regular screen breaks",
  },
  {
    question: "Which of the following is a phone misuse?",
    options: [
      "Using apps for learning",
      "Talking to friends",
      "Cyberbullying",
      "Listening to music",
    ],
    answer: "Cyberbullying",
  },
  {
    question: "Average screen time per day is around:",
    options: ["1 hour", "3-4 hours", "6 hours", "8 hours"],
    answer: "3-4 hours",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const container = document.getElementById("quizContainer");
  const questionData = quizData[currentQuestion];

  container.innerHTML = `
    <h3>${questionData.question}</h3>
    ${questionData.options
      .map(
        (opt, i) => `
      <label>
        <input type="radio" name="answer" value="${opt}">
        ${opt}
      </label><br>
    `
      )
      .join("")}
  `;
  document.getElementById("score").textContent = "";
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (selected.value === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quizContainer").innerHTML =
      `<h3>🎉 Quiz Completed!</h3>`;
    document.getElementById(
      "score"
    ).textContent = `Your Score: ${score}/${quizData.length}`;
    document.getElementById("nextBtn").style.display = "none";
  }
}

// Load first question on page load
window.onload = () => loadQuestion();
