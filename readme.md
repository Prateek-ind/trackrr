# Trackrr 🚀

Trackrr is an AI-powered job application tracker designed to help job seekers manage their entire job search process in one place.

Beyond tracking applications, Trackrr helps users optimize their resumes for specific job descriptions using AI. Users can upload their resume, analyze job requirements, receive personalized gap analysis and learning roadmaps, and generate ATS-friendly LaTeX resumes that can be opened directly in Overleaf or Prism.

---

## ✨ Features

### 📋 Job Application Tracking

- Add, update, and delete job applications
- Track applications across different stages:
  - Applied
  - Assessment
  - Interview
  - Offer
  - Rejected
- Set priority levels:
  - High
  - Medium
  - Low
- Store application details including:
  - Company
  - Role
  - Location
  - Application source
  - Notes
  - Resume attachments

### 📊 Dashboard & Analytics

- View application statistics
- Monitor job search progress
- Track application status distribution
- Stay organized throughout the hiring process

### 🔍 Search & Filter

- Search applications instantly
- Filter by status
- Filter by priority
- Quickly locate specific applications

### 📎 Resume & Attachment Management

- Upload resumes and supporting documents
- Secure cloud storage using Cloudinary
- Manage application-specific attachments

### 🤖 AI Resume Tailoring

- Upload an existing resume
- Paste a target job description
- Generate a customized resume aligned with job requirements
- Improve ATS compatibility
- Optimize resume keywords and content

### 🎯 Gap Analysis

Trackrr identifies gaps between your current profile and the target role.

AI-generated insights include:

- Missing technical skills
- Missing tools and technologies
- Experience gaps
- Strength areas
- Improvement opportunities

### 🛣️ Personalized Learning Roadmap

Based on the gap analysis, Trackrr generates a roadmap to help improve job readiness.

Examples include:

- Skills to learn
- Technologies to practice
- Suggested learning order
- Career-focused recommendations

### 📄 ATS-Friendly LaTeX Resume Generation

Generate professional resume code that is:

- ATS optimized
- Clean and professional
- Ready for PDF export
- Compatible with:
  - Overleaf
  - Prism
  - Any LaTeX editor

### 🔐 Secure Authentication

- User registration and login
- JWT authentication
- Protected routes
- User-specific data isolation

### 📱 Responsive Design

- Mobile-friendly interface
- Tablet support
- Desktop optimized

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- TanStack Query
- Tailwind CSS
- React Hook Form

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### Cloud Services

- Cloudinary

### AI Integration

- Grok AI
- Prompt Engineering
- Resume Analysis
- Job Description Matching
- Skill Gap Detection
- Resume Optimization
- LaTeX Generation

---

## 🔄 AI Resume Tailoring Workflow

1. Upload your resume
2. Paste the target job description
3. AI analyzes the requirements
4. Resume is tailored for the role
5. Gap analysis is generated
6. Personalized learning roadmap is created
7. ATS-friendly LaTeX resume code is generated
8. Export and compile using Overleaf or Prism

---

## 📸 Screenshots

### Dashboard

_Add dashboard screenshot here_

### Job Tracking

_Add job tracking screenshot here_

### AI Resume Tailoring

_Add AI tailoring screenshot here_

### Gap Analysis

_Add gap analysis screenshot here_

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/trackrr.git
cd trackrr
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GROK_API_KEY=your_grok_api_key
```

Run the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## 📂 Project Structure

```text
trackrr/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│
└── README.md
```

---

## 🎯 Future Improvements

- Interview scheduling
- Follow-up reminders
- Application timeline view
- AI interview preparation
- Resume version history
- Cover letter generation
- Resume scoring
- Job recommendation engine
- Export applications to CSV/PDF
- Browser extension for saving job postings

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Prateek Kumar**

If you found this project useful, consider giving it a ⭐ on GitHub.