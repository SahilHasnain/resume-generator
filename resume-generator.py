from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate,
    Paragraph, Spacer, FrameBreak, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

# ------------------------------
# OUTPUT PDF FILE NAME
# ------------------------------
output_path = "Md_Taj_Hasan_Resume_NITW_Template_Styled_Fixed.pdf"

# ------------------------------
# PAGE & MARGIN SETTINGS
# ------------------------------
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_L, MARGIN_R, MARGIN_T, MARGIN_B = 16*mm, 16*mm, 16*mm, 16*mm

# Define two-column layout
SIDEBAR_W = 62*mm
MAIN_W = PAGE_WIDTH - MARGIN_L - MARGIN_R - SIDEBAR_W - 8*mm  # 8mm gap

# ------------------------------
# TEXT STYLES
# ------------------------------
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="SectionX", fontSize=11.5, leading=14,
                          spaceBefore=8, spaceAfter=4,
                          textColor=colors.HexColor("#0E3A8A")))
styles.add(ParagraphStyle(name="BodyX", fontSize=9.6, leading=12.5))
styles.add(ParagraphStyle(name="BulletX", fontSize=9.6, leading=12.5, leftIndent=8))
styles.add(ParagraphStyle(name="EduHeaderX", fontSize=10.5, leading=13, textColor=colors.black))
styles.add(ParagraphStyle(name="EduMetaX", fontSize=9.2, leading=12,
                          textColor=colors.HexColor("#374151")))

# ------------------------------
# HEADER FUNCTION (drawn on every page)
# ------------------------------
def draw_header_footer(canvas, doc):
    canvas.saveState()
    # Header background bar
    y = PAGE_HEIGHT - MARGIN_T + 6*mm
    canvas.setFillColor(colors.HexColor("#E5E7EB"))
    canvas.rect(MARGIN_L, y, PAGE_WIDTH - MARGIN_L - MARGIN_R, 10, stroke=0, fill=1)

    # Candidate Name
    canvas.setFillColor(colors.HexColor("#0E3A8A"))
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(MARGIN_L + 2, PAGE_HEIGHT - MARGIN_T + 2, "Md Taj Hasan")

    # Contact info with clickable LinkedIn text (no full URL shown)
    canvas.setFillColor(colors.black)
    canvas.setFont("Helvetica", 9)
    contact_prefix = (
        "Email: mt24mac1r15@student.nitw.ac.in  |  "
        "Phone: +91-9572242235  |  "
        "Location: Giridih, Jharkhand 815312  |  "
    )
    start_x = MARGIN_L + 2
    baseline_y = PAGE_HEIGHT - MARGIN_T - 10
    canvas.drawString(start_x, baseline_y, contact_prefix)

    link_text = "LinkedIn: Md Taj Hasan"
    link_url = "https://linkedin.com/in/md-taj-hasan-90ab64341"
    link_x = start_x + canvas.stringWidth(contact_prefix, "Helvetica", 9)
    # Draw the clickable text in a distinct color
    canvas.setFillColor(colors.HexColor("#0E3A8A"))
    canvas.drawString(link_x, baseline_y, link_text)
    # Optionally underline to indicate link
    underline_y = baseline_y - 1
    link_w = canvas.stringWidth(link_text, "Helvetica", 9)
    canvas.setStrokeColor(colors.HexColor("#0E3A8A"))
    canvas.setLineWidth(0.5)
    canvas.line(link_x, underline_y, link_x + link_w, underline_y)
    # Add link annotation over the text area
    canvas.linkURL(link_url, (link_x, baseline_y - 2, link_x + link_w, baseline_y + 9), relative=0)
    # Reset fill color
    canvas.setFillColor(colors.black)

    # Divider line
    canvas.setStrokeColor(colors.HexColor("#93C5FD"))
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN_L, PAGE_HEIGHT - MARGIN_T - 14,
                PAGE_WIDTH - MARGIN_R, PAGE_HEIGHT - MARGIN_T - 14)

    canvas.restoreState()

# ------------------------------
# DEFINE LAYOUT FRAMES
# ------------------------------
frame_sidebar = Frame(MARGIN_L, MARGIN_B, SIDEBAR_W,
                      PAGE_HEIGHT - MARGIN_T - MARGIN_B - 18*mm,
                      showBoundary=0, leftPadding=0, rightPadding=8,
                      topPadding=6, bottomPadding=0)

frame_main = Frame(MARGIN_L + SIDEBAR_W + 8*mm, MARGIN_B, MAIN_W,
                   PAGE_HEIGHT - MARGIN_T - MARGIN_B - 18*mm,
                   showBoundary=0, leftPadding=0, rightPadding=0,
                   topPadding=6, bottomPadding=0)

doc = BaseDocTemplate(output_path, pagesize=A4,
                      leftMargin=MARGIN_L, rightMargin=MARGIN_R,
                      topMargin=MARGIN_T, bottomMargin=MARGIN_B)

template = PageTemplate(id="two-col", frames=[frame_sidebar, frame_main],
                        onPage=draw_header_footer)
doc.addPageTemplates([template])

story = []

# ------------------------------
# SIDEBAR CONTENT
# ------------------------------
story.append(Paragraph("Profile", styles["SectionX"]))
story.append(Paragraph(
    "Motivated postgraduate student in <b>Applied Mathematics</b> with a passion for "
    "teaching and problem solving. I focus on building strong fundamentals and connecting "
    "math with real-life use-cases to help learners think clearly and independently.",
    styles["BodyX"]
))
story.append(Spacer(1, 4))

story.append(Paragraph("Teaching Interests", styles["SectionX"]))
for item in ["Matrices & Determinants", "Limit, Continuity & Differentiability",
             "Differential & Integral Calculus"]:
    story.append(Paragraph("• " + item, styles["BulletX"]))

