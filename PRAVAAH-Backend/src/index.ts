import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { pipelineService } from './services/pipeline.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const LOOP_INTERVAL = Number(process.env.BACKGROUND_LOOP_INTERVAL_MS) || 20000;

// Middlewares
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root & Health check routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    service: 'PRAVAAH Intelligence Platform Backend',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: {
      endpoints: [
        'POST /init',
        'GET /feed',
        'POST /feed/trigger',
        'GET /audit',
        'GET /telemetry',
        'GET /telemetry/stream',
        'GET /knowledge-graph',
        'GET /flow/status',
        'POST /flow/run'
      ]
    }
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/', routes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  PRAVAAH Intelligence Platform Backend Server`);
  console.log(`  Running on http://localhost:${PORT}`);
  console.log(`=======================================================`);

  // Start Autonomous 4-Stage Background Worker Loop
  pipelineService.startBackgroundLoop(LOOP_INTERVAL);
});

export default app;

