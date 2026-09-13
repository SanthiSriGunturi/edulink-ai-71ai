import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { internships } from "@/data/edulink";

export default defineTool({
  name: "list_internships",
  title: "List internships",
  description:
    "List verified internship and placement openings, optionally filtered by skill, location text, or minimum match percentage.",
  inputSchema: {
    skill: z.string().optional().describe("Filter by a required skill, e.g. 'React'."),
    location: z.string().optional().describe("Filter by location text, e.g. 'Jharkhand'."),
    minMatch: z.number().optional().describe("Minimum compatibility match percentage (0-100)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ skill, location, minMatch }) => {
    const rows = internships.filter((i) => {
      if (skill && !i.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())))
        return false;
      if (location && !i.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (typeof minMatch === "number" && i.match < minMatch) return false;
      return true;
    });
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { count: rows.length, internships: rows },
    };
  },
});