story.append(Paragraph("Skills", styles["SectionX"]))
for item in ["Python", "Mathematical Problem Solving", "Proof Writing",
             "[Placeholder: LaTeX / MATLAB]"]:
    story.append(Paragraph("• " + item, styles["BulletX"]))

story.append(Paragraph("Languages", styles["SectionX"]))
for item in ["English", "Hindi", "Urdu"]:
    story.append(Paragraph("• " + item, styles["BulletX"]))

story.append(Paragraph("Research Interests", styles["SectionX"]))
for item in ["Numerical Analysis", "Mathematical Modelling", "Optimization",
             "[Placeholder: Scientific Computing]"]:
    story.append(Paragraph("• " + item, styles["BulletX"]))

story.append(FrameBreak())

# ------------------------------
# MAIN CONTENT
# ------------------------------
# Education
story.append(Paragraph("Education", styles["SectionX"]))
story.append(Paragraph("<b>M.Sc. in Applied Mathematics</b>", styles["EduHeaderX"]))
story.append(Paragraph("NIT Warangal | 2025 – Present | CGPA: 7.30 (as of May 2025)",
                       styles["EduMetaX"]))
story.append(Spacer(1, 2))

story.append(Paragraph("<b>B.Sc. in Mathematics (Hons.)</b>", styles["EduHeaderX"]))
story.append(Paragraph("Vinoba Bhave University, Hazaribagh | 2019 – 2022 | CGPA: 6.51",
                       styles["EduMetaX"]))
story.append(Spacer(1, 2))

story.append(Paragraph("<b>Intermediate (Class 12th)</b>", styles["EduHeaderX"]))
story.append(Paragraph("Giridih (+2) High School, JAC | 2019 | 62.2%",
                       styles["EduMetaX"]))
story.append(Spacer(1, 2))

story.append(Paragraph("<b>Matriculation (Class 10th)</b>", styles["EduHeaderX"]))
story.append(Paragraph("Upgraded High School, Charghara, JAC | 2017 | 66.4%",
                       styles["EduMetaX"]))
story.append(Spacer(1, 6))

# Relevant Coursework (2-column fixed table)
story.append(Paragraph("Relevant Coursework", styles["SectionX"]))
course_list = [
    "Advanced Linear Algebra", "Complex Analysis", "Ordinary Differential Equations",
    "Partial Differential Equations", "Real Analysis", "Probability & Statistics",
    "Topology", "Numerical Analysis", "Computer Programming in C++",
    "Numerical Computing Lab", "C++ Lab", "Probability & Statistics with R Lab",
    "Symbolic Computing Lab"
]
rows = []
for i in range(0, len(course_list), 2):
    rows.append([course_list[i], course_list[i+1] if i+1 < len(course_list) else ""])

tbl = Table(rows, colWidths=[MAIN_W/2.0]*2, hAlign="LEFT")
tbl.setStyle(TableStyle([
    ("FONT", (0,0), (-1,-1), "Helvetica", 9.2),
    ("INNERGRID", (0,0), (-1,-1), 0.25, colors.HexColor("#D1D5DB")),
    ("BOX", (0,0), (-1,-1), 0.25, colors.HexColor("#9CA3AF")),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("LEFTPADDING", (0,0), (-1,-1), 4),
    ("RIGHTPADDING", (0,0), (-1,-1), 4),
    ("TOPPADDING", (0,0), (-1,-1), 3),
    ("BOTTOMPADDING", (0,0), (-1,-1), 3),
]))
story.append(tbl)
story.append(Spacer(1, 6))

# Projects
story.append(Paragraph("Projects", styles["SectionX"]))
projects = [
    "<b>Solution of Probability and Statistics using R</b> — Exploratory data analysis and simulation tasks in R; applied statistical tests and visualizations.",
    "<b>[Placeholder: Numerical Analysis with Python]</b> — Implemented root-finding, interpolation and ODE solvers using Python; analyzed error and stability.",
]
for p in projects:
    story.append(Paragraph("• " + p, styles["BodyX"]))
story.append(Spacer(1, 4))

# Achievements
story.append(Paragraph("Achievements", styles["SectionX"]))
for a in ["IIT-JAM Mathematics (2024): All India Rank 712", "JEE Main (2019): Qualified"]:
    story.append(Paragraph("• " + a, styles["BodyX"]))

# Positions (placeholder)
story.append(Paragraph("Positions of Responsibility", styles["SectionX"]))
for por in [
    "[Placeholder: Class Representative / Math Club Volunteer — NITW, 2025–Present]",
    "[Placeholder: Peer Tutor — Assisted juniors with Calculus & Linear Algebra]"
]:
    story.append(Paragraph("• " + por, styles["BodyX"]))

# Certifications (placeholder)
story.append(Paragraph("Certifications & Workshops", styles["SectionX"]))
for c in [
    "[Placeholder: NPTEL — Probability & Statistics / Linear Algebra (Year)]",
    "[Placeholder: Workshop — LaTeX for Scientific Writing / MATLAB for Engineers]"
]:
    story.append(Paragraph("• " + c, styles["BodyX"]))

# References (placeholder)
story.append(Paragraph("References", styles["SectionX"]))
for r in [
    "[Placeholder: Dr. <Advisor Name>, Assistant Professor, Dept. of Mathematics, NIT Warangal — advisor@nitw.ac.in]",
    "Available upon request."
]:
    story.append(Paragraph("• " + r, styles["BodyX"]))

# ------------------------------
# BUILD PDF
# ------------------------------
doc.build(story)

print(f"✅ Resume generated: {output_path}")
