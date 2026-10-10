const staffMembers = [
  {
    id: 1,
    name: "Samir H.",
    discordId: "#21942",
    role: "Moderator",
    joined: "12-03-2023",
    status: "Actief",
    notes: "Behoudt uitstekende ticketscore en snelle response",
    special: "Versterkte aandacht voor community support",
    ticketsThisMonth: 12,
    ticketsTotal: 48,
    violations: 2,
    absentDays: 6,
    activityTotal: 42,
    lastActivity: "Ticket #4418 gesloten",
    statusKey: "active"
  },
  {
    id: 2,
    name: "Jade P.",
    discordId: "#41890",
    role: "Support Lead",
    joined: "04-11-2022",
    status: "Afwezig",
    notes: "Afwezig in verband met verlof",
    special: "Toezicht op ticket escalaties",
    ticketsThisMonth: 8,
    ticketsTotal: 67,
    violations: 1,
    absentDays: 11,
    activityTotal: 54,
    lastActivity: "Staff review afgerond",
    statusKey: "absent"
  },
  {
    id: 3,
    name: "Milan V.",
    discordId: "#73502",
    role: "Community Manager",
    joined: "19-06-2021",
    status: "Proeftijd",
    notes: "Ondergaat evaluatie na 30 dagen",
    special: "Nieuw op rollen voor community outreach",
    ticketsThisMonth: 9,
    ticketsTotal: 38,
    violations: 3,
    absentDays: 4,
    activityTotal: 29,
    lastActivity: "Onboarding afgerond",
    statusKey: "probation"
  },
  {
    id: 4,
    name: "Lina S.",
    discordId: "#98213",
    role: "Moderator",
    joined: "29-01-2024",
    status: "Actief",
    notes: "Sterke prestaties in moderation workflows",
    special: "Heeft boeking voor team shifts afgerond",
    ticketsThisMonth: 11,
    ticketsTotal: 31,
    violations: 1,
    absentDays: 3,
    activityTotal: 26,
    lastActivity: "Notitie toegevoegd aan ticket #4401",
    statusKey: "active"
  },
  {
    id: 5,
    name: "Noah K.",
    discordId: "#40187",
    role: "Operations",
    joined: "16-08-2023",
    status: "Geschorst",
    notes: "Onder onderzoek; toegang beperkt",
    special: "Vardering voor handelingen in audit",
    ticketsThisMonth: 4,
    ticketsTotal: 21,
    violations: 5,
    absentDays: 8,
    activityTotal: 17,
    lastActivity: "Audit log gecontroleerd",
    statusKey: "suspended"
  }
];

const dashboardDetailMap = {
  staffTotal: "Totaal aantal staffleden",
  ticketsMonth: "Tickets deze maand",
  violations: "Overtredingen",
  absence: "Afwezigheden",
  openTasks: "Open zaken",
  activeStaff: "Actieve staffleden"
};

function updateClock() {
  const now = new Date();
  const dateText = now.toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const timeText = now.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit"
  });

  document.getElementById("dateText").textContent = dateText.replace(".", "");
  document.getElementById("timeText").textContent = timeText;
}

