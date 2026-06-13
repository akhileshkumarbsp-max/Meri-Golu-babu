const birthdayMonth = 5;
const birthdayDay = 14;
const vaultYear = 2026;
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
  if (!card.dataset.unlock) return false;
  const now = new Date();
  const [month, day] = card.dataset.unlock.split("-").map(Number);
  const unlockDate = new Date(vaultYear, month - 1, day, 0, 0, 0);
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

function birthdaySubmit(page, quiz1, quiz2, quiz3, heartMessage) {
  if (typeof window.submitBirthday === "function") {
    window.submitBirthday(page, quiz1, quiz2, quiz3, heartMessage);
  }
}

function findBirthdaySection(text) {
  return Array.from(document.querySelectorAll(".section")).find((sec) => {
    const heading = sec.querySelector("h2,.big");
    return heading && heading.textContent.toLowerCase().includes(text.toLowerCase());
  });
}

function hideOriginalPhotoReel() {
  const photoReel = findBirthdaySection("Photo memory reel");
  if (photoReel) {
    photoReel.style.display = "none";
    photoReel.setAttribute("aria-hidden", "true");
  }
}

function setupBirthdayReel() {
  const shell = document.querySelector(".birthday-shell");
  if (!shell || document.body.dataset.birthdayReel === "done") return;
  document.body.dataset.birthdayReel = "done";

  const style = document.createElement("style");
  style.textContent = `
    .mini-reel-section{background:linear-gradient(135deg,rgba(255,247,239,.98),rgba(255,230,242,.94));text-align:center;}
    .mini-reel-wrap{display:grid;grid-template-columns:minmax(0,360px) minmax(0,1fr);gap:22px;align-items:center;margin-top:18px;}
    .phone-reel{position:relative;width:min(320px,100%);aspect-ratio:9/16;margin:0 auto;border-radius:38px;padding:12px;background:#21131b;box-shadow:0 28px 70px rgba(71,30,50,.26);overflow:hidden;border:8px solid #fff;}
    .phone-reel:before{content:"";position:absolute;top:10px;left:50%;width:74px;height:6px;border-radius:999px;background:rgba(255,255,255,.38);transform:translateX(-50%);z-index:5;}
    .reel-screen{position:relative;width:100%;height:100%;overflow:hidden;border-radius:26px;background:linear-gradient(160deg,#fff1dc,#ffdce8 45%,#fff7ef);}
    .reel-screen img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.10);filter:saturate(1.04);}
    .reel-screen.play img:nth-child(1){animation:reelPhoto 18s linear infinite 0s;}
    .reel-screen.play img:nth-child(2){animation:reelPhoto 18s linear infinite 3s;}
    .reel-screen.play img:nth-child(3){animation:reelPhoto 18s linear infinite 6s;}
    .reel-screen.play img:nth-child(4){animation:reelPhoto 18s linear infinite 9s;}
    .reel-screen.play img:nth-child(5){animation:reelPhoto 18s linear infinite 12s;}
    .reel-screen.play img:nth-child(6){animation:reelPhoto 18s linear infinite 15s;}
    @keyframes reelPhoto{0%{opacity:0;transform:scale(1.16) translateY(8px)}5%,15%{opacity:1;transform:scale(1.05) translateY(0)}22%,100%{opacity:0;transform:scale(1.12) translateY(-8px)}}
    .reel-overlay{position:absolute;inset:auto 14px 18px 14px;z-index:4;text-align:left;color:#fff;text-shadow:0 3px 14px rgba(0,0,0,.55);}
    .reel-overlay b{display:block;font-family:'Cormorant Garamond',serif;font-size:32px;line-height:1.05;margin-bottom:8px;}
    .reel-overlay span{display:block;font-weight:800;font-size:14px;line-height:1.5;}
    .reel-hearts{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden;}
    .reel-hearts i{position:absolute;font-style:normal;bottom:-28px;animation:reelHeart 4.2s ease-in-out infinite;opacity:.86;}
    .reel-hearts i:nth-child(1){left:14%;animation-delay:.2s}.reel-hearts i:nth-child(2){left:68%;animation-delay:1.1s}.reel-hearts i:nth-child(3){left:45%;animation-delay:2s}.reel-hearts i:nth-child(4){left:82%;animation-delay:2.7s}
    @keyframes reelHeart{to{transform:translateY(-390px) rotate(18deg) scale(1.7);opacity:0}}
    .reel-copy{text-align:left;}
    .reel-copy p{margin:10px 0;}
    .reel-btn{border:0;border-radius:999px;background:#7b2d45;color:#fff;padding:14px 20px;font:800 16px/1.2 Inter,sans-serif;cursor:pointer;box-shadow:0 16px 36px rgba(123,45,69,.20);margin-top:12px;}
    .reel-btn:active{transform:scale(.98)}
    .reel-note{display:none;margin-top:16px;padding:16px;border-radius:22px;background:rgba(255,255,255,.80);border:1px solid rgba(116,45,72,.16);font-weight:800;color:#742d48;line-height:1.6;}
    .reel-note.show{display:block;animation:popIn .35s ease;}
    @media(max-width:760px){.mini-reel-section{text-align:left}.mini-reel-wrap{grid-template-columns:1fr}.phone-reel{width:min(300px,88vw);}.reel-copy{text-align:left}.reel-btn{width:100%}.reel-overlay b{font-size:28px}}
  `;
  document.head.appendChild(style);

  const reelSection = document.createElement("section");
  reelSection.className = "section mini-reel-section";
  reelSection.innerHTML = `
    <h2>A small reel of us ❤️</h2>
    <p>Something like a tiny reel inside this birthday vault — photos, hearts, and one week of trying to make you feel special.</p>
    <div class="mini-reel-wrap">
      <div class="phone-reel" aria-label="A small reel of us">
        <div class="reel-screen" id="birthdayMiniReel">
          <img src="photos/day%201%20(1).jpeg" onerror="this.remove()" alt="reel memory">
          <img src="photos/day%201%20(2).jpeg" onerror="this.remove()" alt="reel memory">
          <img src="photos/day%201%20(3).jpeg" onerror="this.remove()" alt="reel memory">
          <img src="photos/day%201%20(4).jpeg" onerror="this.remove()" alt="reel memory">
          <img src="photos/day%201%20(5).jpeg" onerror="this.remove()" alt="reel memory">
          <img src="photos/day%201%20(6).jpeg" onerror="this.remove()" alt="reel memory">
          <div class="reel-hearts"><i>❤️</i><i>💗</i><i>✨</i><i>🫶</i></div>
          <div class="reel-overlay"><b>7 days.</b><span>So many pages. So many changes. So many little feelings. All for one Golu Babu.</span></div>
        </div>
      </div>
      <div class="reel-copy">
        <h3>Tap to open one small reel</h3>
        <p>This is not just a page. This is one week of trying to make you feel seen, cared for, and celebrated.</p>
        <p>Thoda photos. Thoda hearts. Thoda madness. Aur dher saara pyaar.</p>
        <button class="reel-btn" type="button">Tap to open one small reel ❤️</button>
        <div class="reel-note">Happy Birthday, meri Babbu Golu Babu ❤️<br>Dher saara pyaar. This tiny reel is also for you.</div>
      </div>
    </div>`;

  const photoReel = findBirthdaySection("Photo memory reel");
  if (photoReel) {
    photoReel.insertAdjacentElement("afterend", reelSection);
  } else {
    shell.insertBefore(reelSection, shell.children[1] || null);
  }

  const btn = reelSection.querySelector(".reel-btn");
  const screen = reelSection.querySelector("#birthdayMiniReel");
  const note = reelSection.querySelector(".reel-note");
  btn.addEventListener("click", () => {
    screen.classList.add("play");
    note.classList.add("show");
    birthdaySubmit("birthday-mini-reel", "Small reel opened", "Tap to open one small reel", "reel-click", "Happy Birthday meri Babbu Golu Babu | Dher saara pyaar");
  });

  hideOriginalPhotoReel();
}

