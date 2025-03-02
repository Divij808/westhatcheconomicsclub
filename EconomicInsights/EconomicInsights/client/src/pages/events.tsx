import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@shared/schema";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-2/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {events?.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-muted-foreground mb-4">{event.description}</p>
            <div className="flex gap-4 text-sm mb-4">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
            </div>
            {event.description.includes('docs.google.com/forms') && (
              <Button asChild>
                <a href={event.description.split('here: ')[1]} target="_blank" rel="noopener noreferrer">
                  Sign Up Now
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}