import { Button } from "@/components/ui/button";
import { Users, Brain } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative text-center py-12 space-y-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
              alt="Economics Discussion"
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <p className="text-xl mb-4">
              Our West Hatch Economics Club is a platform for students passionate 
              about economics, finance, and global markets. We organize 
              discussions, workshops, and events to foster learning and networking 
              opportunities.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Join a diverse group of economics enthusiasts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Learning</h3>
                  <p className="text-sm text-muted-foreground">Engage in meaningful discussions and debates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="text-center space-y-6 py-12 bg-muted/30">
        <p className="text-lg max-w-3xl mx-auto">
          Discover the world of economics through discussions, competitions, and real-world case studies. 
          We explore financial trends, economic policies, and decision-making beyond the A-Level curriculum.
        </p>
        <Button size="lg" className="mt-4" asChild>
          <a href="/events">View Events →</a>
        </Button>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Regular Events</h3>
          <p className="text-muted-foreground">
            Attend workshops, seminars, and discussions on economic topics.
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Community</h3>
          <p className="text-muted-foreground">
            Connect with fellow students passionate about economics.
          </p>
        </div>
      </section>
    </div>
  );
}