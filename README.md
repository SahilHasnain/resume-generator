# Beautiful Resume Generator

This is a responsive, modern resume generator that creates a professional-looking resume based on the data provided. The design is inspired by academic CV formats while maintaining a clean, modern look.

## Features

- **Responsive Design**: Looks great on all screen sizes
- **PDF Export**: Generate a PDF version of your resume with one click
- **Print Functionality**: Print your resume directly from the browser
- **Single Page Layout**: Optimized to fit all content on a single page when printed
- **Modern Styling**: Clean, professional design using Tailwind CSS
- **Customizable**: Easily update your information by editing the data.js file

## How to Use

1. **Edit Your Information**:

   - Open `data.js` and replace the example data with your own information
   - All sections are customizable including education, experience, projects, skills, etc.

2. **View Your Resume**:

   - Open `index.html` in any modern web browser
   - The resume will be displayed with your updated information

3. **Export to PDF**:

   - Click the "Download PDF" button at the top right of the page
   - The PDF will be generated with the name "[Your Name]\_Resume.pdf"

4. **Print Your Resume**:
   - Click the "Print" button at the top right of the page
   - Select your printer settings and print

## Structure

- `index.html`: The main HTML structure for the resume
- `data.js`: Contains all the resume data in a structured format
- `script.js`: JavaScript to populate the resume and handle PDF generation

## Technologies Used

- HTML5
- Tailwind CSS for styling
- JavaScript (vanilla)
- html2pdf.js for PDF generation
- Font Awesome for icons

## Customization Tips

1. **Color Scheme**:

   - The current design uses a blue color scheme
   - You can modify the colors in the HTML file by changing the Tailwind CSS classes

2. **Layout Adjustments**:

   - The layout is optimized for a single page but you can adjust spacing as needed
   - The script includes an automatic font size adjustment function if content exceeds the page

3. **Add/Remove Sections**:
   - Easily add or remove sections by editing the HTML structure
   - Make corresponding changes to the `data.js` file

## License

This project is open source and available for personal use.

## Credits

Created by [Your Name]
