import { Agent, RoadmapItem } from "./types";

export const siteContent = {
  navigation: {
    logo: "Intellitech AI Labs",
    links: [
      { label: "Agents", id: "agents" },
      { label: "Roadmap", id: "roadmap" },
      { label: "Why us", id: "why-us" },
      { label: "Contact", id: "contact" }
    ],
    cta: "Book Demo"
  },
  hero: {
    eyebrow: "The future of AI labor, today",
    heading: "Grow your brand with intelligent agents",
    subheading: "Intellitech AI Labs ships production-grade AI agents that work 24/7 across WhatsApp, voice, LinkedIn and custom workflows, built for B2B teams that want to outpace tomorrow.",
    primaryCta: "Book a Demo",
    secondaryCta: "Explore Agents"
  },
  agentTeams: {
    eyebrow: "Introducing",
    heading: "AI Agent Teams",
    subheading: "Hire from our roster of specialized B2B agents — each engineered to take real work off your plate from day one.",
    agents: [
      {
        id: "linkedin",
        name: "LinkedIn AI Agent",
        description: "Automated outbound outreach, personalized messaging and appointment setting on autopilot.",
        price: "Starts at ₹5,000/mo",
        link: "/linkedin-agent",
        colorTheme: "periwinkle" as const,
        iconName: "Linkedin"
      },
      {
        id: "vouchers",
        name: "AI Vouchers Discount Deals",
        description: "AI-curated deals and exclusive vouchers — your intelligent B2C concierge for the best discounts across brands.",
        price: "Starts at ₹999/mo",
        link: "/linkedin-agent", // Mapped in content
        colorTheme: "sage" as const,
        iconName: "Ticket"
      }
    ] as Agent[]
  },
  roadmap: {
    eyebrow: "On the launchpad",
    heading: "Coming Soon",
    subheading: "The next wave of B2B agents and enterprise infrastructure rolling out of Intellitech AI Labs.",
    items: [
      { id: "rm-1", tag: "Coming Soon", name: "WhatsApp API", description: "Programmable WhatsApp infrastructure for B2C businesses at scale.", upvotes: 42 },
      { id: "rm-2", tag: "Coming Soon", name: "AI Voice Bots", description: "Realtime, human-like voice bots for any inbound or outbound channel.", upvotes: 38 },
      { id: "rm-3", tag: "Coming Soon", name: "Data Scraper", description: "Structured data extraction from dynamic web portals on autopilot.", upvotes: 19 },
      { id: "rm-4", tag: "Coming Soon", name: "Lead Generator", description: "Autonomous B2B prospecting that compiles verified lead databases daily.", upvotes: 54 },
      { id: "rm-5", tag: "Coming Soon", name: "LinkedIn AI Agent Pro", description: "Next-gen LinkedIn outreach agent with deeper multi-channel personalization.", upvotes: 27 }
    ] as RoadmapItem[]
  },
  whyUs: {
    heading: '"AI is changing fast in 2026." Are you?',
    subheading: "We architect, ship and operate AI agents so your team focuses on strategy — not complex modern tech stacks.",
    points: [
      {
        title: "Ship in days, not quarters",
        description: "Pre-built agent blueprints customized and integrated into your CRM/workflows in under two weeks."
      },
      {
        title: "Enterprise-grade reliability",
        description: "Complete observability logs, safe fallbacks, and human-in-the-loop validation where it counts."
      },
      {
        title: "Future-ready stack",
        description: "Built natively on the latest Gemini 3.5 frontier models with painless upgrades as the models evolve."
      }
    ]
  },
  customCta: {
    heading: "Need a custom AI agent?",
    subheading: "Our team at Intellitech AI Labs builds bespoke, highly specialized AI solutions tailored to your complex enterprise workflows.",
    cta: "Book Free Consultation"
  },
  contact: {
    eyebrow: "Let's connect",
    heading: "Talk to the lab.",
    email: "ayushmalhotra1703@gmail.com",
    phone: "+91 9811734477",
    base: "South Delhi, Chatarpur"
  },
  footer: {
    copyright: "© 2026 Intellitech AI Labs. All rights reserved.",
    tagline: "Engineered for what's next."
  }
};
