export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  price: string;
  link: string;
  colorTheme: "periwinkle" | "moss" | "slate-blue" | "sage";
  iconName: string;
}

export interface RoadmapItem {
  id: string;
  tag: string;
  name: string;
  description: string;
  upvotes: number;
}

export interface DemoBooking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  agentInterest: string;
  notes?: string;
  createdAt: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  details: string;
  createdAt: string;
}
