export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="prose prose-slate lg:prose-lg">
        <h1>About Our Club</h1>

        <p className="lead">
          Our West Hatch Economics Club is a platform for students passionate 
          about economics, finance, and global markets. We organize 
          discussions, workshops, and events to foster learning and networking 
          opportunities.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Join a diverse group of economics enthusiasts
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Learning</h3>
            <p className="text-muted-foreground">
              Engage in meaningful discussions and debates
            </p>
          </div>
        </div>

        <p>
          Discover the world of economics through discussions, competitions, and real-world case studies. 
          We explore financial trends, economic policies, and decision-making beyond the A-Level curriculum.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Regular Events</h3>
            <p className="text-muted-foreground">
              Attend workshops, seminars, and discussions on economic topics.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Connect with fellow students passionate about economics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}