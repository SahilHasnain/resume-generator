// Data model matching the Python PDF content
const data = {
  name: "Md Taj Hasan",
  tagline: "M.Sc. Applied Mathematics | Aspiring Educator & Problem Solver",
  email: "mt24mac1r15@student.nitw.ac.in",
  phone: "+91-9572242235",
  location: "Giridih, Jharkhand 815312",
  linkedin: {
    text: "Md Taj Hasan",
    url: "https://linkedin.com/in/md-taj-hasan-90ab64341",
  },
  profile:
    "Motivated postgraduate student in Applied Mathematics with a passion for teaching and problem solving. I focus on building strong fundamentals and connecting math with real-life use-cases to help learners think clearly and independently.",
  teaching: [
    "Matrices & Determinants",
    "Limit, Continuity & Differentiability",
    "Differential & Integral Calculus",
  ],
  skills: [
    { label: "Python", level: 0.7 },
    { label: "Mathematical Problem Solving", level: 0.9 },
    { label: "Proof Writing", level: 0.75 },
    { label: "LaTeX / MATLAB (placeholder)", level: 0.6 },
  ],
  languages: ["English", "Hindi", "Urdu"],
  research: [
    "Numerical Analysis",
    "Mathematical Modelling",
    "Optimization",
    "[Placeholder: Scientific Computing]",
  ],
  education: [
    {
      title: "M.Sc. in Applied Mathematics",
      meta: "NIT Warangal | 2025 – Present | CGPA: 7.30 (as of May 2025)",
    },
    {
      title: "B.Sc. in Mathematics (Hons.)",
      meta: "Vinoba Bhave University, Hazaribagh | 2019 – 2022 | CGPA: 6.51",
    },
    {
      title: "Intermediate (Class 12th)",
      meta: "Giridih (+2) High School, JAC | 2019 | 62.2%",
    },
    {
      title: "Matriculation (Class 10th)",
      meta: "Upgraded High School, Charghara, JAC | 2017 | 66.4%",
    },
  ],
  coursework: [
    "Advanced Linear Algebra",
    "Complex Analysis",
    "Ordinary Differential Equations",
    "Partial Differential Equations",
    "Real Analysis",
    "Probability & Statistics",
    "Topology",
    "Numerical Analysis",
    "Computer Programming in C++",
    "Numerical Computing Lab",
    "C++ Lab",
    "Probability & Statistics with R Lab",
    "Symbolic Computing Lab",
  ],
  projects: [
    "Solution of Probability and Statistics using R — Exploratory data analysis and simulation tasks in R; applied statistical tests and visualizations.",
    "[Placeholder: Numerical Analysis with Python] — Implemented root-finding, interpolation and ODE solvers using Python; analyzed error and stability.",
  ],
  achievements: [
    "IIT-JAM Mathematics (2024): All India Rank 712",
    "JEE Main (2019): Qualified",
  ],
  positions: [
    "[Placeholder: Class Representative / Math Club Volunteer — NITW, 2025–Present]",
    "[Placeholder: Peer Tutor — Assisted juniors with Calculus & Linear Algebra]",
  ],
  certifications: [
    "[Placeholder: NPTEL — Probability & Statistics / Linear Algebra (Year)]",
    "[Placeholder: Workshop — LaTeX for Scientific Writing / MATLAB for Engineers]",
  ],
  references: [
    "[Placeholder: Dr. <Advisor Name>, Assistant Professor, Dept. of Mathematics, NIT Warangal — advisor@nitw.ac.in]",
    "Available upon request.",
  ],
};

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
      const opt = {
        margin: [0, 0, 0, 0], // mm
        filename: `Md_Taj_Hasan_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { avoid: [".avoid-break"], mode: ["css", "legacy"] },
      };
      window.html2pdf().set(opt).from(page).save();
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
