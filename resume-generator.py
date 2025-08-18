from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate,
    Paragraph, Spacer, FrameBreak, Table, TableStyle, Flowable
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
SIDEBAR_W = 64*mm
MAIN_W = PAGE_WIDTH - MARGIN_L - MARGIN_R - SIDEBAR_W - 8*mm  # 8mm gap

# ------------------------------
# COLOR PALETTE
# ------------------------------
ACCENT = colors.HexColor("#0E3A8A")       # deep blue
ACCENT_LIGHT = colors.HexColor("#E6F0FF") # pale blue background
MUTED = colors.HexColor("#374151")        # gray-700
HAIRLINE = colors.HexColor("#CBD5E1")     # slate-300
BORDER = colors.HexColor("#94A3B8")       # slate-400

# ------------------------------
# TEXT STYLES
# ------------------------------
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="SectionX", fontSize=12, leading=14.5,
                          spaceBefore=10, spaceAfter=5,
                          textColor=ACCENT))
styles.add(ParagraphStyle(name="BodyX", fontSize=9.6, leading=12.6, textColor=colors.black))
styles.add(ParagraphStyle(name="BulletX", fontSize=9.6, leading=12.6, leftIndent=8, textColor=colors.black))
styles.add(ParagraphStyle(name="EduHeaderX", fontSize=10.8, leading=13.4, textColor=colors.black))
styles.add(ParagraphStyle(name="EduMetaX", fontSize=9.2, leading=12.2,
                          textColor=MUTED))
styles.add(ParagraphStyle(name="TinyMuted", fontSize=8.6, leading=11, textColor=MUTED))


# ------------------------------
# SIMPLE DECORATIVE FLOWABLES
# ------------------------------
class Hairline(Flowable):
    """A thin horizontal rule to separate sections."""
    def __init__(self, width=MAIN_W, color=HAIRLINE, thickness=0.5, vspace=4):
        super().__init__()
        self.width = width
        self.color = color
        self.thickness = thickness
        self.vspace = vspace

    def wrap(self, availWidth, availHeight):
        return (self.width, self.vspace)

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, self.vspace/2.0, self.width, self.vspace/2.0)


class SkillBar(Flowable):
    """A simple labeled skill bar."""
    def __init__(self, label, level, width=SIDEBAR_W-10, height=6,
                 bar_color=ACCENT, bg_color=colors.HexColor("#E5E7EB")):
        super().__init__()
        self.label = label
        self.level = max(0.0, min(1.0, level))
        self.width = width
        self.height = height
        self.bar_color = bar_color
        self.bg_color = bg_color

    def wrap(self, availWidth, availHeight):
        # Include label height above the bar
        return (self.width, self.height + 10)

    def draw(self):
        c = self.canv
        # Label
        c.setFont("Helvetica", 8.8)
        c.setFillColor(colors.black)
        c.drawString(0, self.height + 2, self.label)
        # Background bar
        c.setFillColor(self.bg_color)
        c.rect(0, 0, self.width, self.height, stroke=0, fill=1)
        # Filled bar
        fill_w = self.width * self.level
        c.setFillColor(self.bar_color)
        c.rect(0, 0, fill_w, self.height, stroke=0, fill=1)

