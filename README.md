# Resume Generator (One-page A4)

This is a single-page A4 resume built with Tailwind CSS and vanilla JS. It renders content from `data.js` and supports PDF export via `html2pdf.js` or printing from the browser.

## How it works

- Edit your resume content in `data.js` only.
- Open `index.html` in a browser.
- Use the top-right buttons to download a PDF or print.

The layout auto-scales to ensure everything fits in one A4 page. Keep sections concise for best results.

## Customize

- Colors and spacing are controlled by Tailwind classes in `index.html` and `script.js`.
- Fonts: Inter is loaded from Google Fonts. You can change it in the `<head>`.

## Notes for quality

- Keep bullets short and impactful; lead with results and concrete details.
- Prefer fewer, stronger sections over many placeholders.
- Verify the generated PDF on different PDF viewers if sharing widely.
