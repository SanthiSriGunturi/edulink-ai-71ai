import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { candidates } from "@/data/edulink";

export default defineTool({
  name: "search_candidates",
  title: "Search candidates",
  description:
    "Search the demo candidate pool by skill, minimum AI match score, DigiLocker verification, or university tier.",
  inputSchema: {
    skill: z.string().optional().describe("Filter by a verified skill, e.g. 'Docker'."),
    minMatch: z.number().optional().describe("Minimum AI match score (0-100)."),
    verifiedOnly: z.boolean().optional().describe("Only DigiLocker-verified candidates."),
    tier: z.string().optional().describe("University tier, e.g. 'Tier 1'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ skill, minMatch, verifiedOnly, tier }) => {
    const rows = candidates.filter((c) => {
      if (skill && !c.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())))
        return false;
      if (typeof minMatch === "number" && c.match < minMatch) return false;
      if (verifiedOnly && !c.verified) return false;
      if (tier && c.tier.toLowerCase() !== tier.trim().toLowerCase()) return false;
      return true;
    });
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { count: rows.length, candidates: rows },
    };
  },
});
