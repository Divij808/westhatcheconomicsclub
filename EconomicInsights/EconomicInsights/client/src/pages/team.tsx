import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { TeamMember } from "@shared/schema";

function TeamSection({ title, members }: { title: string; members: TeamMember[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6 flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  const [showAllMembers, setShowAllMembers] = useState(false);
  const { data: team, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Our Team</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const webTeam = team?.filter(member => 
    ["Head of Web Development", "Technical Director"].includes(member.role)
  );

  const socialTeam = team?.filter(member => 
    ["LinkedIn Manager", "Instagram Manager"].includes(member.role)
  );

  const regularMembers = team?.filter(member => 
    member.role === "Member"
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Our Team</h1>
        <Button 
          variant="outline"
          onClick={() => setShowAllMembers(!showAllMembers)}
        >
          {showAllMembers ? "Show Leadership" : "View All Members"}
        </Button>
      </div>

      {!showAllMembers ? (
        <>
          <div className="space-y-8">
            <TeamSection title="Web Development Team" members={webTeam || []} />
            <TeamSection title="Social Media Team" members={socialTeam || []} />
          </div>
        </>
      ) : (
        <TeamSection title="All Members" members={team || []} />
      )}
    </div>
  );
}