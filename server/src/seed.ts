import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import defaultContent from '../default-content.json' with { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const email = process.env.ADMIN_EMAIL || 'admin@skooture.ai';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      role: 'admin',
    },
  });

  console.log(`Admin user created: ${admin.email}`);

  // Seed default content
  const contentEntries = Object.entries(defaultContent);
  for (const [key, value] of contentEntries) {
    await prisma.content.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: {
        key,
        value: JSON.stringify(value),
        updatedById: admin.id,
      },
    });
  }

  console.log(`Seeded ${contentEntries.length} content entries`);
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
