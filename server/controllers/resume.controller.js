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

const generateResume = async (req, res) => {
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
          content: `You are an expert CV writer.

                    Tailor this resume for the following job and return ONLY a complete valid HTML document.
                    No explanation, no markdown, no backticks.

                    Job Title: ${jobTitle}
                    Company: ${company}

                    Job Description:
                    ${jobDescription}

                    Current Resume:
                    ${resumeText}

                    ${omitText}

                    Instructions:
                    - Highlight skills and experience relevant to this role
                    - Use strong action verbs
                    - Return ONLY complete HTML with inline CSS

                    Design requirements — match this exact style:
                    - White background, black text, clean minimal layout
                    - Name centered at top in large bold font
                    - Contact info centered below name separated by | pipes
                    - Each section has a bold uppercase title with a full-width horizontal line underneath
                    - Skills listed as "Label: value" on same line separated by line breaks
                    - Experience and projects have company/title on left, date on right (space-between)
                    - Role subtitle in italics below title
                    - Bullet points for responsibilities and achievements
                    - Tight spacing, dense information, professional look
                    - Font: Arial or Helvetica, 10-11px body text
                    - Margins: 0.65 inches all sides
                    - A4 page size
                    - No colors except blue for hyperlinks`,
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    const resumeData = JSON.parse(raw);

    res.status(200).json({ message: "Resume data generated", resumeData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "CV generation failed", error: error.message });
  }
};

module.exports = { analyseResume, gapRoadmap, generateResume };
