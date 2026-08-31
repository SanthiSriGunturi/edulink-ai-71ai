import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NavBar } from "@/components/edulink/NavBar";
import { StudentDashboard } from "@/components/edulink/StudentDashboard";
import { UniversityDashboard } from "@/components/edulink/UniversityDashboard";
import { RecruiterDashboard } from "@/components/edulink/RecruiterDashboard";
import type { Role } from "@/data/edulink";

const title = "EduLink AI — Academia-Industry Skills, Internships & Placements";
const description =
  "EduLink AI maps student skills to live industry demand with DigiLocker-verified credentials, AI skill-gap analysis, syllabus optimization and recruiter screening.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [role, setRole] = useState<Role>("student");
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar role={role} onRoleChange={setRole} query={query} onQueryChange={setQuery} />
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        {role === "student" && <StudentDashboard query={query} />}
        {role === "university" && <UniversityDashboard query={query} />}
        {role === "recruiter" && <RecruiterDashboard query={query} />}
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        EduLink AI · Smart India Hackathon 2026 prototype · Demo data
      </footer>
    </div>
  );
}