function setupBirthdayExtras() {
  const shell = document.querySelector(".birthday-shell");
  if (!shell || document.body.dataset.birthdayExtras === "done") return;
  document.body.dataset.birthdayExtras = "done";

  const style = document.createElement("style");
  style.textContent = `
    .extra-birthday-section{background:linear-gradient(135deg,rgba(255,250,248,.97),rgba(255,238,247,.92));}
    .music-card{margin-top:16px;padding:18px;border-radius:24px;background:rgba(255,255,255,.82);border:1px solid rgba(116,45,72,.18);box-shadow:0 14px 34px rgba(116,45,72,.10);}
    .music-btn,.memory-open-card,.word-chip{border:1px solid rgba(111,45,70,.22);background:#fff;color:#6f2d46;border-radius:20px;padding:15px 16px;font:800 15px/1.35 Inter,sans-serif;cursor:pointer;box-shadow:0 10px 24px rgba(111,45,70,.08);transition:transform .16s ease, box-shadow .16s ease, background .16s ease;}
    .music-btn:hover,.memory-open-card:hover,.word-chip:hover{transform:translateY(-2px);box-shadow:0 16px 34px rgba(111,45,70,.12);}
    .music-reveal{display:none;margin-top:16px;padding:14px;border-radius:22px;background:#fff9f6;border:1px solid rgba(116,45,72,.18);}
    .music-reveal.show{display:block;animation:popIn .35s ease;}
    .music-reveal iframe{width:100%;aspect-ratio:16/9;border:0;border-radius:18px;box-shadow:0 14px 34px rgba(0,0,0,.12);}
    .word-grid,.memory-open-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px;}
    .word-chip{font-family:'Cormorant Garamond',serif;font-size:23px;text-align:left;color:#742d48;background:linear-gradient(135deg,#fffaf8,#fff0f5);}
    .memory-open-card{text-align:left;min-height:90px;background:linear-gradient(135deg,#fff,#fff7fb);}
    .memory-message{display:none;margin-top:14px;padding:18px;border-radius:20px;background:#fff9f6;border:1px solid rgba(116,45,72,.18);font-size:17px;line-height:1.75;color:#382d36;}
    .memory-message.show{display:block;animation:popIn .35s ease;}
    @media(max-width:720px){.word-grid,.memory-open-grid{grid-template-columns:1fr}.music-card{padding:14px}.music-btn,.memory-open-card,.word-chip{width:100%;text-align:left}.word-chip{font-size:21px}.music-reveal iframe{min-height:205px}}
  `;
  document.head.appendChild(style);

  function makeMusicSection(title, intro, btnText, videoId, startSeconds, tag) {
    const section = document.createElement("section");
    section.className = "section extra-birthday-section music-section";
    section.innerHTML = `
      <h2>${title}</h2>
      <p>${intro}</p>
      <div class="music-card">
        <button class="music-btn" type="button">${btnText}</button>
        <div class="music-reveal">
          <p><b>Now read slowly.</b> This song feeling is here because the emotion is close — soft, warm, honest, and a little bit us.</p>
          <iframe allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Birthday music"></iframe>
        </div>
      </div>`;
    const btn = section.querySelector(".music-btn");
    const reveal = section.querySelector(".music-reveal");
    const iframe = section.querySelector("iframe");
    btn.addEventListener("click", () => {
      reveal.classList.add("show");
      iframe.src = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&autoplay=1&rel=0`;
      birthdaySubmit("birthday-music", tag, "Music clicked", `start-${startSeconds}`, btnText);
    });
    return section;
  }

  const birthdayLetter = document.querySelector(".letter");
  if (birthdayLetter) {
    const englishMusic = makeMusicSection(
      "A soft song for your birthday page 🎵",
      "Tap this before you read your birthday page. Not the whole song, just the feeling from the moment you chose.",
      "Play this feeling, then read your birthday page ✨",
      "U2SVCCENLjE",
      12,
      "English feeling for her birthday page"
    );
    shell.insertBefore(englishMusic, birthdayLetter);
  }

  const loveSection = findBirthdaySection("A little truth from my heart");
  if (loveSection) {
    const hindiMusic = makeMusicSection(
      "Read this part with one song feeling 🎵",
      "Before you read what I really want to say, tap this only if you want this page to feel a little softer.",
      "Play this feeling, then read my heart ❤️",
      "gJLVTKhTnog",
      143,
      "Husn feeling for my heart section"
    );
    shell.insertBefore(hindiMusic, loveSection);
  }

  const beforeLetter = findBirthdaySection("Before the birthday letter");
  if (beforeLetter) {
    const wordsSection = document.createElement("section");
    wordsSection.className = "section extra-birthday-section";
    wordsSection.innerHTML = `
      <h2>Your words I will never forget</h2>
      <p>These lines stayed with me, because they told me this vault was not just being opened — it was reaching you.</p>
      <div class="word-grid">
        <button class="word-chip" type="button">“You make me feel heard, seen a lot.”</button>
        <button class="word-chip" type="button">“Maa ke ilawa sabse zyada appreciate tune kiya.”</button>
        <button class="word-chip" type="button">“U have understood everything right.”</button>
        <button class="word-chip" type="button">“Acha nahi hota to 3 baar kyun padhti.”</button>
        <button class="word-chip" type="button">“Dhakkan.”</button>
      </div>
      <p><span class="soft-line">If these pages made you feel even a little of this, then this vault did what it was made for.</span></p>`;
    wordsSection.querySelectorAll(".word-chip").forEach((btn) => {
      btn.addEventListener("click", () => birthdaySubmit("birthday-her-words", btn.textContent, "Her words opened", "quote-click", "Your words I will never forget"));
    });
    beforeLetter.insertAdjacentElement("afterend", wordsSection);
  }

  const finalSection = document.querySelector(".final");
  if (finalSection) {
    const openWhen = document.createElement("section");
    openWhen.className = "section extra-birthday-section";
    openWhen.innerHTML = `
      <h2>Open when you need this later</h2>
      <p>This page is not only for today. Come back to these small cards whenever your heart needs a little softness.</p>
      <div class="memory-open-grid">
        <button class="memory-open-card" data-msg="Come back here and remember — someone has seen how much you do, how much you carry, and how much you still care. You are not invisible, Golu Babu." type="button">Open when you feel forgotten</button>
        <button class="memory-open-card" data-msg="Pause for a minute. Breathe. You do not always have to be strong for everyone. Even your tiredness deserves care." type="button">Open when you feel tired</button>
        <button class="memory-open-card" data-msg="Small small things are still here — one line, one photo, one memory, one Dhakkan trying to make you smile." type="button">Open when you miss small small things</button>
        <button class="memory-open-card" data-msg="Haan Golu Babu, Dhakkan main hoon. But this Dhakkan made a whole birthday vault only to make you smile." type="button">Open when you want to call me Dhakkan</button>
        <button class="memory-open-card" data-msg="Life mein aage bhi thoda main, thoda tum, aur thoda hum dono rahe — in whatever soft way life allows." type="button">Open when you want to smile</button>
      </div>
      <div class="memory-message" id="openWhenMessage"></div>`;
    const msg = openWhen.querySelector("#openWhenMessage");
    openWhen.querySelectorAll(".memory-open-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        msg.textContent = btn.dataset.msg;
        msg.classList.add("show");
        birthdaySubmit("birthday-open-when", btn.textContent, "Open when card clicked", "later-card", btn.dataset.msg);
      });
    });
    shell.insertBefore(openWhen, finalSection);
  }
}

function setupChikuBirthdayTouch() {
  const shell = document.querySelector(".birthday-shell");
  if (!shell || document.body.dataset.chikuBirthdayTouch === "done") return;
  document.body.dataset.chikuBirthdayTouch = "done";

  const style = document.createElement("style");
  style.textContent = `
    body{background:radial-gradient(circle at 10% 10%,rgba(255,225,196,.92),transparent 28%),radial-gradient(circle at 88% 12%,rgba(229,176,112,.60),transparent 26%),radial-gradient(circle at 50% 100%,rgba(255,220,232,.78),transparent 34%),linear-gradient(135deg,#fff8ed 0%,#ffe9d1 34%,#ffdce8 72%,#fff7ef 100%) !important;}
    .hero,.section{border-color:rgba(154,91,43,.18)!important;}
    .chiku-section{background:linear-gradient(135deg,rgba(255,247,232,.98),rgba(249,223,191,.90),rgba(255,232,241,.92));border:1px solid rgba(154,91,43,.22);text-align:center;}
    .chiku-section:before,.chiku-section:after{content:"";position:absolute;border-radius:50%;background:rgba(154,91,43,.14);filter:blur(.2px);}
    .chiku-section:before{width:54px;height:54px;left:22px;top:22px;}
    .chiku-section:after{width:72px;height:72px;right:24px;bottom:24px;}
    .chiku-inner{position:relative;z-index:1;max-width:790px;margin:0 auto;}
    .chiku-btn{margin:18px auto 0;border:0;border-radius:999px;padding:14px 22px;background:#7b4b2a;color:#fff;font:800 16px/1.2 Inter,sans-serif;box-shadow:0 16px 34px rgba(123,75,42,.22);cursor:pointer;display:inline-flex;align-items:center;gap:10px;animation:chikuWiggle 2.2s ease-in-out infinite;}
    .chiku-dot{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 28%,#d9a86f 0 18%,#9c6235 42%,#6f3f22 100%);box-shadow:inset -5px -7px 9px rgba(80,43,24,.22),0 7px 14px rgba(80,43,24,.14);}
    .chiku-reveal{display:none;margin:18px auto 0;padding:20px;border-radius:24px;background:rgba(255,255,255,.82);border:1px solid rgba(123,75,42,.20);box-shadow:0 15px 38px rgba(123,75,42,.13);text-align:left;}
    .chiku-reveal.show{display:block;animation:popIn .35s ease;}
    .chiku-reveal p{margin:8px 0;}
    @keyframes chikuWiggle{0%,100%{transform:rotate(0deg) translateY(0)}50%{transform:rotate(-2deg) translateY(-4px)}}
    @media(max-width:720px){.chiku-section{text-align:left}.chiku-section:before,.chiku-section:after{opacity:.35}.chiku-btn{width:100%;justify-content:center}.chiku-reveal{text-align:left;padding:16px}.chiku-inner{text-align:left}}
  `;
  document.head.appendChild(style);

  const cakeSection = findBirthdaySection("One birthday cake");
  const chikuSection = document.createElement("section");
  chikuSection.className = "section chiku-section";
  chikuSection.innerHTML = `
    <div class="chiku-inner">
      <h2>For the girl who loves Chiku</h2>
      <p>I added one more tiny thing here. Not a cake. Not a flower. A little chiku corner.</p>
      <p>Because some people like fancy things. And some people are Golu Babu — who can love something as simple and sweet as chiku.</p>
      <p>So this little corner is for that soft, simple, cute part of you.</p>
      <button class="chiku-btn" type="button" aria-label="Tap the chiku"><span class="chiku-dot"></span><span>Tap the chiku</span></button>
      <div class="chiku-reveal">
        <p><b>You are my Chiku-loving Golu Babu.</b></p>
        <p>Soft in places you hide.</p>
        <p>Sweet in ways you do not always show.</p>
        <p>And very, very special in ways you probably still do not fully understand.</p>
        <p><span class="soft-line">Happy Birthday, meri sweet Babbu ❤️</span></p>
      </div>
    </div>`;

  if (cakeSection) {
    cakeSection.insertAdjacentElement("afterend", chikuSection);
  } else {
    shell.insertBefore(chikuSection, shell.children[2] || null);
  }

  const chikuBtn = chikuSection.querySelector(".chiku-btn");
  const chikuReveal = chikuSection.querySelector(".chiku-reveal");
  chikuBtn.addEventListener("click", () => {
    chikuReveal.classList.add("show");
    birthdaySubmit("birthday-chiku", "Chiku surprise clicked", "For the girl who loves Chiku", "chiku-click", "You are my Chiku-loving Golu Babu | Happy Birthday meri sweet Babbu");
  });
}

updateCountdown();
updateCards();
setupCardClicks();
setupBirthdayReel();
setupBirthdayExtras();
setupChikuBirthdayTouch();
setInterval(updateCountdown, 1000);
setInterval(updateCards, 60 * 1000);
setInterval(createHeart, 700);
