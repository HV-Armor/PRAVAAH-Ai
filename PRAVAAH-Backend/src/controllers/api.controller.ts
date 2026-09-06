import { Request, Response } from 'express';
import { dbStore } from '../store/database';
import { telemetryService } from '../services/telemetry.service';
import { pipelineService } from '../services/pipeline.service';

export class ApiController {
  // POST /init
  public async initializeAgent(req: Request, res: Response) {
    try {
      const { focusAreas, threshold } = req.body;
      const updatedConfig = dbStore.updateConfig({
        ...(focusAreas && { focusAreas }),
        ...(threshold !== undefined && { threshold: Number(threshold) })
      });

      telemetryService.addLog(`[Agent Init] Configuration updated! Focus Areas: [${updatedConfig.focusAreas.join(', ')}], Threshold: ${updatedConfig.threshold}`);

      return res.status(200).json({
        success: true,
        message: `PRAVAAH Agent Initialized! Focus Areas: [${updatedConfig.focusAreas.join(', ')}], Signal Threshold: ${updatedConfig.threshold}`,
        data: updatedConfig
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // GET /feed
  public async getFeed(req: Request, res: Response) {
    try {
      const feed = dbStore.getFeed();
      return res.status(200).json(feed);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /feed/trigger
  public async triggerFeedScan(req: Request, res: Response) {
    try {
      telemetryService.addLog('[Manual Trigger] Discovery scan requested via API.');
      pipelineService.runSingleCycle(); // non-blocking background cycle
      return res.status(202).json({ success: true, message: 'Discovery scan triggered successfully.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET /audit
  public async getAuditLog(req: Request, res: Response) {
    try {
      const audit = dbStore.getAuditLogs();
      return res.status(200).json(audit);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET /telemetry
  public async getTelemetry(req: Request, res: Response) {
    try {
      const telemetry = dbStore.getTelemetry();
      return res.status(200).json(telemetry);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET /telemetry/stream (SSE)
  public streamTelemetry(req: Request, res: Response) {
    telemetryService.subscribe(res);
  }

  // GET /knowledge-graph
  public async getKnowledgeGraph(req: Request, res: Response) {
    try {
      const nodes = dbStore.getGraphNodes();
      const telemetry = dbStore.getTelemetry();
      return res.status(200).json({
        nodes,
        totalVectors: telemetry.activeMemoryVectors,
        dimension: '1,536-d',
        latencyMs: telemetry.avgLatencyMs
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET /flow/status
  public async getFlowStatus(req: Request, res: Response) {
    try {
      const telemetry = dbStore.getTelemetry();
      return res.status(200).json({
        loopStatus: telemetry.autonomousLoopStatus,
        currentStage: telemetry.currentStage,
        lastCycleTimestamp: telemetry.lastCycleTimestamp,
        recentLogs: telemetryService.getRecentLogs()
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /flow/run
  public async runFlowCycle(req: Request, res: Response) {
    try {
      telemetryService.addLog('[Manual Trigger] Executing 4-Stage Pipeline Run...');
      await pipelineService.runSingleCycle();
      return res.status(200).json({
        success: true,
        message: '4-Stage AI Pipeline completed cycle successfully.',
        telemetry: dbStore.getTelemetry()
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export const apiController = new ApiController();
