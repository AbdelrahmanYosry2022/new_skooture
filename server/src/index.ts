import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';

dotenv.config();

import authRoutes from './routes/auth';
import contentRoutes from './routes/content';
import messagesRoutes from './routes/messages';
import subscribersRoutes from './routes/subscribers';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS - إعدادات مرنة للموقع
app.use(cors({
  origin: true, // يسمح لجميع المصادر حالياً لحل مشكلة الـ CORS نهائياً
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// Health check - للتأكد أن السيرفر يعمل
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/subscribers', subscribersRoutes);

// Error handler - محسّن ليظهر تفاصيل الخطأ في Railway logs
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('🔴 Global Error Handler:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// تعديل هام جداً لـ Railway: الاستماع على 0.0.0.0
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server is ready and listening on port ${PORT}`);
});