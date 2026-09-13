# EduLink AI Connect

Create a modern, full-stack, responsive web application named "EduLink AI" for SIH 2026 (Problem Statement: Academia-Industry Collaboration Portal for Skill Mapping, Internships, and Placements).

### UI/UX & Layout Specs

- Modern layout using Tailwind CSS, standard clean fonts, and an executive blue/indigo dark slate color scheme.

- Include a sticky top Navigation Bar with:

  1. Logo ("EduLink AI")

  2. Role Switcher Tabs (Student, University Admin, Corporate Recruiter)

  3. Interactive Search Bar

  4. DigiLocker Verified Credentials Badge indicator

---

### ROLE 1: STUDENT DASHBOARD (Default Active View)

1. **Hero Header:** Displays student profile ("Rahul Sharma - B.Tech CS 2026"), verified DigiLocker status, and overall "Job Readiness Score: 78%".

2. **AI Skill Gap Analyzer Card:** 

   - Interactive widget showing target role select dropdown (e.g., "Full Stack Developer", "Data Engineer").

   - Comparative Radar or Bar Chart matching current student skills vs. industry demand (e.g., Target: React, Node.js, Docker, Vector DB | Student Has: React, Node.js | Missing: Docker, Vector DB).

   - "Bridge Gap" action button that pops up recommended micro-courses.

3. **Internship & Placement Feed:** 

   - Cards listing job openings from verified employers (Company name, role, stipend, required skills, compatibility match percentage badge, and "One-Click Apply" button).

---

### ROLE 2: UNIVERSITY ADMIN DASHBOARD

1. **Analytics Overview Metrics:** 

   - 4 KPI cards showing Total Enrolled (1,200), Active Placed (68%), Top Industry Skill Deficit ("Cloud Native & DevOps"), and Average Match Score (72%).

2. **AI Syllabus Optimization Panel:**

   - Table highlighting aggregate skill deficits detected across recruiters in the state.

   - Recommended curriculum updates (e.g., "Recommend replacing CS304 Legacy Databases with Vector Databases & Distributed Systems based on 45% regional hiring trend").

   - "Export Recommendation PDF for Board" button.

---

### ROLE 3: CORPORATE RECRUITER DASHBOARD

1. **Candidate Screening Engine:**

   - Search & Filter bar by candidate skills, match %, verified credentials, and university tier.

   - Candidate List Table displaying: Name, College, Verified Skills Tags, AI Match Score (e.g., 94%), and "Shortlist / Invite to Interview" button.

2. **Post Internship/Job Module:**

   - Modal form to post a job with title, required skills, location (e.g., Jharkhand/Remote), and auto-parsing AI tool for job descriptions.

---

### INTERACTIVITY & DUMMY DATA

- Include dummy data for all views.

- Ensure state switching between Student, University, and Recruiter tabs works smoothly on the main page.

- Add mock modal interactions for "View Skill Gap Details" and "Apply for Internship".

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/763e8569-162b-4c1a-bab7-b1d38fb1ee67).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
