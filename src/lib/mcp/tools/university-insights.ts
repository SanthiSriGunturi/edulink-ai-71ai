import { defineTool } from "@lovable.dev/mcp-js";
import { kpis, deficits, syllabusRecos } from "@/data/edulink";

export default defineTool({
  name: "university_insights",
  title: "University insights",
  description:
    "Return the university placement KPIs, regional skill-deficit table, and AI syllabus optimization recommendations.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = { kpis, skillDeficits: deficits, syllabusRecommendations: syllabusRecos };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
