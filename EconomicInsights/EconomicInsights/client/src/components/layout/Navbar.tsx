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

export function Navbar() {
  const [location] = useLocation();

  return (
    <div className="border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">
            West Hatch Economics Club
          </h1>
          
          <nav className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2",
                    location === href && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
