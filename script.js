const levels = [
  {
    name: "Mini Challenge",
    creator: "CurtaGD",
    verifier: "CurtaGD",
    points: 200,
    id: "111838059",
    pass: "No Pass",
    qualify: "79% or better to qualify",
    records: [
      ["YourName", 100],
      ["Player2", 92]
    ]
  },

  {
    name: "TRAGIC",
    creator: "zoinks lil cousin",
    verifier: "zoinks lil cousin",
    points: 190,
    id: "123456789",
    pass: "No Pass",
    qualify: "80% or better to qualify",
    records: [
      ["YourName", 87]
    ]
  },

  {
    name: "Wave Challenge",
    creator: "RCL Creator",
    verifier: "RCL Verifier",
    points: 180,
    id: "987654321",
    pass: "No Pass",
    qualify: "75% or better to qualify",
    records: []
  },

  {
    name: "Happy Purple",
    creator: "RCL Creator",
    verifier: "RCL Verifier",
    points: 170,
    id: "246813579",
    pass: "No Pass",
    qualify: "70% or better to qualify",
    records: []
  },

  {
    name: "Childlike",
    creator: "RCL Creator",
    verifier: "RCL Verifier",
    points: 160,
    id: "135792468",
    pass: "No Pass",
    qualify: "70% or better to qualify",
    records: []
  },

  {
    name: "Smurtzii Challenge",
    creator: "RCL Creator",
    verifier: "RCL Verifier",
    points: 150,
    id: "112233445",
    pass: "No Pass",
    qualify: "70% or better to qualify",
    records: []
  },

  {
    name: "Bandit",
    creator: "RCL Creator",
    verifier: "RCL Verifier",
    points: 140,
    id: "556677889",
    pass: "No Pass",
    qualify: "70% or better to qualify",
    records: []
  }
];

const $ = id => document.getElementById(id);


// =========================
// SHOW LEVEL
// =========================

function showLevel(level) {
  $("title").textContent = level.name;
  $("creator").textContent = level.creator;
  $("verifier").textContent = level.verifier;
  $("publisher").textContent = "RCL";
  $("points").textContent = level.points;
  $("id").textContent = level.id;
  $("pass").textContent = level.pass;

  $("qualify").textContent = level.qualify;

  $("records").innerHTML = level.records
    .map(r => `<div class="record"><b>${r[0]}</b> — ${r[1]}%</div>`)
    .join("");
}


// =========================
// RENDER LIST
// =========================

function render(filter = "") {
  let out = "";

  levels
    .filter(level =>
      level.name.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((level, index) => {
      out += `
        <div
          class="level ${filter && index === 0 ? "active" : ""}"
          data-index="${levels.indexOf(level)}"
        >
          <span class="rank">${levels.indexOf(level) + 1}</span>
          <span class="level-name">${level.name}</span>
          <span class="level-points">${level.points}</span>
        </div>
      `;
    });

  $("list").innerHTML = out;

  document.querySelectorAll(".level").forEach(item => {
    item.onclick = () => {
      showLevel(levels[Number(item.dataset.index)]);

      document
        .querySelectorAll(".level")
        .forEach(x => x.classList.remove("active"));

      item.classList.add("active");
    };
  });
}


// =========================
// SEARCH
// =========================

$("search").oninput = e => {
  render(e.target.value);
};


// =========================
// DARK MODE
// =========================

$("theme").onclick = () => {
  document.body.classList.toggle("dark");
};


// =========================
// NAVIGATION
// =========================

document.querySelectorAll(".nav").forEach(button => {
  button.onclick = () => {
    document
      .querySelectorAll(".nav")
      .forEach(x => x.classList.remove("active"));

    button.classList.add("active");

    const page = button.dataset.page;

    if (page === "list") {
      $("listPage").style.display = "";
      $("leaderboardPage").style.display = "none";
      $("roulettePage").style.display = "none";
    }

    if (page === "leaderboard") {
      $("listPage").style.display = "none";
      $("leaderboardPage").style.display = "";
      $("roulettePage").style.display = "none";

      board();
    }

    if (page === "roulette") {
      $("listPage").style.display = "none";
      $("leaderboardPage").style.display = "none";
      $("roulettePage").style.display = "";
    }
  };
});


// =========================
// LEADERBOARD
// =========================

function board() {
  const entries = [];

  levels.forEach(level => {
    level.records.forEach(record => {
      entries.push({
        player: record[0],
        percent: record[1],
        points: Math.floor((record[1] / 100) * level.points)
      });
    });
  });

  entries.sort((a, b) => b.points - a.points);

  $("leaderboard").innerHTML = entries
    .map(
      (entry, index) => `
        <div class="board-row">
          <span>#${index + 1}</span>
          <b>${entry.player}</b>
          <span>${entry.percent}%</span>
          <span>${entry.points} pts</span>
        </div>
      `
    )
    .join("");
}


// =========================
// ROULETTE
// =========================

$("result").onclick = () => {
  const randomLevel =
    levels[Math.floor(Math.random() * levels.length)];

  $("rouletteResult").textContent = randomLevel.name;

  showLevel(randomLevel);
};


// =========================
// SUBMIT RECORD MODAL
// =========================

const modal = $("modal");
const submitButton = $("submit");
const closeButton = $("close");
const demoButton = $("demo");
const message = $("msg");


// IMPORTANT:
// Hide modal immediately when the page loads.
if (modal) {
  modal.classList.add("hidden");
}


// Open modal
if (submitButton) {
  submitButton.onclick = () => {
    modal.classList.remove("hidden");
  };
}


// Close modal with X
if (closeButton) {
  closeButton.onclick = () => {
    modal.classList.add("hidden");
  };
}


// Close modal by clicking outside it
if (modal) {
  modal.onclick = event => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  };
}


// Demo submission
if (demoButton) {
  demoButton.onclick = () => {
    if (message) {
      message.textContent =
        "Demo submission received — database coming soon.";
    }
  };
}


// ESC closes modal
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal) {
    modal.classList.add("hidden");
  }
});


// =========================
// START WEBSITE
// =========================

render();
showLevel(levels[0]);
