import { Search, ShieldCheck, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Role } from "@/data/edulink";

const tabs: { id: Role; label: string }[] = [
  { id: "student", label: "Student" },
  { id: "university", label: "University Admin" },
  { id: "recruiter", label: "Corporate Recruiter" },
];

type Props = {
  role: Role;
  onRoleChange: (r: Role) => void;
  query: string;
  onQueryChange: (q: string) => void;
};

export function NavBar({ role, onRoleChange, query, onQueryChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:gap-5">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight">EduLink AI</p>
            <p className="text-[11px] text-muted-foreground">Academia · Industry Portal</p>
          </div>
        </div>

        <nav
          role="tablist"
          aria-label="Role switcher"
          className="order-3 flex w-full gap-1 rounded-xl bg-secondary p-1 md:order-none md:w-auto"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={role === t.id}
              onClick={() => onRoleChange(t.id)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors md:text-sm",
                role === t.id
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="relative ml-auto min-w-40 flex-1 md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search skills, roles, candidates…"
            className="pl-9"
            aria-label="Search"
          />
        </div>

        <Badge className="gap-1 border-success/40 bg-success/15 text-success" variant="outline">
          <ShieldCheck className="size-3.5" /> DigiLocker Verified
        </Badge>
      </div>
    </header>
  );
}
