import { useMemo } from "react";
import { toast } from "sonner";
import { FileDown, GraduationCap, LineChart, Percent, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deficits, kpis, syllabusRecos } from "@/data/edulink";

const icons = [GraduationCap, Percent, TriangleAlert, LineChart];

export function UniversityDashboard({ query }: { query: string }) {
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return deficits;
    return deficits.filter((d) => (d.skill + d.industry).toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-6">
      <section
        className="rounded-2xl border border-border p-6"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          University Analytics Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Placement cell intelligence for the 2026 graduating cohort.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = icons[i] ?? GraduationCap;
          return (
            <Card key={k.label}>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Icon className="size-4 text-accent" /> {k.label}
                </CardDescription>
                <CardTitle className="text-2xl leading-tight">{k.value}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{k.sub}</p>
                <Badge variant="secondary">{k.trend}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aggregate Skill Deficits (State Recruiters)</CardTitle>
          <CardDescription>
            Demand reported by verified employers vs. current student supply.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill Cluster</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Demand</TableHead>
                <TableHead>Supply</TableHead>
                <TableHead className="w-48">Deficit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((d) => (
                <TableRow key={d.skill}>
                  <TableCell className="font-medium">{d.skill}</TableCell>
                  <TableCell className="text-muted-foreground">{d.industry}</TableCell>
                  <TableCell>{d.demand}%</TableCell>
                  <TableCell>{d.supply}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={d.gap} className="h-2" />
                      <span className="text-xs text-muted-foreground">{d.gap}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>AI Syllabus Optimization Panel</CardTitle>
            <CardDescription>
              Curriculum actions generated from live regional hiring trends.
            </CardDescription>
          </div>
          <Button onClick={() => toast.success("Board recommendation PDF generated")}>
            <FileDown className="size-4" /> Export Recommendation PDF for Board
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {syllabusRecos.map((r) => (
            <div key={r.course} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={r.action === "Replace" ? "destructive" : "secondary"}>
                  {r.action}
                </Badge>
                <p className="text-sm font-medium">{r.course}</p>
                <span className="text-muted-foreground">→</span>
                <p className="text-sm font-medium text-accent">{r.with}</p>
                <Badge variant="outline" className="ml-auto">
                  {r.impact} impact
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.rationale}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
