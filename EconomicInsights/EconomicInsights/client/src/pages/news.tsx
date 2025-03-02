import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { News } from "@shared/schema";

export default function News() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      {news?.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{item.date}</p>
            <p>{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
