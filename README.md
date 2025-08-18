# Resume (HTML + Tailwind + JS)

This folder now includes a web-based version of the resume that mirrors the PDF layout with a two-column design, soft sidebar, and print-to-PDF support.

## Files

- index.html — Tailwind-based layout and structure
- script.js — All resume data and dynamic rendering

## How to use

1. Double-click `index.html` to open in your browser.
2. Click the “Download PDF” button for a clean PDF (no browser date/URL header or footer). This uses html2pdf.

   - Paper: A4
   - Margins: Built-in (button export ignores browser headers)
   - Background graphics: Enabled by default

   Fallback: If you prefer the browser print dialog (Ctrl/Cmd+P), set

   - Destination: Save as PDF
   - Paper: A4
   - Margins: None
   - Disable Headers and Footers (so date/URL won’t appear)
   - Enable Background graphics

## Customize content

Edit `script.js` and change the `data` object:

- name, tagline, email, phone, location, linkedin
- profile, teaching, skills (levels 0–1), languages, research
- education, coursework, projects, achievements, positions, certifications, references

## Customize styles

- Colors are set in the HTML with Tailwind classes. Primary accent is `#0E3A8A`.
- Sidebar background uses `#E6F0FF`. Change those hex values directly in `index.html`.

## Optional: run a local server

This isn’t required, but can help with consistent printing.

```bash
# Option 1: Python 3
python -m http.server 5500
# then open http://localhost:5500/index.html
```

## Notes

- Tailwind is loaded via CDN, so there is no build step.
- Print settings and @page ensure good A4 output with color-safe backgrounds.
