import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Every module gets the last 3 years of past papers for its exam part, plus
// a notes set and a slides set. Swap the placeholder `fileUrl`/`videoUrl`
// values below for your real PDFs (dropped into /public/resources/...) and
// YouTube links -- the Resource Hub UI already renders whatever is here.
function pastPapersFor(examPart: string) {
  return [2023, 2022, 2021].map((year) => ({
    year,
    title: `${year} A/L SFT — Part ${examPart}`,
    fileUrl: `/resources/past-papers/${year}-part-${examPart.toLowerCase()}.pdf`,
  }));
}

function studyMaterialsFor(name: string) {
  const base = slug(name);
  return [
    {
      title: `${name} — Revision Notes`,
      type: 'Notes',
      fileUrl: `/resources/notes/${base}-notes.pdf`,
    },
    {
      title: `${name} — Summary Slides`,
      type: 'Slides',
      fileUrl: `/resources/notes/${base}-slides.pdf`,
    },
  ];
}

async function main() {
  // Clear existing data to prevent duplicates during testing
  await prisma.question.deleteMany();
  await prisma.pastPaper.deleteMany();
  await prisma.studyMaterial.deleteMany();
  await prisma.module.deleteMany();

  // Official SFT Modules mapped with Priority Weights and Tiers[cite: 1]
  const modules = [
    {
      name: "Cellular Organization & Microbiology",
      subject: "Biology",
      priorityPercent: 8.33,
      tier: 1,
      examPart: "A",
    },
    {
      name: "Descriptive Statistics",
      subject: "Maths",
      priorityPercent: 7.50,
      tier: 1,
      examPart: "B",
    },
    {
      name: "Natural Products & Extraction Methods",
      subject: "Chemistry",
      priorityPercent: 7.17,
      tier: 1,
      examPart: "C",
    },
    {
      name: "Force & its Effects",
      subject: "Physics",
      priorityPercent: 7.00,
      tier: 1,
      examPart: "A",
    },
    {
      name: "Technology & Environmental Balance",
      subject: "Chem/Env",
      priorityPercent: 6.00,
      tier: 1,
      examPart: "C",
    },
    {
      name: "Work, Energy & Power",
      subject: "Physics",
      priorityPercent: 2.33,
      tier: 1,
      examPart: "A",
    },
    {
      name: "Chemical Industries in Sri Lanka",
      subject: "Chemistry",
      priorityPercent: 5.83,
      tier: 2,
      examPart: "C",
    },
    {
      name: "Electricity, Magnetism & Electromagnetic Induction",
      subject: "Physics",
      priorityPercent: 4.50,
      tier: 2,
      examPart: "D",
    },
    {
      name: "Area & Volume",
      subject: "Maths",
      priorityPercent: 2.83,
      tier: 3,
      examPart: "B",
    },
    {
      name: "Measuring Units & Instruments",
      subject: "Physics",
      priorityPercent: 2.00,
      tier: 3,
      examPart: "A",
    }
  ];

  console.log('Seeding official SFT modules with resources...');

  for (const mod of modules) {
    await prisma.module.create({
      data: {
        ...mod,
        // No video wired up yet -- paste a real YouTube URL here (e.g.
        // "https://www.youtube.com/watch?v=XXXXXXXXXXX") and it renders in
        // the Resource Hub's inline player automatically.
        videoUrl: null,
        pastPapers: { create: pastPapersFor(mod.examPart) },
        studyMaterials: { create: studyMaterialsFor(mod.name) },
      },
    });
  }

  console.log('Database successfully seeded with standard competencies.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
