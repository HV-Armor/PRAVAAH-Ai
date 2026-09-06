import { discoveryService } from './discovery.service';
import { evaluatorService } from './evaluator.service';
import { memoryService } from './memory.service';
import { publisherService } from './publisher.service';
import { telemetryService } from './telemetry.service';
import { dbStore } from '../store/database';

export class PipelineService {
  private timer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  public startBackgroundLoop(intervalMs: number = 20000) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    telemetryService.addLog(`[Pipeline Engine] Starting 24/7 autonomous background worker loop (Interval: ${intervalMs / 1000}s)...`);
    
    // Run initial cycle immediately after 3s
    setTimeout(() => this.runSingleCycle(), 3000);

    this.timer = setInterval(() => {
      this.runSingleCycle();
    }, intervalMs);
  }

  public stopBackgroundLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    telemetryService.updateTelemetryStage('Discovery', 'IDLE');
    telemetryService.addLog('[Pipeline Engine] Background worker loop PAUSED.');
  }

  public async runSingleCycle() {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      telemetryService.updateTelemetryStage('Discovery', 'ACTIVE');
      
      // Stage 1: Discovery
      const rawCandidates = await discoveryService.scanSources();

      // Stage 2: Evaluation
      for (const candidate of rawCandidates) {
        const evalResult = await evaluatorService.evaluate(candidate);
        
        if (evalResult.passed) {
          // Stage 3: Research & Memory
          await memoryService.synthesizeMemory(evalResult);
          
          // Stage 4: Publishing
          await publisherService.publishInsight(evalResult);
        }
      }

      telemetryService.updateTelemetryStage('Publishing', 'ACTIVE');
      telemetryService.addLog('[Pipeline Engine] Cycle execution complete. Resting until next tick.');

    } catch (err: any) {
      telemetryService.addLog(`[Pipeline Engine Error] Cycle failed: ${err.message || err}`);
    } finally {
      this.isRunning = false;
    }
  }
}

export const pipelineService = new PipelineService();
