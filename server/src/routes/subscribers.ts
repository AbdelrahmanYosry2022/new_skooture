import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

const subscriberSchema = z.object({
  email: z.string().email(),
});

// GET /api/subscribers - protected
router.get('/', authMiddleware, async (_req: AuthRequest, res) => {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(subscribers);
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/subscribers - public (newsletter form)
router.post('/', async (req, res) => {
  try {
    const data = subscriberSchema.parse(req.body);

    const existing = await prisma.subscriber.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const subscriber = await prisma.subscriber.create({
      data: {
        email: data.email,
      },
    });

    res.status(201).json(subscriber);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create subscriber error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/subscribers/:id - protected
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.subscriber.delete({ where: { id } });

    res.json({ success: true, message: 'Subscriber deleted' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;