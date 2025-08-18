// Render a recruiter-focused one-page A4 resume from data.js
// Assumes window.data exists

(function () {
  if (typeof window === "undefined") return;
  const state = {
    scale: 1,
  };

  const mmToPx = (mm) => (mm * 96) / 25.4; // 96dpi reference
  const A4 = { w: mmToPx(210), h: mmToPx(297) };

  // Access global resume data whether declared with const/let (lexical) or var (window)
  function getData() {
    try {
      // eslint-disable-next-line no-undef
      return data;
    } catch (_) {
      return typeof window !== "undefined" && window.data ? window.data : {};
    }
  }

  function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function")
        el[k.toLowerCase()] = v;
      else el.setAttribute(k, v);
    }
    for (const c of Array.isArray(children) ? children : [children]) {
      if (c == null) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }

  function section(title, contentEls) {
    return h("section", { class: "mb-4 last:mb-0" }, [
      h(
        "h3",
        {
          class:
            "text-[11.5pt] font-semibold tracking-wide text-slate-700 uppercase",
        },
        title
      ),
      h("div", { class: "mt-1.5 space-y-1.5" }, contentEls),
    ]);
  }

  function pillList(items) {
    return h(
      "div",
      { class: "flex flex-wrap gap-1.5" },
      items.map((it) =>
        h(
          "span",
          {
            class:
              "px-2 py-0.5 text-[10pt] rounded-full bg-slate-100 text-slate-700",
          },
          it
        )
      )
    );
  }

  function barList(items, max = 8) {
    return h(
      "div",
      { class: "grid grid-cols-2 gap-2" },
      items.slice(0, max).map((s) =>
        h("div", { class: "flex items-center gap-2" }, [
          h("span", { class: "text-[10pt] text-slate-700 flex-1" }, s.label),
          h(
            "div",
            { class: "h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden" },
            [
              h("div", {
                class: "h-full bg-brand-500",
                style: `width:${Math.round((s.level || 0) * 100)}%`,
              }),
            ]
          ),
        ])
      )
    );
  }

  function bulletList(items, max = 6) {
    return h(
      "ul",
      { class: "list-disc pl-5 space-y-1 text-[10.5pt] text-slate-800" },
      items.slice(0, max).map((t) => h("li", {}, t))
    );
  }

  function metaLine(text) {
    return h("div", { class: "text-[10.5pt] text-slate-600" }, text);
  }

  function makeHeader(d) {
    const left = h("div", { class: "flex-1" }, [
      h("h1", { class: "text-2xl font-bold text-slate-900" }, d.name || ""),
      h("p", { class: "text-[11.5pt] text-slate-700 mt-0.5" }, d.tagline || ""),
    ]);
    const right = h(
      "div",
      { class: "text-right text-[10.5pt] text-slate-700" },
      [
        d.email ? h("div", {}, d.email) : null,
        d.phone ? h("div", {}, d.phone) : null,
        d.location ? h("div", {}, d.location) : null,
        d.linkedin?.url
          ? h(
              "a",
              {
                href: d.linkedin.url,
                class: "text-brand-700 hover:underline",
                target: "_blank",
                rel: "noreferrer",
              },
              d.linkedin.text || d.linkedin.url
            )
          : null,
      ]
    );
    return h(
      "header",
      { class: "flex items-start gap-4 pb-3 border-b border-slate-200" },
      [left, right]
    );
  }

  function twoColLayout(leftEls, rightEls) {
    return h("div", { class: "grid grid-cols-5 gap-6 mt-4" }, [
      h("div", { class: "col-span-3 space-y-3" }, leftEls),
      h("div", { class: "col-span-2 space-y-3" }, rightEls),
    ]);
  }

  function renderResume(d) {
    const root = document.getElementById("resume-root");
    if (!root) return;
    root.innerHTML = "";

    // Provide safe defaults so page is never empty
    const fallback = {
      name: "Your Name",
      tagline: "Role | Value Proposition",
      email: "email@example.com",
      phone: "",
      location: "",
      linkedin: null,
      profile:
        "Motivated professional with a focus on outcomes and clear communication.",
      education: [],
      projects: [],
      coursework: [],
      teaching: [],
      skills: [],
      research: [],
      achievements: [],
      positions: [],
      certifications: [],
      languages: [],
    };
    d = Object.assign({}, fallback, d || {});

    const header = makeHeader(d);

    // Left: Profile, Education, Projects, Coursework (trimmed)
    const left = [];
    if (d.profile) {
      left.push(
        section("Profile", [
          h(
            "p",
            { class: "text-[10.75pt] leading-snug text-slate-800" },
            d.profile
          ),
        ])
      );
    }
    if (Array.isArray(d.education) && d.education.length) {
      left.push(
        section(
          "Education",
          d.education.map((e) =>
            h("div", { class: "text-[10.75pt]" }, [
              h("div", { class: "font-medium text-slate-900" }, e.title),
              metaLine(e.meta),
            ])
          )
        )
      );
    }
    if (Array.isArray(d.projects) && d.projects.length) {
      left.push(section("Projects", [bulletList(d.projects, 6)]));
    }
    if (Array.isArray(d.coursework) && d.coursework.length) {
      left.push(section("Coursework", [pillList(d.coursework.slice(0, 14))]));
    }

    // Right: Teaching, Skills, Research, Achievements, Positions, Certifications, Languages
    const right = [];
    if (Array.isArray(d.teaching) && d.teaching.length) {
      right.push(section("Teaching Interests", [bulletList(d.teaching, 6)]));
    }
    if (Array.isArray(d.skills) && d.skills.length) {
      right.push(section("Skills", [barList(d.skills, 8)]));
    }
    if (Array.isArray(d.research) && d.research.length) {
      right.push(
        section("Research Interests", [pillList(d.research.slice(0, 10))])
      );
    }
    if (Array.isArray(d.achievements) && d.achievements.length) {
      right.push(section("Achievements", [bulletList(d.achievements, 6)]));
    }
    if (Array.isArray(d.positions) && d.positions.length) {
      right.push(section("Positions", [bulletList(d.positions, 5)]));
    }
    if (Array.isArray(d.certifications) && d.certifications.length) {
      right.push(section("Certifications", [bulletList(d.certifications, 5)]));
    }
    if (Array.isArray(d.languages) && d.languages.length) {
      right.push(section("Languages", [pillList(d.languages.slice(0, 6))]));
    }

    const layout = twoColLayout(left, right);
    root.appendChild(header);
    root.appendChild(layout);
  }

  function autoFit() {
    // Scale #scale-wrap so that #resume-page content height fits within 297mm
    const page = document.getElementById("resume-page");
    const wrap = document.getElementById("scale-wrap");
    if (!page || !wrap) return;

    // Run after layout stabilizes
    requestAnimationFrame(() => {
      // Reset scale to measure natural height
      wrap.style.transform = "scale(1)";
      const contentHeight = wrap.getBoundingClientRect().height;
      if (!contentHeight || !isFinite(contentHeight)) return; // avoid divide-by-zero
      const pageHeight = A4.h; // in px
      const scale = Math.min(1, pageHeight / contentHeight);
      state.scale = scale;
      wrap.style.transform = `scale(${scale})`;
      // Adjust page min-height to exactly A4 after scaling so background fills
      page.style.height = `${A4.h}px`;
    });
  }

  function downloadPDF(filename = "resume.pdf") {
    const page = document.getElementById("resume-page");
    if (!page) return;
    const opt = {
      margin: 0,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };
    html2pdf().from(page).set(opt).save();
  }

  function hookActions() {
    const fitBtn = document.getElementById("fitBtn");
    const printBtn = document.getElementById("printBtn");
    const dlBtn = document.getElementById("downloadBtn");
    fitBtn?.addEventListener("click", autoFit);
    printBtn?.addEventListener("click", () => {
      autoFit();
      setTimeout(() => window.print(), 200);
    });
    dlBtn?.addEventListener("click", () => {
      autoFit();
      setTimeout(
        () =>
          downloadPDF(
            `${(getData()?.name || "resume")
              .toLowerCase()
              .replace(/\s+/g, "_")}.pdf`
          ),
        200
      );
    });
    window.addEventListener("resize", () => {
      // re-fit on resize to keep A4 within viewport
      autoFit();
    });
  }

  function qualityPass() {
    // Content hygiene: remove placeholders and empty sections post-render
    const root = document.getElementById("resume-root");
    if (!root) return;
    const placeholderRegex = /\[Placeholder:[^\]]*\]/i;
    // Remove leaf items only (avoid wiping containers)
    root.querySelectorAll("li").forEach((el) => {
      const t = (el.textContent || "").trim();
      if (t && placeholderRegex.test(t)) el.remove();
    });
    root.querySelectorAll("span").forEach((el) => {
      const t = (el.textContent || "").trim();
      if (t && el.children.length === 0 && placeholderRegex.test(t))
        el.remove();
    });
    // Remove now-empty lists/sections
    root.querySelectorAll("ul").forEach((el) => {
      if (el.children.length === 0) el.remove();
    });
    root.querySelectorAll("section").forEach((sec) => {
      const content = sec.querySelector("div:nth-child(2)");
      if (content && content.children.length === 0) sec.remove();
    });
  }

  function init() {
    // Render
    renderResume(getData());
    // Clean placeholders
    qualityPass();
    // Fit to A4
    // Delay fit to ensure fonts/styles applied
    requestAnimationFrame(() => autoFit());
    // Actions
    hookActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
