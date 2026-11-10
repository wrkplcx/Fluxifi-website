export const CALENDLY_URL = "https://calendly.com/fluxifi/fluxifi-intro"

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Who We Work With", href: "/#who-we-work-with" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
]

export type Service = {
  slug: string
  name: string
  title: string
  description: string
  paragraphs: string[]
  details: { label: string; text: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: "technology-audit",
    name: "Technology Audit",
    title: "Technology Audit for Building Projects: Fluxifi",
    description:
      "A 30-day review of your AV and IT standards, vendors and upcoming projects, with a written plan of what to fix first.",
    paragraphs: [
      "A 30-day review of your standards, vendors and upcoming projects. You get a written report: what's at risk, what it's costing you, and what to fix first.",
    ],
    details: [
      { label: "Best for", text: "Teams with projects coming and no clear plan." },
      { label: "", text: "From $9,000." },
    ],
  },
  {
    slug: "av-it-design",
    name: "Standards and Design",
    title: "AV and IT Design Consulting and Standards: Fluxifi",
    description:
      "Technology standards, 3D room models and construction drawings for AV, network and structured cabling.",
    paragraphs: [
      "We create one approved design for each type of room, then produce the drawings. Contractors build from them. Every location matches.",
    ],
    details: [
      {
        label: "Includes",
        text: "Room designs, equipment lists, 3D models, construction drawings, and the documents vendors price from.",
      },
    ],
  },
  {
    slug: "program-management",
    name: "Program Management",
    title: "AV and IT Project and Program Management: Fluxifi",
    description:
      "We run every technology project across your locations: design, vendors, schedule, budget and testing.",
    paragraphs: [
      "We run every technology project across your locations. Design, vendors, schedule, budget, testing and handover. One flat monthly fee.",
    ],
    details: [
      { label: "Best for", text: "Companies with several projects a year." },
      { label: "", text: "From $19,000 a month." },
    ],
  },
  {
    slug: "managed-support",
    name: "Ongoing Support",
    title: "Managed AV and Workplace Technology Support: Fluxifi",
    description:
      "One number to call after opening. As-built records, vendor management and escalation for every space.",
    paragraphs: [
      "After a space opens, we stay on. Your team has one number to call. We keep the records of what was built and manage whoever needs to fix it.",
    ],
    details: [
      {
        label: "Includes",
        text: "One number to call, a record of exactly what was installed and where, vendor management, and updates to your room designs.",
      },
    ],
  },
  {
    slug: "systems-automation",
    name: "Systems and Automation",
    title: "Project Systems and Workflow Automation for AV and IT Teams: Fluxifi",
    description:
      "Project trackers, room testing checklists and bid document tools, built in software your team already uses.",
    paragraphs: [
      "Most technology teams run projects on spreadsheets and email. We replace that. We build the project trackers, room testing checklists, bid document tools and room design tools your team works in, and use automation and AI to cut the manual steps.",
      "Built in software you already have, like Airtable and Google Workspace. It runs in your account. You own it and the data.",
    ],
    details: [
      {
        label: "Examples",
        text: "A system that tracks the build and testing of every room for a global streaming company. A bid document generator for a global cybersecurity company.",
      },
      { label: "Best for", text: "Internal teams buried in spreadsheets." },
    ],
  },
]

export type Buyer = {
  slug: string
  cardName: string
  cardText: string
  title: string
  description: string
  heading: string
  intro: string
  bullets: string[]
}

export const BUYERS: Buyer[] = [
  {
    slug: "owners",
    cardName: "Companies with many locations.",
    cardText: "One team for every technology project across your sites. One design. One number to call.",
    title: "Technology Owner's Rep for Multi-Site Companies: Fluxifi",
    description:
      "An independent technology team for companies with many locations. One standard, one team, every project.",
    heading: "Many locations. One technology team.",
    intro:
      "Every new site means new vendors and new mistakes. We give you one approved design for each type of room and one team that runs every project.",
    bullets: [
      "The same result at every location",
      "One monthly fee, not a new contract for every project",
      "One number to call after opening",
    ],
  },
  {
    slug: "architects",
    cardName: "Architects.",
    cardText:
      "Your technology design team. We fit the screens, network and cabling into your drawings so nothing gets redesigned on site.",
    title: "AV and Technology Design Partner for Architects: Fluxifi",
    description:
      "AV, IT and low-voltage design coordinated into your drawings. A technology design team on call for every project.",
    heading: "Your technology design team, on call.",
    intro:
      "Clients expect the technology to work, and they look to you when it doesn't. We design the screens, network and cabling and fit them into your drawings.",
    bullets: [
      "Technology drawings coordinated with your plans",
      "Power, wall backing and conduit needs flagged early",
      "Available per project or on retainer across all your work",
    ],
  },
  {
    slug: "general-contractors",
    cardName: "General contractors.",
    cardText: "A complete technology scope, with drawings your subcontractors can price and build from.",
    title: "Low-Voltage and AV Design for General Contractors: Fluxifi",
    description: "A complete technology scope with drawings your subcontractors can bid and build from.",
    heading: "A technology scope your subcontractors can build.",
    intro:
      "Technology is where late changes come from. We hand you complete drawings and a clear scope before bidding starts.",
    bullets: [
      "Drawings subcontractors can price from",
      "Questions answered fast during construction",
      "Every room tested before handover",
    ],
  },
  {
    slug: "msp-partners",
    cardName: "IT providers.",
    cardText:
      "We do what you don't: meeting rooms, screens and sound, cabling design, office moves and build-outs. You keep the client.",
    title: "AV and Cabling Partner for MSPs and IT Providers: Fluxifi",
    description:
      "Meeting rooms, AV, cabling design and office build-outs for your clients. We do the work, you keep the relationship.",
    heading: "We do the part you don't.",
    intro:
      "Your clients ask about meeting rooms, office moves and new build-outs. We handle them. You keep the client.",
    bullets: [
      "Meeting room, screen and sound design",
      "Cabling and equipment room design for new spaces",
      "We manage the installers and test every room",
    ],
  },
  {
    slug: "private-equity",
    cardName: "Investors.",
    cardText: "One technology design across every location you own. Faster openings. Predictable cost.",
    title: "Technology Rollouts for Multi-Site Portfolios: Fluxifi",
    description: "One technology standard across every portfolio location. Faster openings and predictable cost.",
    heading: "One technology design for every location you own.",
    intro:
      "Each company in a portfolio builds its spaces differently, and pays for it. We set one design and roll it out everywhere.",
    bullets: ["Faster openings", "Predictable cost per location", "One record of what is installed across the portfolio"],
  },
]
