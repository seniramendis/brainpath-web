import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to prevent duplicates during testing
  await prisma.question.deleteMany();
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

  console.log('Seeding official SFT modules...');

  for (const mod of modules) {
    await prisma.module.create({
      data: mod,
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