import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import defaultContent from '../../default-content.json' with { type: 'json' };

const router = Router();

// GET /api/content - public
router.get('/', async (_req, res) => {
  try {
    const rows = await prisma.content.findMany();

    if (rows.length === 0) {
      return res.json(defaultContent);
    }

    const content: Record<string, any> = {};
    for (const row of rows) {
      content[row.key] = JSON.parse(row.value);
    }

    res.json(content);
  } catch (error) {
    console.error('Get content error (falling back to defaults):', error);
    return res.json(defaultContent);
  }
});

// PUT /api/content - protected
router.put('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid content payload' });
    }

    const operations = Object.entries(body).map(([key, value]) =>
      prisma.content.upsert({
        where: { key },
        update: {
          value: JSON.stringify(value),
          updatedById: req.userId,
        },
        create: {
          key,
          value: JSON.stringify(value),
          updatedById: req.userId,
        },
      })
    );

    await prisma.$transaction(operations);

    res.json({ success: true, message: 'Content updated' });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/content/reset - protected
router.post('/reset', authMiddleware, async (_req: AuthRequest, res) => {
  try {
    await prisma.content.deleteMany();
    res.json({ success: true, message: 'Content reset to defaults' });
  } catch (error) {
    console.error('Reset content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
