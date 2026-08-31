import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { candidates } from "@/data/edulink";

export function RecruiterDashboard({ query }: { query: string }) {
  const [skill, setSkill] = useState("");
  const [minMatch, setMinMatch] = useState(60);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [tier, setTier] = useState("all");
  const [postOpen, setPostOpen] = useState(false);
  const [jd, setJd] = useState("");
  const [parsed, setParsed] = useState<string[]>([]);

  const rows = useMemo(() => {
    const q = (query + " " + skill).trim().toLowerCase().split(/\s+/).filter(Boolean);
    return candidates.filter((c) => {
      const hay = [c.name, c.college, c.tier, ...c.skills].join(" ").toLowerCase();
      return (
        q.every((t) => hay.includes(t)) &&
        c.match >= minMatch &&
        (!verifiedOnly || c.verified) &&
        (tier === "all" || c.tier === tier)
      );
    });
  }, [query, skill, minMatch, verifiedOnly, tier]);

  const parseJd = () => {
    const known = [
      "React",
      "Node.js",
      "Docker",
      "Kubernetes",
      "Python",
      "SQL",
      "AWS",
      "Spark",
      "TypeScript",
      "Go",
      "Java",
    ];
    const found = known.filter((k) => jd.toLowerCase().includes(k.toLowerCase()));
    setParsed(found);
    toast.success(found.length ? `Parsed ${found.length} skills` : "No known skills detected");
  };

  return (
    <div className="space-y-6">
      <section
        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-6"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Candidate Screening Engine
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Verified talent pool across partner institutions.
          </p>
        </div>
        <Dialog open={postOpen} onOpenChange={setPostOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" /> Post Internship / Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post a new opening</DialogTitle>
              <DialogDescription>
                Paste a job description and let AI extract the required skills.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobtitle">Job title</Label>
                <Input id="jobtitle" placeholder="Full Stack Engineering Intern" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc">Location</Label>
                <Select defaultValue="jharkhand">
                  <SelectTrigger id="loc">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jd">Job description</Label>
                <Textarea
                  id="jd"
                  rows={5}
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="We are looking for interns with React, Node.js and Docker experience…"
                />
                <Button type="button" variant="outline" size="sm" onClick={parseJd}>
                  <Sparkles className="size-4" /> Auto-parse skills
                </Button>
              </div>
              {parsed.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {parsed.map((p) => (
                    <Badge key={p} variant="secondary">
                      {p}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setPostOpen(false);
                  toast.success("Opening published to 42 partner campuses");
                }}
              >
                Publish Opening
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow the pool by skill, match, credentials and tier.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="skillf">Skill</Label>
            <Input
              id="skillf"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. Docker"
            />
          </div>
          <div className="space-y-2">
            <Label>Minimum match: {minMatch}%</Label>
            <Slider
              value={[minMatch]}
              onValueChange={(v) => setMinMatch(v[0])}
              min={50}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tierf">University tier</Label>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger id="tierf">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tiers</SelectItem>
                <SelectItem value="Tier 1">Tier 1</SelectItem>
                <SelectItem value="Tier 2">Tier 2</SelectItem>
                <SelectItem value="Tier 3">Tier 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 md:pt-7">
            <Switch id="ver" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
            <Label htmlFor="ver">DigiLocker verified only</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidates ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Verified Skills</TableHead>
                <TableHead>AI Match</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-1">
                      {c.name}
                      {c.verified && <BadgeCheck className="size-4 text-success" />}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.college} · {c.tier}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {c.skills.map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        c.match >= 85 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                      }
                    >
                      {c.match}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => toast.success(`${c.name} shortlisted & invited to interview`)}
                    >
                      Shortlist / Invite
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No candidates match these filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
