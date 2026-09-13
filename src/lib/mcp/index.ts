import { defineMcp } from "@lovable.dev/mcp-js";
import listInternships from "./tools/list-internships";
import analyzeSkillGap from "./tools/analyze-skill-gap";
import searchCandidates from "./tools/search-candidates";
import universityInsights from "./tools/university-insights";

export default defineMcp({
  name: "edulink-ai-connect",
  title: "EduLink AI Connect",
  version: "0.1.0",
  instructions:
    "Tools for EduLink AI, an academia-industry skill mapping, internship and placement portal. Use `list_internships` for verified openings, `analyze_skill_gap` to compare student skills against a target role, `search_candidates` for recruiter-side screening, and `university_insights` for placement KPIs and syllabus recommendations. All data is demonstration data.",
  tools: [listInternships, analyzeSkillGap, searchCandidates, universityInsights],
});
