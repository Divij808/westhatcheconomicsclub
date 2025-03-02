import { 
  Event, InsertEvent,
  News, InsertNews,
  TeamMember, InsertTeamMember,
  Newsletter, InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // News
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;

  // Team
  getTeam(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Newsletter
  addNewsletterSubscription(sub: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private news: Map<number, News>;
  private team: Map<number, TeamMember>;
  private newsletter: Map<number, Newsletter>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.events = new Map();
    this.news = new Map();
    this.team = new Map();
    this.newsletter = new Map();
    this.currentIds = { events: 1, news: 1, team: 1, newsletter: 1 };

    // Add all team members
    const teamMembers = [
      "Coby Stuchfield",
      "Kavish Nayyar",
      "Gavinder Billing",
      "Eesha Kapoor",
      "Mia Chauhan",
      "Hannah Javed",
      "Divij Mekala",
      "Harsha Kharat",
      "Samuel Douek",
      "Elena Dragan",
      "David Tondu",
      "Nathan Vetrivel",
      "Sofina Yousaf",
      "Daniel Carbonara",
      "James Thake",
      "Ruya Dent",
      "Zac Demetriou",
      "Joseph Chittock",
      "Kai Patel",
      "Essence Morrison",
      "Milen Choat",
      "Mario Pavlov",
      "Priyan Panchal",
      "Mohinder Sandhu",
      "Aila Lodhi",
      "Krish Seeburrun",
      "Ulus Ertac",
      "Ranee Sokhal",
      "Daniel Olawabi",
      "Aneve Atwal",
      "Narcis Sevastre",
      "Louis Jackson",
      "Aiyana Patell"
    ];

    teamMembers.forEach(name => {
      this.createTeamMember({
        name,
        role: "Member",
        bio: "Active member of the West Hatch Economics Club"
      });
    });

    // Update roles for leadership team based on the screenshot
    const leadershipRoles = {
      "Divij Mekala": "Head of Web Development",
      "Samuel Douek": "Technical Director",
      "Harsha Kharat": "LinkedIn Manager",
      "Eesha Kapoor": "Instagram Manager"
    };

    // Update roles for existing members
    Array.from(this.team.values()).forEach(member => {
      if (leadershipRoles[member.name]) {
        this.team.set(member.id, {
          ...member,
          role: leadershipRoles[member.name]
        });
      }
    });

    // Add these events in the constructor after team members initialization
    this.createEvent({
      title: "Competition planning",
      description: "Sign up now! Details & registration here: https://docs.google.com/forms/d/e/1FAIpQLScS_7dqP10PvROr5cA4SaAeduIxm1JVQ5rsbbulfQ8-nI2lPg/viewform",
      date: "MAY 15, 2024",
      location: "Study room center"
    });

    this.createEvent({
      title: "Debate",
      description: "Question: Should private schools be abolished?",
      date: "3rd Febuaray, 2025",
      location: "Study room center"
    });

    this.createEvent({
      title: "Introduction",
      description: "Club introduction and overview",
      date: "Jaunuary, 27 2025",
      location: "Study room center"
    });
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentIds.events++;
    const newEvent = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }

  // News
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(news: InsertNews): Promise<News> {
    const id = this.currentIds.news++;
    const newNews = { ...news, id };
    this.news.set(id, newNews);
    return newNews;
  }

  // Team
  async getTeam(): Promise<TeamMember[]> {
    return Array.from(this.team.values());
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.team.get(id);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentIds.team++;
    const newMember = { ...member, id };
    this.team.set(id, newMember);
    return newMember;
  }

  // Newsletter
  async addNewsletterSubscription(sub: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentIds.newsletter++;
    const newSub = { ...sub, id };
    this.newsletter.set(id, newSub);
    return newSub;
  }
}

export const storage = new MemStorage();