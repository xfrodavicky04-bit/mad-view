import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // 1. Create or update Default Admin
  const adminEmail = "admin@madview.com";
  const defaultPassword = "adminpassword";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      name: "Naga Vigneshwaran",
      bio: "Political writer & independent author. Writing on politics, society, and the forces shaping our world.",
      profileImage: null, // Can be uploaded later
    },
  });
  console.log(`Admin account verified: ${admin.email} (Password: ${defaultPassword})`);

  // 2. Create or update Default Site Settings
  const settings = await prisma.setting.upsert({
    where: { id: "site_settings" },
    update: {},
    create: {
      id: "site_settings",
      siteName: "MAD VIEW",
      siteDescription: "Ideas, Politics, and Society. One author, one perspective, beautifully presented.",
      accentColor: "#8b0000",
      authorName: "Naga Vigneshwaran",
      authorBio: "Political writer & independent author. Writing on politics, society, and the forces shaping our world.",
      socialLinks: JSON.stringify({
        twitter: "https://x.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
        email: "contact@madview.com",
      }),
    },
  });
  console.log(`Default site settings verified: ${settings.siteName}`);

  // 3. Create a default Category (Politics)
  const defaultCategory = await prisma.category.upsert({
    where: { slug: "politics" },
    update: {},
    create: {
      name: "Politics",
      slug: "politics",
      description: "Analysis and perspective on election cycles, institutional reforms, and public policy.",
    },
  });
  console.log(`Default category verified: ${defaultCategory.name}`);

  // 4. Create another Category (Analysis)
  const analysisCategory = await prisma.category.upsert({
    where: { slug: "analysis" },
    update: {},
    create: {
      name: "Analysis",
      slug: "analysis",
      description: "Deep dives into systemic trends, structural power shifts, and economic policies.",
    },
  });
  console.log(`Category verified: ${analysisCategory.name}`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
