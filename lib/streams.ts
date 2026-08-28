import type { LucideIcon } from "lucide-react";
import {
  Cpu,
  Sigma,
  Dna,
  Landmark,
  Palette,
  FlaskConical,
  Cog,
  Sprout,
  MonitorSmartphone,
} from "lucide-react";

export type SubjectStatus = "live" | "preview";

export type Subject = {
  slug: string;
  name: string;
  shortName: string;
  code: string;
  description: string;
  icon: LucideIcon;
  status: SubjectStatus;
  href?: string;
};

export type Stream = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient classes
  image: string; // representative photo, unsplash
  subjects: Subject[];
};

export const STREAMS: Stream[] = [
  {
    slug: "technology",
    name: "Technology",
    shortName: "Tech",
    tagline: "Applied science for engineering & bio-systems careers",
    description:
      "Every Technology-stream student sits Science for Technology and ICT, then picks a third subject: Engineering Technology or Bio Systems Technology.",
    icon: Cpu,
    accent: "from-blue-600 to-indigo-600",
    image:
      "https://images.unsplash.com/photo-1606206873764-fd15e242df52?auto=format&fit=crop&w=1600&q=80",
    subjects: [
      {
        slug: "science-for-technology",
        name: "Science for Technology",
        shortName: "SFT",
        code: "SFT",
        description:
          "Physics, Chemistry, Biology and Maths fundamentals, weighted exactly against the exam blueprint.",
        icon: FlaskConical,
        status: "live",
        href: "/dashboard",
      },
      {
        slug: "engineering-technology",
        name: "Engineering Technology",
        shortName: "ET",
        code: "ET",
        description:
          "Mechanical, electrical and civil technology fundamentals for the engineering pathway.",
        icon: Cog,
        status: "preview",
      },
      {
        slug: "bio-systems-technology",
        name: "Bio Systems Technology",
        shortName: "BST",
        code: "BST",
        description:
          "Agriculture, food and biological-systems technology for the applied biology pathway.",
        icon: Sprout,
        status: "preview",
      },
      {
        slug: "ict",
        name: "Information & Communication Technology",
        shortName: "ICT",
        code: "ICT",
        description:
          "Programming, databases and systems fundamentals shared across the Technology stream.",
        icon: MonitorSmartphone,
        status: "preview",
      },
    ],
  },
  {
    slug: "physical-science",
    name: "Physical Science",
    shortName: "Maths",
    tagline: "The engineering & IT pathway",
    description:
      "Combined Mathematics, Physics and Chemistry — the standard route into engineering, IT and architecture degrees.",
    icon: Sigma,
    accent: "from-slate-700 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80",
    subjects: [
      {
        slug: "combined-mathematics",
        name: "Combined Mathematics",
        shortName: "Maths",
        code: "CM",
        description: "Pure and applied mathematics across both papers.",
        icon: Sigma,
        status: "preview",
      },
      {
        slug: "physics",
        name: "Physics",
        shortName: "Physics",
        code: "PHY",
        description: "Mechanics, waves, electricity and modern physics.",
        icon: Cpu,
        status: "preview",
      },
      {
        slug: "chemistry",
        name: "Chemistry",
        shortName: "Chem",
        code: "CHM",
        description: "Physical, organic and inorganic chemistry.",
        icon: FlaskConical,
        status: "preview",
      },
    ],
  },
  {
    slug: "biological-science",
    name: "Biological Science",
    shortName: "Bio",
    tagline: "The medicine & life-sciences pathway",
    description:
      "Biology, Physics and Chemistry — the standard route into medicine, dentistry, veterinary science and biotechnology.",
    icon: Dna,
    accent: "from-emerald-600 to-teal-700",
    image:
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=1600&q=80",
    subjects: [
      {
        slug: "biology",
        name: "Biology",
        shortName: "Bio",
        code: "BIO",
        description: "Cell biology, physiology, genetics and ecology.",
        icon: Dna,
        status: "preview",
      },
      {
        slug: "physics-bio",
        name: "Physics",
        shortName: "Physics",
        code: "PHY",
        description: "Mechanics, waves, electricity and modern physics.",
        icon: Cpu,
        status: "preview",
      },
      {
        slug: "chemistry-bio",
        name: "Chemistry",
        shortName: "Chem",
        code: "CHM",
        description: "Physical, organic and inorganic chemistry.",
        icon: FlaskConical,
        status: "preview",
      },
    ],
  },
  {
    slug: "commerce",
    name: "Commerce",
    shortName: "Commerce",
    tagline: "The business & finance pathway",
    description:
      "Accounting, Business Studies and Economics (or ICT) — the route into finance, management and business degrees.",
    icon: Landmark,
    accent: "from-amber-600 to-orange-700",
    image:
      "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?auto=format&fit=crop&w=1600&q=80",
    subjects: [
      {
        slug: "accounting",
        name: "Accounting",
        shortName: "Accounting",
        code: "ACC",
        description: "Financial and cost accounting fundamentals.",
        icon: Landmark,
        status: "preview",
      },
      {
        slug: "business-studies",
        name: "Business Studies",
        shortName: "Business",
        code: "BUS",
        description: "Management, marketing and business environment.",
        icon: Landmark,
        status: "preview",
      },
      {
        slug: "economics",
        name: "Economics",
        shortName: "Economics",
        code: "ECO",
        description: "Micro and macroeconomics with applied theory.",
        icon: Landmark,
        status: "preview",
      },
    ],
  },
  {
    slug: "arts",
    name: "Arts",
    shortName: "Arts",
    tagline: "The humanities & social sciences pathway",
    description:
      "The widest range of subject combinations, spanning languages, law, media and the social sciences.",
    icon: Palette,
    accent: "from-rose-600 to-pink-700",
    image:
      "https://images.unsplash.com/photo-1499447155021-4907f71b9ef5?auto=format&fit=crop&w=1600&q=80",
    subjects: [
      {
        slug: "political-science",
        name: "Political Science",
        shortName: "Politics",
        code: "POL",
        description: "Political theory, institutions and governance.",
        icon: Palette,
        status: "preview",
      },
      {
        slug: "geography",
        name: "Geography",
        shortName: "Geography",
        code: "GEO",
        description: "Physical and human geography.",
        icon: Palette,
        status: "preview",
      },
      {
        slug: "logic",
        name: "Logic & Scientific Method",
        shortName: "Logic",
        code: "LSM",
        description: "Formal reasoning and the philosophy of science.",
        icon: Palette,
        status: "preview",
      },
      {
        slug: "history",
        name: "History",
        shortName: "History",
        code: "HIS",
        description: "Sri Lankan and world history.",
        icon: Palette,
        status: "preview",
      },
    ],
  },
];

export function getStream(slug: string) {
  return STREAMS.find((s) => s.slug === slug);
}