# ------------------------------
# HEADER FUNCTION (drawn on every page)
# ------------------------------
def draw_header_footer(canvas, doc):
    canvas.saveState()

    # Sidebar background
    sidebar_x = MARGIN_L
    sidebar_y = MARGIN_B
    sidebar_h = PAGE_HEIGHT - MARGIN_T - MARGIN_B - 18*mm
    canvas.setFillColor(ACCENT_LIGHT)
    canvas.rect(sidebar_x, sidebar_y, SIDEBAR_W, sidebar_h, stroke=0, fill=1)

    # Header bar
    header_y = PAGE_HEIGHT - MARGIN_T + 6*mm
    canvas.setFillColor(ACCENT)
    canvas.rect(MARGIN_L, header_y, PAGE_WIDTH - MARGIN_L - MARGIN_R, 12, stroke=0, fill=1)

    # Candidate Name & Tagline
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 18)
    canvas.drawString(MARGIN_L + 4, PAGE_HEIGHT - MARGIN_T + 2, "Md Taj Hasan")
    canvas.setFont("Helvetica", 9)
    canvas.drawString(MARGIN_L + 4, PAGE_HEIGHT - MARGIN_T - 9, "M.Sc. Applied Mathematics | Aspiring Educator & Problem Solver")

    # Contact info row (clickable)
    canvas.setFillColor(colors.black)
    canvas.setFont("Helvetica", 9)
    start_x = MARGIN_L + 4
    base_y = PAGE_HEIGHT - MARGIN_T - 22
    # Email
    email_text = "✉ mt24mac1r15@student.nitw.ac.in  •  "
    canvas.drawString(start_x, base_y, email_text)
    email_w = canvas.stringWidth(email_text, "Helvetica", 9)
    canvas.linkURL("mailto:mt24mac1r15@student.nitw.ac.in", (start_x, base_y - 2, start_x + email_w, base_y + 9), relative=0)
    # Phone
    phone_text = "+91-9572242235  •  "
    phone_x = start_x + email_w
    canvas.drawString(phone_x, base_y, phone_text)
    phone_w = canvas.stringWidth(phone_text, "Helvetica", 9)
    canvas.linkURL("tel:+919572242235", (phone_x, base_y - 2, phone_x + phone_w, base_y + 9), relative=0)
    # Location (not clickable)
    loc_text = "Giridih, Jharkhand 815312  •  "
    loc_x = phone_x + phone_w
    canvas.drawString(loc_x, base_y, loc_text)
    loc_w = canvas.stringWidth(loc_text, "Helvetica", 9)
    # LinkedIn clickable label (short)
    link_text = "LinkedIn: Md Taj Hasan"
    link_x = loc_x + loc_w
    canvas.setFillColor(ACCENT)
    canvas.drawString(link_x, base_y, link_text)
    link_w = canvas.stringWidth(link_text, "Helvetica", 9)
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(0.5)
    canvas.line(link_x, base_y - 1, link_x + link_w, base_y - 1)
    canvas.linkURL("https://linkedin.com/in/md-taj-hasan-90ab64341", (link_x, base_y - 2, link_x + link_w, base_y + 9), relative=0)

    # Divider line under header
    canvas.setStrokeColor(HAIRLINE)
    canvas.setLineWidth(0.7)
    canvas.line(MARGIN_L, PAGE_HEIGHT - MARGIN_T - 26, PAGE_WIDTH - MARGIN_R, PAGE_HEIGHT - MARGIN_T - 26)

    # Footer page number
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(MUTED)
    page_label = f"Page {doc.page}"
    tw = canvas.stringWidth(page_label, "Helvetica", 8.5)
    canvas.drawString((PAGE_WIDTH - tw) / 2.0, MARGIN_B - 10, page_label)

    canvas.restoreState()

# ------------------------------
# DEFINE LAYOUT FRAMES
# ------------------------------
frame_sidebar = Frame(MARGIN_L, MARGIN_B, SIDEBAR_W,
                      PAGE_HEIGHT - MARGIN_T - MARGIN_B - 18*mm,
                      showBoundary=0, leftPadding=6, rightPadding=8,
                      topPadding=8, bottomPadding=0)

frame_main = Frame(MARGIN_L + SIDEBAR_W + 8*mm, MARGIN_B, MAIN_W,
                   PAGE_HEIGHT - MARGIN_T - MARGIN_B - 18*mm,
                   showBoundary=0, leftPadding=2, rightPadding=2,
                   topPadding=8, bottomPadding=0)

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
# Visual skill bars (0..1 levels)
skill_levels = {
    "Python": 0.7,
    "Mathematical Problem Solving": 0.9,
    "Proof Writing": 0.75,
    "LaTeX / MATLAB (placeholder)": 0.6,
}
for k, v in skill_levels.items():
    story.append(SkillBar(k, v))
story.append(Spacer(1, 2))

story.append(Paragraph("Languages", styles["SectionX"]))
for item in ["English", "Hindi", "Urdu"]:
    story.append(Paragraph("• " + item, styles["BulletX"]))

