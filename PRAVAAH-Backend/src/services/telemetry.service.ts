import { Response } from 'express';
import { EventEmitter } from 'events';
import { TelemetryStats } from '../types';
import { dbStore } from '../store/database';

class TelemetryService extends EventEmitter {
  private clients: Set<Response> = new Set();
  private logs: string[] = [];

  constructor() {
    super();
    this.addLog('[System Boot] PRAVAAH Telemetry Subsystem Online.');
  }

  public subscribe(res: Response) {
    this.clients.add(res);

    // Send initial headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    // Send current telemetry state and recent logs
    const initialPayload = {
      type: 'INIT',
      telemetry: dbStore.getTelemetry(),
      logs: this.logs.slice(0, 10)
    };
    res.write(`data: ${JSON.stringify(initialPayload)}\n\n`);

    res.on('close', () => {
      this.clients.delete(res);
    });
  }

  public broadcast(event: string, data: any) {
    const payload = JSON.stringify({ type: event, data, timestamp: new Date().toISOString() });
    for (const client of this.clients) {
      client.write(`data: ${payload}\n\n`);
    }
  }

  public addLog(message: string) {
    const timestamped = `[${new Date().toLocaleTimeString()} UTC] ${message}`;
    this.logs.unshift(timestamped);
    if (this.logs.length > 50) this.logs.pop();

    this.broadcast('LOG', { message: timestamped, logs: this.logs.slice(0, 10) });
  }

  public updateTelemetryStage(stage: TelemetryStats['currentStage'], loopStatus?: TelemetryStats['autonomousLoopStatus']) {
    const updates: Partial<TelemetryStats> = {
      currentStage: stage,
      lastCycleTimestamp: 'Just now'
    };
    if (loopStatus) {
      updates.autonomousLoopStatus = loopStatus;
    }
    const current = dbStore.updateTelemetry(updates);
    this.broadcast('TELEMETRY_UPDATE', current);
  }

  public getRecentLogs(): string[] {
    return this.logs.slice(0, 10);
  }
}

export const telemetryService = new TelemetryService();
