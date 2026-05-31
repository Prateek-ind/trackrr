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

  try {
    const omitText = omittedSkills?.length
      ? `Do NOT include or mention these skills: ${omittedSkills.join(", ")}`
      : "";

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Please act as a FAANG ATS resume auditor and reviewer.

Generate a highly effective LaTeX resume that passes all ATS filters and compiles error-free on Overleaf using pdfLaTeX.

Tailor it for this role:
Job Title: ${jobTitle}
Company: ${company}

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

${omitText}

YOU MUST follow this EXACT LaTeX structure and formatting — only change the content:

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

\\begin{document}

\\begin{center}
  {\\LARGE \\textbf{[NAME]}} \\\\[4pt]
  \\href{mailto:[EMAIL]}{[EMAIL]} \\;|\\; [PHONE] \\;|\\; [LOCATION] \\;|\\;
  \\href{[LINKEDIN_URL]}{[LINKEDIN_DISPLAY]} \\;|\\;
  \\href{[GITHUB_URL]}{[GITHUB_DISPLAY]}
\\end{center}

\\section{Professional Summary}
\\textbf{[ROLE]} with [DETAILED SUMMARY — 4-5 lines, include all key skills, achievements and value proposition tailored to the job]

\\section{Technical Skills}
\\textbf{Languages:} [list] \\\\
\\textbf{Frontend:} [full detailed list] \\\\
\\textbf{Backend:} [full detailed list] \\\\
\\textbf{Performance:} [full detailed list] \\\\
\\textbf{Patterns \\& Concepts:} [full detailed list] \\\\
\\textbf{Tools:} [full detailed list]

\\section{Projects}
\\textbf{[PROJECT NAME]} \\hfill \\href{[URL]}{Live Demo \\textrightarrow} \\\\
\\textit{[Full Tech Stack]}
\\begin{itemize}
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
\\end{itemize}

\\vspace{4pt}
\\textbf{[PROJECT 2]} \\hfill \\href{[URL]}{Live Demo \\textrightarrow} \\\\
\\textit{[Full Tech Stack]}
\\begin{itemize}
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
\\end{itemize}

\\section{Experience}
\\textbf{[JOB TITLE]} \\hfill [START] -- [END] \\\\
\\textit{[Company, Location]}
\\begin{itemize}
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
\\end{itemize}

\\vspace{4pt}
\\textbf{[JOB TITLE 2]} \\hfill [START] -- [END] \\\\
\\textit{[Company, Location]}
\\begin{itemize}
  \\item \\textbf{[keyword]} detailed achievement with metrics
  \\item \\textbf{[keyword]} detailed achievement with metrics
\\end{itemize}

\\vspace{4pt}
\\textbf{[JOB TITLE 3]} \\hfill [START] -- [END] \\\\
\\textit{[Company, Location]}
\\begin{itemize}
  \\item \\textbf{[keyword]} achievement
\\end{itemize}

\\vspace{4pt}
\\textbf{[JOB TITLE 4]} \\hfill [START] -- [END] \\\\
\\textit{[Company, Location]}
\\begin{itemize}
  \\item \\textbf{[keyword]} achievement
\\end{itemize}

\\section{Education}
\\textbf{[DEGREE]} \\hfill [START] -- [END] \\\\
\\textit{[Institution, Location]}

\\end{document}

STRICT RULES:
- Use identical packages, commands, and structure as above — do NOT deviate
- Include ALL experience roles from the candidate's resume
- Include ALL projects from the candidate's resume
- Use full detailed bullet points — do not trim content
- Bold keywords using \\textbf{} throughout
- Dates always on the right using \\hfill
- Company always in \\textit{} below title
- Return ONLY the complete LaTeX code, no explanation, no markdown, no backticks`,
        },
      ],
    });

    const latex = completion.choices[0].message.content
      .trim()
      .replace(/^```latex\n?/, "") // remove if groq wraps in markdown code block
      .replace(/^```\n?/, "")
      .replace(/```$/, "");

    res.status(200).json({ message: "Resume data generated", latex });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "CV generation failed", error: error.message });
  }
};

module.exports = { analyseResume, gapRoadmap, generateLatex };
