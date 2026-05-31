const Groq = require("groq-sdk");
const { PDFParse } = require("pdf-parse");
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyseResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Your resume pdf is required." });
  }

  const { jobTitle, company, jobDescription } = req.body;

  if (!jobTitle || !company || !jobDescription) {
    return res.status(400).json({
      message: "Job title, company and job description are required.",
    });
  }

  try {
    const pdfParser = new PDFParse({ data: req.file.buffer });
    const result = await pdfParser.getText();
    const resumeText = result.text;
    await pdfParser.destroy();

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are an expert career coach and CV analyst.

Compare this resume against the job description and identify the skill/experience gaps.

Job Title: ${jobTitle}
Company: ${company}

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY a valid JSON array, no explanation, no markdown, no backticks.
Each item in the array should have:
- skill: the missing skill or experience
- importance: "high" | "medium" | "low"
- reason: one sentence why it matters for this role

Example format:
[
  {
    "skill": "Python",
    "importance": "high",
    "reason": "Required for data pipeline automation mentioned in the JD."
  }
]`,
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    const gaps = JSON.parse(raw);

    res
      .status(200)
      .json({ message: "Gaps in current resume", gaps, resumeText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analysis failed", error: error.message });
  }
};

const gapRoadmap = async (req, res) => {
  const { skill, jobTitle, company } = req.body;

  if (!skill) {
    return res.status(400).json({ message: "Skill is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an expert career coach.
        Give a crash course to learn ${skill} quickly for a ${jobTitle} role at ${company}.

        Focus specifically on aspects of "${skill}" that are most relevant to what "${company}" looks for in their hiring process.

        Return ONLY a valid JSON object, no explanation, no markdown, no backticks.
        
        Format:
        {
        "skill": "${skill}",
        "timeToLearn": "e.g. 1 week",
        "steps": [
            {
            "day": "Day 1-2",
            "task": "what to do",
            "resource": "best free resource URL or name"
            }
        ]`,
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    const roadmap = JSON.parse(raw);

    res.status(200).json({ roadmap });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Roadmap generation failed", error: error.message });
  }
};

const generateLatex = async (req, res) => {
  const { resumeText, jobTitle, company, jobDescription, omittedSkills } =
    req.body;

  if (!resumeText || !jobTitle || !company || !jobDescription) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const omitText = omittedSkills?.length
    ? `Do NOT include or mention these skills: ${omittedSkills.join(", ")}`
    : "";

  const isLinkedIn =
    resumeText.toLowerCase().includes("connections") ||
    resumeText.toLowerCase().includes("followers") ||
    resumeText.toLowerCase().includes("recommendations") ||
    resumeText.toLowerCase().includes("linkedin.com/in");

  const linkedInNote = isLinkedIn
    ? "This resume was exported from LinkedIn. Extract only professional content — ignore connection counts, follower numbers, endorsement counts, and LinkedIn metadata."
    : "";

  const prompt = `Please act as a world-class ATS resume auditor.

Job Title: ${jobTitle}
Company: ${company}

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

${omitText}
${linkedInNote}

CRITICAL: YOU MUST USE THIS EXACT PREAMBLE — DO NOT CHANGE A SINGLE CHARACTER:

\\documentclass[10pt,a4paper]{article}
\\usepackage[margin=0.65in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\hypersetup{colorlinks=true, urlcolor=blue, linkcolor=blue}
\\titleformat{\\section}{\\bfseries\\large}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{6pt}{4pt}
\\setlength{\\parindent}{0pt}
\\setlist[itemize]{leftmargin=*, topsep=2pt, itemsep=1pt, parsep=0pt}

CRITICAL: YOU MUST USE THESE EXACT FORMATTING PATTERNS — NO EXCEPTIONS:

HEADER — exact format:
\\begin{center}
  {\\LARGE \\textbf{NAME}} \\\\[4pt]
  \\href{mailto:EMAIL}{EMAIL} \\;|\\; PHONE \\;|\\; LOCATION \\;|\\;
  \\href{LINKEDIN_URL}{LINKEDIN_DISPLAY} \\;|\\;
  \\href{GITHUB_URL}{GITHUB_DISPLAY}
\\end{center}

SKILLS — never use bullet points, always inline with label:
\\textbf{Category:} item1, item2, item3 \\\\
\\textbf{Category:} item1, item2, item3 \\\\

EXPERIENCE/PROJECT ENTRY — exact format:
\\textbf{Title} \\hfill Start -- End \\\\
\\textit{Company or Tech Stack, Location}
\\begin{itemize}
  \\item \\textbf{Keyword} descriptive achievement with metric
  \\item \\textbf{Keyword} descriptive achievement with metric
\\end{itemize}
\\vspace{4pt}

- Education format:
\\section{Education}
\\textbf{Degree} \\hfill Start -- End \\\\
\\textit{Institution, Location}

CONTENT RULES:

- Professional Summary: 5-6 lines, cover role, experience, strengths, achievements, value prop
- Infer skill categories dynamically from the industry and JD and without breaking words — never hardcode
- Include ALL roles and ALL projects with 3-5 detailed bullets each
- Bold important keywords using \\textbf{} in every bullet
- Can be 2 pages — never sacrifice content
- ALWAYS include Education section — never omit it
- ALWAYS follow this exact section order: Professional Summary → Skills → Projects → Experience → Education
- Never change the section order under any circumstances
- Output MUST start with \\documentclass and contain \\begin{document} and \\end{document}
- Return ONLY the complete LaTeX code, no explanation, no markdown, no backticks`;

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    let latex = completion.choices[0].message.content.trim();

    // clean up if model wraps in markdown
    if (latex.startsWith("```latex")) latex = latex.slice(8);
    if (latex.startsWith("```")) latex = latex.slice(3);
    if (latex.endsWith("```")) latex = latex.slice(0, -3);

    latex = latex.trim();

    res.status(200).json({ message: "Resume data generated", latex });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "CV generation failed", error: error.message });
  }
};

module.exports = { analyseResume, gapRoadmap, generateLatex };
