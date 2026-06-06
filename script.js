const birthdayMonth = 5;
const birthdayDay = 14;
const countdownIds = ["days", "hours", "minutes", "seconds"];
const heartsContainer = document.querySelector(".hearts");

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
    document.getElementById(id).textContent = String(values[index]).padStart(2, "0");
  });
}

function updateCards() {
  const now = new Date();
  const targetYear = getBirthdayTarget().getFullYear();

  document.querySelectorAll(".love-card").forEach((card) => {
    const [month, day] = card.dataset.unlock.split("-").map(Number);
    const unlockDate = new Date(targetYear, month - 1, day, 0, 0, 0);
    const isUnlocked = now >= unlockDate;

    card.classList.toggle("locked", !isUnlocked);
    card.classList.toggle("unlocked", isUnlocked);
    card.querySelector(".lock").textContent = isUnlocked ? "Open" : "Lock";
  });
}

function createHeart() {
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
setInterval(updateCountdown, 1000);
setInterval(createHeart, 700);
