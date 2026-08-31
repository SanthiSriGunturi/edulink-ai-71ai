import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  BadgeCheck,
  Building2,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { internships, student, targetRoles } from "@/data/edulink";

export function StudentDashboard({ query }: { query: string }) {
  const [roleId, setRoleId] = useState(targetRoles[0].id);
  const [bridgeOpen, setBridgeOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applyFor, setApplyFor] = useState<(typeof internships)[number] | null>(null);

  const target = targetRoles.find((r) => r.id === roleId)!;
  const missing = target.skills.filter((s) => s.demand - s.you > 35);

  const feed = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return internships;
    return internships.filter((i) =>
      [i.company, i.role, i.location, ...i.skills].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <section
        className="rounded-2xl border border-border p-6 md:p-8"
        style={{ backgroundImage: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Badge variant="outline" className="gap-1 border-success/40 bg-success/15 text-success">
              <BadgeCheck className="size-3.5" /> DigiLocker credentials verified
            </Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {student.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.program} · {student.college}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {student.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-full max-w-xs rounded-xl border border-border bg-card/70 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Job Readiness Score
            </p>
            <p className="mt-1 text-4xl font-semibold">{student.readiness}%</p>
            <Progress value={student.readiness} className="mt-3" />
            <p className="mt-2 flex items-center gap-1 text-xs text-success">
              <TrendingUp className="size-3.5" /> +6% since last assessment
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent" /> AI Skill Gap Analyzer
            </CardTitle>
            <CardDescription>
              Your verified skills compared against live industry demand.
            </CardDescription>
          </div>
          <Select value={roleId} onValueChange={setRoleId}>
            <SelectTrigger className="w-56" aria-label="Target role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {targetRoles.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={target.skills} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="skill" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="demand"
                  name="Industry demand"
                  fill="var(--chart-1)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="you"
                  name="Your proficiency"
                  fill="var(--chart-2)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Missing:</span>
            {missing.map((m) => (
              <Badge key={m.skill} className="bg-destructive/15 text-destructive" variant="outline">
                {m.skill}
              </Badge>
            ))}
            <div className="ml-auto flex gap-2">
              <Button variant="outline" onClick={() => setDetailsOpen(true)}>
                View Skill Gap Details
              </Button>
              <Button onClick={() => setBridgeOpen(true)}>
                <Target className="size-4" /> Bridge Gap
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Internship & Placement Feed</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {feed.map((job) => (
            <Card key={job.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="size-4 text-muted-foreground" />
                    {job.company}
                    {job.verified && <BadgeCheck className="size-4 text-success" />}
                  </CardTitle>
                  <CardDescription>{job.role}</CardDescription>
                </div>
                <Badge
                  className={
                    job.match >= 80
                      ? "bg-success/15 text-success"
                      : "bg-warning/15 text-warning"
                  }
                  variant="outline"
                >
                  {job.match}% match
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet className="size-3.5" /> {job.stipend}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" onClick={() => setApplyFor(job)}>
                  One-Click Apply
                </Button>
              </CardContent>
            </Card>
          ))}
          {feed.length === 0 && (
            <p className="text-sm text-muted-foreground">No openings match your search.</p>
          )}
        </div>
      </section>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skill gap details — {target.label}</DialogTitle>
            <DialogDescription>Per-skill delta against regional hiring demand.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {target.skills.map((s) => (
              <div key={s.skill} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{s.skill}</span>
                  <span className="text-muted-foreground">
                    you {s.you}% · demand {s.demand}%
                  </span>
                </div>
                <Progress value={s.you} />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={bridgeOpen} onOpenChange={setBridgeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recommended micro-courses</DialogTitle>
            <DialogDescription>
              Curated to close your gap for {target.label} before campus season.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {target.courses.map((c) => (
              <div
                key={c.title}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.provider} · {c.weeks} weeks
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success(`Enrolled in ${c.title}`)}
                >
                  Enroll
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!applyFor} onOpenChange={(o) => !o && setApplyFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {applyFor?.role}</DialogTitle>
            <DialogDescription>
              {applyFor?.company} · {applyFor?.location}. Your DigiLocker-verified profile and
              transcript will be shared with the recruiter.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyFor(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success(`Application sent to ${applyFor?.company}`);
                setApplyFor(null);
              }}
            >
              Confirm Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
