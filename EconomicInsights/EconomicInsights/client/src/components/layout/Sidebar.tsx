import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ChartLine, 
  CalendarDays, 
  Users, 
  MessageCircle,
  BookOpen,
  Info
} from "lucide-react";

const navItems = [
  { href: '/', label: 'Home', icon: ChartLine },
  { href: '/about', label: 'About', icon: Info },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-foreground">
          West Hatch Economics Club
        </h1>
      </div>

      <nav className="px-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 my-1",
                location === href && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}