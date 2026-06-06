const birthdayMonth = 5;
const birthdayDay = 14;
const countdownIds = ["days", "hours", "minutes", "seconds"];
const heartsContainer = document.querySelector(".hearts");

const dayPages = {
  "1": "day1.html",
  "2": "day2.html",
  "3": "day3.html",
  "4": "day4.html",
  "5": "day5.html",
  "6": "day6.html",
  "7": "day7.html",
  "8": "birthday.html"
};

function getBirthdayTarget() {
  const now = new Date();
  const target = new Date(now.getFullYear(), birthdayMonth, birthdayDay, 0, 0, 0);
  if (now > new Date(now.getFullYear(), birthdayMonth, birthdayDay, 23, 59, 59)) {
    target.setFullYear(target.getFullYear() + 1);
  }
  return target;
}

function updateCountdown() {
  const now = new Date();
  const target = getBirthdayTarget();
  const remaining = Math.max(target - now, 0);
  const values = [
    Math.floor(remaining / (1000 * 60 * 60 * 24)),
    Math.floor((remaining / (1000 * 60 * 60)) % 24),
    Math.floor((remaining / (1000 * 60)) % 60),
    Math.floor((remaining / 1000) % 60)
  ];

  countdownIds.forEach((id, index) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(values[index]).padStart(2, "0");
  });
}

function isCardUnlocked(card) {
  const now = new Date();
  const targetYear = getBirthdayTarget().getFullYear();
  const [month, day] = card.dataset.unlock.split("-").map(Number);
  const unlockDate = new Date(targetYear, month - 1, day, 0, 0, 0);
  return now >= unlockDate;
}

function updateCards() {
  document.querySelectorAll(".love-card").forEach((card) => {
    const isUnlocked = isCardUnlocked(card);
    card.classList.toggle("locked", !isUnlocked);
    card.classList.toggle("unlocked", isUnlocked);
    const lock = card.querySelector(".lock");
    if (lock) lock.textContent = isUnlocked ? "Open" : "Lock";
  });
}

function setupCardClicks() {
  document.querySelectorAll(".love-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isUnlocked = isCardUnlocked(card);
      const page = dayPages[card.dataset.day];
      if (isUnlocked && page) {
        window.location.href = page;
      } else {
        alert("This page opens on its day, Golu Babu ❤️");
      }
    });
  });
}

function createHeart() {
  if (!heartsContainer) return;
  const heart = document.createElement("span");
  const size = Math.random() * 16 + 12;
  heart.className = "heart";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
  heart.style.background = `rgba(184, 74, 98, ${Math.random() * 0.28 + 0.22})`;

  heartsContainer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 11000);
}

updateCountdown();
updateCards();
setupCardClicks();
setInterval(updateCountdown, 1000);
setInterval(updateCards, 60 * 1000);
setInterval(createHeart, 700);