function renderStaffCards() {
  const grid = document.getElementById("staffGrid");
  if (!grid) return;

  grid.innerHTML = staffMembers
    .map(
      (member) => `
        <article class="staff-card" data-staff-id="${member.id}">
          <div class="staff-card-header">
            <div class="staff-profile">
              <div class="staff-avatar">${member.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}</div>
              <div class="staff-meta">
                <strong>${member.name}</strong>
                <span>${member.role}</span>
              </div>
            </div>
            <span class="status-badge ${member.statusKey}">${member.status}</span>
          </div>

          <div class="staff-body">
            <div class="meta-line">
              <span>Laatste activiteit</span>
              <strong>${member.lastActivity}</strong>
            </div>
            <div class="meta-line">
              <span>Ticket aantal</span>
              <strong class="ticket-count">${member.ticketsThisMonth}</strong>
            </div>
            <div class="meta-line">
              <span>Discord ID</span>
              <strong>${member.discordId}</strong>
            </div>
          </div>

          <div class="staff-footer">
            <span>${member.special}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function openProfile(memberId) {
  const member = staffMembers.find((item) => item.id === Number(memberId));
  if (!member) return;

  document.getElementById("profileAvatar").textContent = member.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  document.getElementById("profileName").textContent = member.name;
  document.getElementById("profileRole").textContent = member.role;
  document.getElementById("profileDiscord").textContent = member.discordId;
  document.getElementById("profileFunction").textContent = member.role;
  document.getElementById("profileStatus").textContent = member.status;
  document.getElementById("profileJoined").textContent = member.joined;
  document.getElementById("profileTicketsThisMonth").textContent = member.ticketsThisMonth;
  document.getElementById("profileViolations").textContent = member.violations;

  document.getElementById("summaryTicketsMonth").textContent = member.ticketsThisMonth;
  document.getElementById("summaryTicketsTotal").textContent = member.ticketsTotal;
  document.getElementById("summaryViolations").textContent = member.violations;
  document.getElementById("summaryAbsentDays").textContent = member.absentDays;
  document.getElementById("summaryTotalActivity").textContent = member.activityTotal;

  document.getElementById("profileModal").classList.remove("hidden");
}

function bindNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const view = button.dataset.view;
      document.querySelectorAll(".view").forEach((section) => {
        section.classList.toggle("active", section.id === `${view}View`);
      });
    });
  });
}

function bindClickableCards() {
  document.querySelectorAll(".clickable-card").forEach((card) => {
    card.addEventListener("click", () => {
      const detail = dashboardDetailMap[card.dataset.detail];
      alert(`${detail} - detailpagina beschikbaar in toekomstige uitbreiding.`);
    });
  });
}

function bindStaffCards() {
  document.querySelectorAll(".staff-card").forEach((card) => {
    card.addEventListener("click", () => {
      openProfile(card.dataset.staffId);
    });
  });
}

function bindModalControls() {
  const modal = document.getElementById("logModal");
  const profileModal = document.getElementById("profileModal");

  document.getElementById("openLogModal").addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.querySelector("#logForm").reset();
      renderDynamicFields("");
    });
  });

  document.querySelector(".close-profile").addEventListener("click", () => {
    profileModal.classList.add("hidden");
  });

  document.getElementById("addStaffBtn").addEventListener("click", () => {
    alert("Staff toevoegen - voorbereid voor toekomstige uitbreiding.");
  });
}

function renderDynamicFields(type) {
  const container = document.getElementById("dynamicFields");
  if (!container) return;

  let html = "";

  if (!type) {
    container.innerHTML = "";
    return;
  }

  switch (type) {
    case "activity":
      html = `
        <div class="field full">
          <label>Omschrijving</label>
          <textarea placeholder="Beschrijf de activiteit..."></textarea>
        </div>
        <div class="field">
          <label>Diensttijd</label>
          <input type="text" placeholder="Bijv. 18:00 - 22:30" />
        </div>
        <div class="field">
          <label>Resultaat</label>
          <input type="text" placeholder="Resultaat of beoordeling" />
        </div>
        <div class="field full">
          <label>Status</label>
          <select>
            <option>Open</option>
            <option>In behandeling</option>
            <option>Afgerond</option>
            <option>Geweigerd</option>
            <option>Onvolledig</option>
          </select>
        </div>
      `;
      break;

    case "ticket":
      html = `
        <div class="field">
          <label>Ticket nummer</label>
          <input type="text" placeholder="#4438" />
        </div>
        <div class="field">
          <label>Categorie</label>
          <input type="text" placeholder="Support / Moderation / Security" />
        </div>
        <div class="field">
          <label>Prioriteit</label>
          <select>
            <option>Laag</option>
            <option>Gemiddeld</option>
            <option>Hoog</option>
            <option>Kritiek</option>
          </select>
        </div>
        <div class="field">
          <label>Aantal tickets</label>
          <input type="number" value="1" />
        </div>
        <div class="field full">
          <label>Omschrijving</label>
          <textarea placeholder="Beschrijf het ticket..." ></textarea>
        </div>
        <div class="field full">
          <label>Status</label>
          <select>
            <option>Open</option>
            <option>In behandeling</option>
            <option>Afgerond</option>
            <option>Geweigerd</option>
            <option>Onvolledig</option>
          </select>
        </div>
      `;
      break;

    case "absence":
      html = `
        <div class="field">
          <label>Van datum</label>
          <input type="date" />
        </div>
        <div class="field">
          <label>Tot datum</label>
          <input type="date" />
        </div>
        <div class="field full">
          <label>Reden</label>
          <textarea placeholder="Geef een duidelijke reden op..."></textarea>
        </div>
        <div class="field full">
          <label>Status</label>
          <select>
            <option>Open</option>
            <option>In behandeling</option>
            <option>Afgerond</option>
            <option>Geweigerd</option>
            <option>Onvolledig</option>
          </select>
        </div>
      `;
      break;

    case "violation":
      html = `
        <div class="field">
          <label>Regel nummer</label>
          <input type="text" placeholder="Regel #12" />
        </div>
        <div class="field">
          <label>Categorie</label>
          <input type="text" placeholder="Gedrag / Moderation / Gebruik" />
        </div>
        <div class="field full">
          <label>Omschrijving</label>
          <textarea placeholder="Beschrijf de overtreding..." ></textarea>
        </div>
        <div class="field full">
          <label>Bewijs</label>
          <textarea placeholder="Link of screenshots / bewijsbestand" ></textarea>
        </div>
        <div class="field full">
          <label>Status</label>
          <select>
            <option>Open</option>
            <option>In behandeling</option>
            <option>Afgerond</option>
            <option>Geweigerd</option>
            <option>Onvolledig</option>
          </select>
        </div>
      `;
      break;

    case "special":
      html = `
        <div class="field">
          <label>Categorie</label>
          <input type="text" placeholder="Bijzonderheid / Prestatie / Waarschuwing" />
        </div>
        <div class="field">
          <label>Prioriteit</label>
          <select>
            <option>Laag</option>
            <option>Gemiddeld</option>
            <option>Hoog</option>
            <option>Kritiek</option>
          </select>
        </div>
        <div class="field full">
          <label>Omschrijving</label>
          <textarea placeholder="Vat de bijzonderheid samen..." ></textarea>
        </div>
      `;
      break;

    default:
      container.innerHTML = "";
  }

  container.innerHTML = html;
}

function bindLogForm() {
  const typeSelect = document.getElementById("logTypeSelect");
  if (!typeSelect) return;

  typeSelect.addEventListener("change", (event) => {
    renderDynamicFields(event.target.value);
  });

  document.getElementById("logForm").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Log succesvol toegevoegd. (Demo frontend)");
    document.getElementById("logModal").classList.add("hidden");
    event.target.reset();
    renderDynamicFields("");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStaffCards();
  bindNavigation();
  bindClickableCards();
  bindStaffCards();
  bindModalControls();
  bindLogForm();
  updateClock();
  setInterval(updateClock, 1000 * 30);

  const svg = document.querySelector(".line-chart");
  if (svg) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "gradStroke");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("y2", "0%");
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#4F7BFF");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#7C3AED");
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);
  }
});
