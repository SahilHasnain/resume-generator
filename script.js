// Populate resume data when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  populateResumeData();
  setupEventListeners();
});

// Populate all resume sections with data from data.js
function populateResumeData() {
  // Populate header information
  document.getElementById("name").textContent = resumeData.name;
  document.getElementById("roll").textContent = `Roll No.: ${resumeData.roll}`;
  document.getElementById("course").textContent = resumeData.course;
  document.getElementById("department").textContent = resumeData.department;
  document.getElementById("institution").textContent = resumeData.institution;

  // Populate contact information
  document.getElementById("phone").textContent = `+91-${resumeData.phone}`;

  const email1 = document.getElementById("email1");
  email1.textContent = resumeData.emails.personal;
  email1.href = `mailto:${resumeData.emails.personal}`;

  const email2 = document.getElementById("email2");
  email2.textContent = resumeData.emails.academic;
  email2.href = `mailto:${resumeData.emails.academic}`;

  const linkedin = document.getElementById("linkedin");
  linkedin.textContent = resumeData.name;
  linkedin.href = `https://linkedin.com/in/${resumeData.linkedin}`;

  // Populate Education section
  const educationContainer = document.getElementById("education");
  resumeData.education.forEach((edu) => {
    const eduElement = document.createElement("div");
    eduElement.classList.add("mb-2");
    eduElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-medium">${edu.institution}</h3>
                    <p class="text-gray-600 text-xs italic">${edu.degree}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-medium">${edu.score}</p>
                    <p class="text-gray-600 text-xs">${edu.duration}</p>
                </div>
            </div>
        `;
    educationContainer.appendChild(eduElement);
  });

  // Populate Experience section
  const experienceContainer = document.getElementById("experience");
  resumeData.experience.forEach((exp) => {
    const expElement = document.createElement("div");
    expElement.classList.add("mb-2");

    let pointsHTML = "";
    if (exp.points && exp.points.length > 0) {
      pointsHTML = `
                <ul class="bullet-list mt-1">
                    ${exp.points.map((point) => `<li>${point}</li>`).join("")}
                </ul>
            `;
    }

    expElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-medium">${exp.title}</h3>
                    <p class="text-gray-600 text-xs italic">${exp.role}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-medium">${exp.location}</p>
                    <p class="text-gray-600 text-xs">${exp.duration}</p>
                </div>
            </div>
            ${pointsHTML}
        `;
    experienceContainer.appendChild(expElement);
  });

  // Populate Projects section
  const projectsContainer = document.getElementById("projects");
  resumeData.projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("mb-2");

    let pointsHTML = "";
    if (project.points && project.points.length > 0) {
      pointsHTML = `
                <ul class="bullet-list mt-1">
                    ${project.points
                      .map((point) => `<li>${point}</li>`)
                      .join("")}
                </ul>
            `;
    }

    projectElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-medium">${project.title}</h3>
                    <p class="text-gray-600 text-xs italic">${project.description}</p>
                </div>
                <div class="text-right">
                    <p class="text-gray-600 text-xs">${project.year}</p>
                </div>
            </div>
            ${pointsHTML}
        `;
    projectsContainer.appendChild(projectElement);
  });

  // Populate Skills section
  const skillsContainer = document.getElementById("skills");

  const createSkillItem = (title, items) => {
    const element = document.createElement("div");
    element.innerHTML = `
            <p><span class="font-medium">${title}:</span> ${items.join(
      ", "
    )}</p>
        `;
    return element;
  };

  skillsContainer.appendChild(
    createSkillItem("Interests", resumeData.skills.interests)
  );
  skillsContainer.appendChild(
    createSkillItem("Technical Skills", resumeData.skills.technical)
  );
  skillsContainer.appendChild(
    createSkillItem("Communication Languages", resumeData.skills.languages)
  );
  skillsContainer.appendChild(
    createSkillItem("Hobbies", resumeData.skills.hobbies)
  );

  // Populate Coursework section
  const courseworkContainer = document.getElementById("coursework");
  const courseworkElement = document.createElement("p");
  courseworkElement.textContent = resumeData.coursework.join(", ");
  courseworkElement.classList.add("text-sm");
  courseworkContainer.appendChild(courseworkElement);

  // Populate Positions section
  const positionsContainer = document.getElementById("positions");
  resumeData.positions.forEach((position) => {
    const positionElement = document.createElement("div");
    positionElement.classList.add("flex", "justify-between", "items-start");

    positionElement.innerHTML = `
            <div>
                <p class="font-medium">${position.role}</p>
                <p class="text-gray-600 text-xs">${position.institution}</p>
            </div>
            <p class="text-gray-600 text-xs">${position.duration}</p>
        `;

    positionsContainer.appendChild(positionElement);
  });

  // Populate Achievements section
  const achievementsContainer = document.getElementById("achievements");
  resumeData.achievements.forEach((achievement) => {
    const achievementElement = document.createElement("div");
    achievementElement.classList.add("flex", "justify-between", "items-start");

    achievementElement.innerHTML = `
            <p class="font-medium">${achievement.title}</p>
            <p class="text-gray-600 text-xs">${achievement.description}</p>
        `;

    achievementsContainer.appendChild(achievementElement);
  });
}

// Set up event listeners for buttons
function setupEventListeners() {
  // Download PDF button
  document.getElementById("downloadBtn").addEventListener("click", function () {
    const resumeElement = document.getElementById("resume");

    // Configure html2pdf options
    const options = {
      margin: [0, 0, 0, 0],
      filename: `${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF
    html2pdf().set(options).from(resumeElement).save();
  });

  // Print button
  document.getElementById("printBtn").addEventListener("click", function () {
    window.print();
  });
}

// Function to adjust font sizes if content is too large for single page
function adjustFontSizesIfNeeded() {
  const resumeContainer = document.getElementById("resume");
  const containerHeight = resumeContainer.offsetHeight;

  // Check if the content is taller than the container (11 inches in pixels)
  if (containerHeight > 11 * 96) {
    // 96 DPI is typical for screen
    // Get all text elements
    const textElements = resumeContainer.querySelectorAll("p, h1, h2, h3, li");

    // Reduce their font size slightly
    textElements.forEach((el) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const newSize = parseFloat(currentSize) * 0.95;
      el.style.fontSize = `${newSize}px`;
    });

    // Check again after a slight delay for the DOM to update
    setTimeout(adjustFontSizesIfNeeded, 100);
  }
}

// Call this function after populating the resume
window.addEventListener("load", function () {
  setTimeout(adjustFontSizesIfNeeded, 500);
});
