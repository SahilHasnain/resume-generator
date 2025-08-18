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

  const section = (title) => {
    const wrap = el("section", "mt-3 first:mt-0");
    const h = el(
      "h3",
      "text-[10pt] font-semibold tracking-wide text-gray-800 flex items-center gap-2 uppercase"
    );
    const bar = el("span", "h-[10px] w-1 rounded bg-primary-600 inline-block");
    const t = el("span", "", title);
    h.append(bar, t);
    wrap.appendChild(h);
    return wrap;
  };

  const bulletList = (items) => {
    const ul = el(
      "ul",
      "list-disc ml-5 text-[9.5pt] text-gray-800 grid grid-cols-2 gap-x-6"
    );
    items.forEach((it) => ul.appendChild(el("li", "", it)));
    return ul;
  };

  const pill = (text) =>
    el(
      "span",
      "px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-[9pt]",
      text
    );

  const levelBar = (value) => {
    const outer = el("div", "h-1.5 bg-gray-200 rounded");
    const inner = el("div", "h-1.5 bg-primary-600 rounded");
    inner.style.width = `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%`;
    outer.appendChild(inner);
    return outer;
  };

  const contactRow = () => {
    const row = el("div", "flex flex-wrap gap-3 text-[9.5pt] text-gray-700");
    if (data.email) row.appendChild(el("div", "", `✉️ ${data.email}`));
    if (data.phone) row.appendChild(el("div", "", `📞 ${data.phone}`));
    if (data.location) row.appendChild(el("div", "", `📍 ${data.location}`));
    if (data.linkedin?.url) {
      const a = el(
        "a",
        "text-primary-700 hover:underline",
        `in/${data.linkedin.text || "LinkedIn"}`
      );
      a.href = data.linkedin.url;
      a.target = "_blank";
      row.appendChild(a);
    }
    return row;
  };

  // Header
  const header = el(
    "header",
    "flex items-start justify-between gap-6 pb-3 border-b border-gray-200"
  );
  const titleWrap = el("div", "flex-1");
  titleWrap.appendChild(
    el("h1", "text-2xl font-bold text-gray-900", data.name)
  );
  if (data.tagline)
    titleWrap.appendChild(
      el("div", "text-gray-700 text-[10.5pt] mt-0.5", data.tagline)
    );
  titleWrap.appendChild(el("div", "mt-2", ""));
  titleWrap.lastChild.appendChild(contactRow());

  const badge = el("div", "text-right min-w-[140px]");
  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
  badge.appendChild(
    el(
      "div",
      "inline-block px-2 py-1 rounded bg-primary-50 text-primary-700 text-[9pt] border border-primary-200",
      `Updated ${dateStr}`
    )
  );

  header.append(titleWrap, badge);

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
    data.coursework.forEach((c) =>
      gridcw.appendChild(el("div", "text-gray-800", `• ${c}`))
    );
    s.appendChild(gridcw);
    left.appendChild(s);
  }

  // Projects
  if (Array.isArray(data.projects) && data.projects.length) {
    const s = section("Projects");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.projects.forEach((p) =>
      list.appendChild(el("li", "text-gray-800", `• ${p}`))
    );
    s.appendChild(list);
    left.appendChild(s);
  }

  // Achievements
  if (Array.isArray(data.achievements) && data.achievements.length) {
    const s = section("Achievements");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.achievements.forEach((a) =>
      list.appendChild(el("li", "text-gray-800", `• ${a}`))
    );
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
    data.positions.forEach((p) =>
      list.appendChild(el("li", "text-gray-800", `• ${p}`))
    );
    s.appendChild(list);
    right.appendChild(s);
  }

  if (Array.isArray(data.certifications) && data.certifications.length) {
    const s = section("Certifications");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.certifications.forEach((c) =>
      list.appendChild(el("li", "text-gray-800", `• ${c}`))
    );
    s.appendChild(list);
    right.appendChild(s);
  }

  if (Array.isArray(data.references) && data.references.length) {
    const s = section("References");
    const list = el("ul", "mt-1 space-y-1 text-[9.5pt]");
    data.references.forEach((r) =>
      list.appendChild(el("li", "text-gray-800", `• ${r}`))
    );
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
