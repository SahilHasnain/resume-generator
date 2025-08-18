// Renders the resume from data.js into the page and ensures it fits on A4

(function () {
  if (typeof data !== "object") {
    console.error("data.js not loaded");
    return;
  }

  const root = document.getElementById("resume-root");
  const scaleWrap = document.getElementById("scale-wrap");
  const page = document.getElementById("resume-page");

  // Helpers
  const el = (tag, cls = "", html = "") => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };

  // Normalize a numeric value to 0–100 percentage (accepts 0–1 or 0–100)
  const toPercent = (val) => {
    const n = Number(val);
    if (!isFinite(n)) return 0;
    if (n <= 1) return Math.max(0, Math.min(100, Math.round(n * 100)));
    return Math.max(0, Math.min(100, Math.round(n)));
  };

  const iconFor = (title) => {
    const map = {
      Profile: "👤",
      Education: "🎓",
      Coursework: "📚",
      Projects: "🚀",
      Achievements: "🏆",
      "Teaching Interests": "🧑‍🏫",
      Skills: "✨",
      Languages: "🌐",
      "Research Interests": "🔬",
      "Positions of Responsibility": "👥",
      Certifications: "📜",
      References: "🤝",
    };
    return map[title] || "•";
  };

  const section = (title) => {
    const wrap = el("section", "mt-4 first:mt-0");
    const h = el("div", "flex items-center gap-2 text-gray-800");
    const ico = el(
      "span",
      "shrink-0 inline-grid place-items-center h-5 w-5 rounded-full bg-primary-100 text-[10pt]",
      iconFor(title)
    );
    const t = el(
      "h3",
      "text-[10pt] font-semibold tracking-wide uppercase",
      title
    );
    const line = el("div", "ml-2 h-px bg-gray-200 flex-1");
    h.append(ico, t, line);
    wrap.appendChild(h);
    return wrap;
  };

  const bulletList = (items) => {
    const ul = el(
      "ul",
      "mt-1 grid grid-cols-2 gap-x-6 gap-y-1 text-[9.5pt] text-gray-800"
    );
    items.forEach((it) => {
      const li = el("li", "flex items-start gap-2");
      li.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-600 shrink-0")
      );
      li.appendChild(el("span", "", it));
      ul.appendChild(li);
    });
    return ul;
  };

  const pill = (text) =>
    el(
      "span",
      "px-2 py-0.5 rounded-full bg-primary-50 text-primary-800 border border-primary-200 text-[9pt]",
      text
    );

  const levelBar = (value) => {
    const pct = toPercent(value);
    const row = el("div", "flex items-center gap-2");
    const outer = el("div", "flex-1 min-w-0 overflow-hidden");
    // Inline fallback styles so Tailwind is not required
    outer.style.height = "8px"; // ~h-2
    outer.style.background = "#e5e7eb"; // gray-200
    outer.style.borderRadius = "9999px"; // rounded-full

    const inner = el("div", "", "");
    inner.style.height = "100%";
    inner.style.width = pct + "%";
    inner.style.background = "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)"; // blue-500 -> blue-700
    inner.style.borderRadius = "inherit";
    outer.appendChild(inner);

    const label = el("span", "w-10 text-right", `${pct}%`);
    label.style.fontSize = "8.75pt";
    label.style.color = "#4b5563"; // gray-600
    row.appendChild(outer);
    row.appendChild(label);
    return row;
  };

  const contactRow = (variant = "chips") => {
    const base =
      variant === "chips"
        ? "px-2 py-1 rounded-full border bg-white/10 border-white/20 text-white/90"
        : "";
    const row = el(
      "div",
      variant === "chips"
        ? "flex flex-wrap gap-2 text-[9.25pt]"
        : "flex flex-wrap gap-3 text-[9.5pt] text-gray-700"
    );
    if (data.email) row.appendChild(el("div", base, `✉️ ${data.email}`));
    if (data.phone) row.appendChild(el("div", base, `📞 ${data.phone}`));
    if (data.location) row.appendChild(el("div", base, `📍 ${data.location}`));
    if (data.linkedin?.url) {
      const a = el(
        "a",
        base +
          (variant === "chips"
            ? " hover:bg-white/15"
            : " text-primary-700 hover:underline"),
        `in/${data.linkedin.text || "LinkedIn"}`
      );
      a.href = data.linkedin.url;
      a.target = "_blank";
      row.appendChild(a);
    }
    return row;
  };

  // Header
  const header = el("header", "");
  const banner = el(
    "div",
    "rounded-md bg-blue-700 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white p-5"
  );
  // Fallbacks if Tailwind classes or gradients fail to load
  try {
    banner.style.background =
      "linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #1d4ed8 100%)"; // primary-700 -> primary-600 -> primary-700
    banner.style.color = "#ffffff";
    banner.style.borderRadius = "0.375rem"; // rounded-md
    banner.style.padding = "1.25rem"; // p-5
  } catch {}
  const top = el("div", "flex items-start justify-between gap-4");
  const titleWrap = el("div", "flex-1");
  titleWrap.appendChild(
    el("h1", "text-[18pt] leading-tight font-bold", data.name)
  );
  if (data.tagline)
    titleWrap.appendChild(
      el("div", "text-white/90 text-[10.75pt] mt-1", data.tagline)
    );

  const badge = el("div", "text-right min-w-[140px]");
  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
  badge.appendChild(
    el(
      "div",
      "inline-block px-2 py-1 rounded-full bg-white/10 text-white text-[9pt] border border-white/20",
      `Updated ${dateStr}`
    )
  );
  top.append(titleWrap, badge);
  const contacts = contactRow("chips");
  contacts.classList.add("mt-3");
  banner.append(top, contacts);
  header.appendChild(banner);

  // Body layout: two columns with smart proportions
  const grid = el("div", "grid grid-cols-5 gap-6 mt-4");
  const left = el("div", "col-span-3 space-y-4");
  const right = el("div", "col-span-2 space-y-4");

  // Profile
  if (data.profile) {
    const s = section("Profile");
    s.appendChild(el("p", "mt-1 text-[9.75pt] text-gray-800", data.profile));
    left.appendChild(s);
  }

  // Education
  if (Array.isArray(data.education) && data.education.length) {
    const s = section("Education");
    const wrap = el("div", "mt-1 space-y-1");
    data.education.forEach((ed) => {
      const item = el("div", "");
      item.appendChild(el("div", "font-semibold text-[10pt]", ed.title));
      if (ed.meta)
        item.appendChild(el("div", "text-[9.25pt] text-gray-700", ed.meta));
      wrap.appendChild(item);
    });
    s.appendChild(wrap);
    left.appendChild(s);
  }

  // Coursework
  if (Array.isArray(data.coursework) && data.coursework.length) {
    const s = section("Coursework");
    const gridcw = el(
      "div",
      "mt-1 grid grid-cols-2 gap-x-6 gap-y-1 text-[9.25pt]"
    );
    data.coursework.forEach((c) => {
      const row = el("div", "flex items-start gap-2 text-gray-800");
      row.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-500")
      );
      row.appendChild(el("span", "", c));
      gridcw.appendChild(row);
    });
    s.appendChild(gridcw);
    left.appendChild(s);
  }

  // Projects
  if (Array.isArray(data.projects) && data.projects.length) {
    const s = section("Projects");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.projects.forEach((p) => {
      const li = el("li", "flex items-start gap-2 text-gray-800");
      li.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-600")
      );
      li.appendChild(el("span", "", p));
      list.appendChild(li);
    });
    s.appendChild(list);
    left.appendChild(s);
  }

  // Achievements
  if (Array.isArray(data.achievements) && data.achievements.length) {
    const s = section("Achievements");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.achievements.forEach((a) => {
      const li = el("li", "flex items-start gap-2 text-gray-800");
      li.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-600")
      );
      li.appendChild(el("span", "", a));
      list.appendChild(li);
    });
    s.appendChild(list);
    left.appendChild(s);
  }

  // Right column sections
  if (Array.isArray(data.teaching) && data.teaching.length) {
    const s = section("Teaching Interests");
    s.appendChild(bulletList(data.teaching));
    right.appendChild(s);
  }

  if (Array.isArray(data.skills) && data.skills.length) {
    const s = section("Skills");
    const wrap = el("div", "mt-1 space-y-2");
    data.skills.forEach((sk) => {
      const row = el("div", "");
      row.appendChild(
        el("div", "text-[9.5pt] font-medium text-gray-800", sk.label)
      );
      row.appendChild(levelBar(sk.level ?? 0.6));
      wrap.appendChild(row);
    });
    s.appendChild(wrap);
    right.appendChild(s);
  }

  if (Array.isArray(data.languages) && data.languages.length) {
    const s = section("Languages");
    const w = el("div", "mt-1 flex flex-wrap gap-1.5");
    data.languages.forEach((lng) => w.appendChild(pill(lng)));
    s.appendChild(w);
    right.appendChild(s);
  }

  if (Array.isArray(data.research) && data.research.length) {
    const s = section("Research Interests");
    s.appendChild(bulletList(data.research));
    right.appendChild(s);
  }

  if (Array.isArray(data.positions) && data.positions.length) {
    const s = section("Positions of Responsibility");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.positions.forEach((p) => {
      const li = el("li", "flex items-start gap-2 text-gray-800");
      li.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-600")
      );
      li.appendChild(el("span", "", p));
      list.appendChild(li);
    });
    s.appendChild(list);
    right.appendChild(s);
  }

  if (Array.isArray(data.certifications) && data.certifications.length) {
    const s = section("Certifications");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.certifications.forEach((c) => {
      const li = el("li", "flex items-start gap-2 text-gray-800");
      li.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-600")
      );
      li.appendChild(el("span", "", c));
      list.appendChild(li);
    });
    s.appendChild(list);
    right.appendChild(s);
  }

  if (Array.isArray(data.references) && data.references.length) {
    const s = section("References");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.references.forEach((r) => {
      const li = el("li", "flex items-start gap-2 text-gray-800");
      li.appendChild(
        el("span", "mt-1 h-1.5 w-1.5 rounded-full bg-primary-600")
      );
      li.appendChild(el("span", "", r));
      list.appendChild(li);
    });
    s.appendChild(list);
    right.appendChild(s);
  }

  grid.append(left, right);

  // Compose document
  root.appendChild(header);
  root.appendChild(grid);

  // Fit to one A4 page by scaling down if content overflows
  function fitToPage() {
    // Reset scale first
    scaleWrap.style.transform = "scale(1)";
    const contentHeight = root.scrollHeight + 32; // padding allowance
    const pageHeight = 297 * (window.devicePixelRatio || 1); // not reliable alone

    // Compute based on actual pixel sizes of container
    const available = page.clientHeight; // equals 297mm because of fixed size
    const needed = root.scrollHeight + 32;
    const scale = Math.min(1, available / needed);
    scaleWrap.style.transformOrigin = "top left";
    scaleWrap.style.transform = `scale(${scale})`;
  }

  // Initial fit, then refit after fonts load
  window.addEventListener("load", fitToPage);
  setTimeout(fitToPage, 300);
  window.addEventListener("resize", fitToPage);

  // PDF / Print actions
  const btnDownload = document.getElementById("btn-download");
  const btnPrint = document.getElementById("btn-print");

  btnPrint?.addEventListener("click", () => {
    fitToPage();
    window.print();
  });

  btnDownload?.addEventListener("click", () => {
    // Temporarily remove outer page shadow and use A4 exact size
    const resumeNode = document.getElementById("resume-page");
    const prevBoxShadow = resumeNode.style.boxShadow;
    resumeNode.classList.add("bg-white");

    // For html2pdf, we render the scaled content at 1:1 inside a clone
    fitToPage();

    const opt = {
      margin: 0,
      filename: `${(data.name || "Resume").replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    // Use the inner content (scaled) to ensure fit
    const node = document.getElementById("scale-wrap");

    // Temporarily force scale to 1 for crisp capture at A4 size inside a clone wrapper
    const prevTransform = node.style.transform;
    node.style.transform = "scale(1)";

    // Wrap in a fixed A4 container so html2pdf renders at correct dimensions
    const tmp = node.cloneNode(true);
    const container = document.createElement("div");
    container.style.width = "210mm";
    container.style.height = "297mm";
    container.style.padding = "0";
    container.style.background = "white";
    container.appendChild(tmp);

    html2pdf()
      .set(opt)
      .from(container)
      .save()
      .finally(() => {
        node.style.transform = prevTransform;
        resumeNode.style.boxShadow = prevBoxShadow;
      });
  });
})();
