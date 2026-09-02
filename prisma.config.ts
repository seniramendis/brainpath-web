import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Used by the Prisma CLI (migrate, studio, db push) — the app's own
    // client connection is configured separately in lib/db.ts via a driver
    // adapter, as required by Prisma 7.
    url: process.env.DATABASE_URL,
  },
});
