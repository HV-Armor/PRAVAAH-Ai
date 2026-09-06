import { Router } from 'express';
import { apiController } from '../controllers/api.controller';

const router = Router();

// Agent setup & configuration
router.post('/init', apiController.initializeAgent.bind(apiController));

// Live Intelligence Feed
router.get('/feed', apiController.getFeed.bind(apiController));
router.post('/feed/trigger', apiController.triggerFeedScan.bind(apiController));

// Editorial Audit Log
router.get('/audit', apiController.getAuditLog.bind(apiController));

// Live Telemetry Stats & SSE Stream
router.get('/telemetry', apiController.getTelemetry.bind(apiController));
router.get('/telemetry/stream', apiController.streamTelemetry.bind(apiController));

// Knowledge Graph Memory
router.get('/knowledge-graph', apiController.getKnowledgeGraph.bind(apiController));

// 4-Stage AI Pipeline Execution
router.get('/flow/status', apiController.getFlowStatus.bind(apiController));
router.post('/flow/run', apiController.runFlowCycle.bind(apiController));

export default router;
