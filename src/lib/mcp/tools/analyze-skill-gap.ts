import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { student, targetRoles } from "@/data/edulink";

export default defineTool({
  name: "analyze_skill_gap",
  title: "Analyze skill gap",
  description:
    "Compare the demo student's current skill proficiency against industry demand for a target role, and return missing skills plus recommended micro-courses.",
  inputSchema: {
    targetRole: z
      .string()
      .describe("Target role id or label, e.g. 'fullstack', 'data', 'Cloud / DevOps Engineer'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ targetRole }) => {
    const q = targetRole.trim().toLowerCase();
    const role =
      targetRoles.find((r) => r.id === q) ??
      targetRoles.find((r) => r.label.toLowerCase().includes(q));
    if (!role) {
      throw new ToolError(
        `Unknown target role "${targetRole}". Available: ${targetRoles
          .map((r) => `${r.id} (${r.label})`)
          .join(", ")}`,
      );
    }

    const gaps = role.skills
      .map((s) => ({ ...s, gap: s.demand - s.you }))
      .sort((a, b) => b.gap - a.gap);
    const missing = gaps.filter((s) => s.gap >= 40).map((s) => s.skill);

    const payload = {
      student: { name: student.name, program: student.program, readiness: student.readiness },
      targetRole: role.label,
      skills: gaps,
      missingSkills: missing,
      recommendedCourses: role.courses,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
