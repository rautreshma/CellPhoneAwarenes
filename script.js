// ---------- AGE-SPECIFIC CONTENT ----------
function showContent() {
  const age = document.getElementById('ageGroup').value;
  const content = document.getElementById('contentArea');

  const contentData = {
    kids: [
      "Phones are fun to learn and play, but too much can hurt your eyes. Use them for learning games!",
      "Limit screen time to 1-2 hours and take breaks to play outside."
    ],
    teens: [
      "Phones connect you to friends and knowledge — but avoid overuse, cyberbullying, or unsafe apps.",
      "Balance social media and study apps wisely."
    ],
    adults: [
      "Phones help manage work and family — but balance is key. Reduce screen time to stay focused and healthy.",
      "Use phone for productivity, learning, and connecting with family."
    ]
  };

  if (age && contentData[age]) {
    content.innerHTML = `<h3>${age.charAt(0).toUpperCase() + age.slice(1)}</h3>` +
      contentData[age].map(text => `<p>${text}</p>`).join('');
  } else {
    content.innerHTML = "";
  }
}

// ---------- QUIZ SECTION ----------
const quizData = [
  {question: "How long should kids use a phone daily?", options: ["1-2 hours", "4-5 hours", "As long as they want"], answer: "1-2 hours"},
  {question: "What is a healthy phone habit?", options: ["Using it before sleep", "Taking screen breaks", "Checking every 5 mins"], answer: "Taking screen breaks"},
  {question: "What can too much phone use cause?", options: ["Better eyesight", "Eye strain", "More energy"], answer: "Eye strain"},
  {question: "Should you share your password with friends?", options: ["Yes", "No", "Sometimes"], answer: "No"},
  {question: "What’s the best use of a phone?", options: ["Learning new things", "Playing all day", "Texting only"], answer: "Learning new things"}
];

let current = 0;
let score = 0;

const quizContainer = document.getElementById('quizContainer');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');

// Load a quiz question
function loadQuestion() {
  nextBtn.disabled = true;
  const q = quizData[current];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map(opt => `
      <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
    `).join('')}
  `;
  updateProgress();

  // Enable next button when an option is selected
  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(opt => opt.addEventListener('change', () => nextBtn.disabled = false));
}

// Handle next question
function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return;

  // Immediate feedback
  const labels = document.querySelectorAll('label');
  labels.forEach(label => {
    if(label.textContent.trim() === quizData[current].answer) {
      label.style.background = "#d4edda"; // Green for correct
      label.style.borderColor = "#28a745";
    } else if(label.querySelector('input').checked) {
      label.style.background = "#f8d7da"; // Red for wrong
      label.style.borderColor = "#dc3545";
    }
  });

  if(selected.value === quizData[current].answer) score++;

  // Move to next question after 1 second
  setTimeout(() => {
    current++;
    if(current < quizData.length) loadQuestion();
    else showScore();
  }, 1000);
}

// Update quiz progress bar
function updateProgress() {
  const percent = ((current)/quizData.length)*100;
  progress.style.width = `${percent}%`;
}

// Show final score
function showScore() {
  quizContainer.innerHTML = `<h3>🎉 Quiz Completed!</h3><p>Your Score: ${score}/${quizData.length}</p>`;
  nextBtn.style.display = "none";

  // Optional: Confetti effect if you include a library
  if(typeof confetti === "function") confetti();
}

// Initialize first question
loadQuestion();
