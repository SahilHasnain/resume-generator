// Data is now loaded from data.js as a global `data` constant

function fillBasics() {
  document.getElementById("name").textContent = data.name;
  document.getElementById("tagline").textContent = data.tagline;

  const emailLink = document.getElementById("emailLink");
  document.getElementById("emailText").textContent = data.email;
  emailLink.href = `mailto:${data.email}`;

  const phoneLink = document.getElementById("phoneLink");
  document.getElementById("phoneText").textContent = data.phone;
  phoneLink.href = `tel:${data.phone.replace(/\s|\+/g, "")}`;

  document.getElementById("locationText").textContent = data.location;

  const linkedin = document.getElementById("linkedinLink");
  document.getElementById("linkedinText").textContent = data.linkedin.text;
  linkedin.href = data.linkedin.url;

  document.getElementById("profile").textContent = data.profile;
}

function fillList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  items.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function renderSkills() {
  const root = document.getElementById("skills");
  root.innerHTML = "";
  data.skills.forEach((s) => {
    const wrap = document.createElement("div");
    wrap.className = "space-y-1";

    const label = document.createElement("div");
    label.className = "text-[12px] text-slate-800";
    label.textContent = s.label;

    const barBg = document.createElement("div");
    barBg.className = "h-1.5 bg-slate-200 rounded";

    const bar = document.createElement("div");
    bar.className = "h-1.5 bg-blue-700 rounded";
    bar.style.width = `${Math.max(0, Math.min(1, s.level)) * 100}%`;

    barBg.appendChild(bar);
    wrap.appendChild(label);
    wrap.appendChild(barBg);

    root.appendChild(wrap);
  });
}

function renderEducation() {
  const root = document.getElementById("education");
  root.innerHTML = "";
  data.education.forEach((e) => {
    const item = document.createElement("div");
    const title = document.createElement("div");
    title.className = "text-[14px] font-semibold text-slate-900";
    title.textContent = e.title;

    const meta = document.createElement("div");
    meta.className = "text-[12.5px] text-slate-600";
    meta.textContent = e.meta;

    item.appendChild(title);
    item.appendChild(meta);
    root.appendChild(item);
  });
}

function renderCoursework() {
  const root = document.getElementById("coursework");
  root.innerHTML = "";
  // Build 2-column rows
  for (let i = 0; i < data.coursework.length; i += 2) {
    const row = document.createElement("div");
    row.className = "contents border-t first:border-t-0 border-slate-300";

    const left = document.createElement("div");
    left.className = "px-2 py-0.5";
    left.textContent = data.coursework[i] || "";

    const right = document.createElement("div");
    right.className = "px-2 py-0.5";
    right.textContent = data.coursework[i + 1] || "";

    root.appendChild(left);
    root.appendChild(right);
  }
}

function renderBullets(id, items) {
  fillList(id, items);
}

function setupPrint() {
  const btn = document.getElementById("btnPrint");
  btn.addEventListener("click", () => {
    const page = document.getElementById("page");
    // Prefer html2pdf when available to avoid browser date/url headers
    if (window.html2pdf) {
      // Ensure capture with zero margins and no shadows
      document.body.classList.add("pdf-mode");
      // Avoid scroll offset affecting capture
      window.scrollTo(0, 0);
      const opt = {
        margin: [0, 0, 0, 0], // mm
        filename: `Md_Taj_Hasan_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { avoid: [".avoid-break"], mode: ["css", "legacy"] },
      };
      window
        .html2pdf()
        .set(opt)
        .from(page)
        .save()
        .finally(() => {
          // Clean up
          document.body.classList.remove("pdf-mode");
        });
    } else {
      window.print();
    }
  });
}

function init() {
  fillBasics();
  fillList("teaching", data.teaching);
  renderSkills();
  fillList("languages", data.languages);
  renderBullets("research", data.research);
  renderEducation();
  renderCoursework();
  renderBullets("projects", data.projects);
  renderBullets("achievements", data.achievements);
  renderBullets("positions", data.positions);
  renderBullets("certifications", data.certifications);
  renderBullets("references", data.references);
  setupPrint();
}

init();