story.append(Paragraph("Research Interests", styles["SectionX"]))
for item in ["Numerical Analysis", "Mathematical Modelling", "Optimization",
             "[Placeholder: Scientific Computing]"]:
    story.append(Paragraph("• " + item, styles["BulletX"]))
story.append(Spacer(1, 2))

# subtle divider before main column
story.append(Hairline(width=SIDEBAR_W-6))

story.append(FrameBreak())

# ------------------------------
# MAIN CONTENT
# ------------------------------
# Education
story.append(Paragraph("Education", styles["SectionX"]))
story.append(Paragraph("<b>M.Sc. in Applied Mathematics</b>", styles["EduHeaderX"]))
story.append(Paragraph("NIT Warangal | 2025 – Present | CGPA: 7.30 (as of May 2025)",
                       styles["EduMetaX"]))
story.append(Spacer(1, 3))

story.append(Paragraph("<b>B.Sc. in Mathematics (Hons.)</b>", styles["EduHeaderX"]))
story.append(Paragraph("Vinoba Bhave University, Hazaribagh | 2019 – 2022 | CGPA: 6.51",
                       styles["EduMetaX"]))
story.append(Spacer(1, 2))

story.append(Paragraph("<b>Intermediate (Class 12th)</b>", styles["EduHeaderX"]))
story.append(Paragraph("Giridih (+2) High School, JAC | 2019 | 62.2%",
                       styles["EduMetaX"]))
story.append(Spacer(1, 3))

story.append(Paragraph("<b>Matriculation (Class 10th)</b>", styles["EduHeaderX"]))
story.append(Paragraph("Upgraded High School, Charghara, JAC | 2017 | 66.4%",
                       styles["EduMetaX"]))
story.append(Spacer(1, 6))
story.append(Hairline())

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
    ("INNERGRID", (0,0), (-1,-1), 0.25, HAIRLINE),
    ("BOX", (0,0), (-1,-1), 0.25, BORDER),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("LEFTPADDING", (0,0), (-1,-1), 4),
    ("RIGHTPADDING", (0,0), (-1,-1), 4),
    ("TOPPADDING", (0,0), (-1,-1), 3),
    ("BOTTOMPADDING", (0,0), (-1,-1), 3),
]))
story.append(tbl)
story.append(Spacer(1, 6))
story.append(Hairline())

# Projects
story.append(Paragraph("Projects", styles["SectionX"]))
projects = [
    "<b>Solution of Probability and Statistics using R</b> — Exploratory data analysis and simulation tasks in R; applied statistical tests and visualizations.",
    "<b>[Placeholder: Numerical Analysis with Python]</b> — Implemented root-finding, interpolation and ODE solvers using Python; analyzed error and stability.",
]
for p in projects:
    story.append(Paragraph("• " + p, styles["BodyX"]))
story.append(Spacer(1, 4))
story.append(Hairline())

# Achievements
story.append(Paragraph("Achievements", styles["SectionX"]))
for a in ["IIT-JAM Mathematics (2024): All India Rank 712", "JEE Main (2019): Qualified"]:
    story.append(Paragraph("• " + a, styles["BodyX"]))
story.append(Spacer(1, 4))
story.append(Hairline())

# Positions (placeholder)
story.append(Paragraph("Positions of Responsibility", styles["SectionX"]))
for por in [
    "[Placeholder: Class Representative / Math Club Volunteer — NITW, 2025–Present]",
    "[Placeholder: Peer Tutor — Assisted juniors with Calculus & Linear Algebra]"
]:
    story.append(Paragraph("• " + por, styles["BodyX"]))
story.append(Spacer(1, 4))
story.append(Hairline())

# Certifications (placeholder)
story.append(Paragraph("Certifications & Workshops", styles["SectionX"]))
for c in [
    "[Placeholder: NPTEL — Probability & Statistics / Linear Algebra (Year)]",
    "[Placeholder: Workshop — LaTeX for Scientific Writing / MATLAB for Engineers]"
]:
    story.append(Paragraph("• " + c, styles["BodyX"]))
story.append(Spacer(1, 4))
story.append(Hairline())

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
