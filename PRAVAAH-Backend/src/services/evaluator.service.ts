import { dbStore } from '../store/database';
import { telemetryService } from './telemetry.service';
import { RawTopicCandidate } from './discovery.service';
import { AuditLogItem } from '../types';

export interface EvaluatedTopic {
  candidate: RawTopicCandidate;
  auditItem: AuditLogItem;
  passed: boolean;
}

export class EvaluatorService {
  public async evaluate(candidate: RawTopicCandidate): Promise<EvaluatedTopic> {
    telemetryService.updateTelemetryStage('Evaluation');
    const threshold = dbStore.getConfig().threshold;

    // Compute metrics
    const noveltyScore = Number(Math.min(1.0, Math.max(0.05, candidate.rawSignalScore + (Math.random() * 0.08 - 0.04))).toFixed(2));
    const signalToNoiseRatio = Number(Math.min(1.0, Math.max(0.05, candidate.rawSignalScore + (Math.random() * 0.06 - 0.03))).toFixed(2));

    const passed = signalToNoiseRatio >= threshold;

    let rejectionReason: string | undefined = undefined;
    if (!passed) {
      rejectionReason = `High Noise / Repetitive content (Signal: ${signalToNoiseRatio} < ${threshold} threshold). Lacks technical depth or architectural novelty.`;
    }

    const auditItem: AuditLogItem = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      topic: candidate.topic,
      category: candidate.category,
      source: `${candidate.source}: ${candidate.authorOrRepo || 'Web'}`,
      status: passed ? 'APPROVED' : 'REJECTED',
      noveltyScore,
      signalToNoiseRatio,
      threshold,
      rejectionReason,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    dbStore.addAuditLog(auditItem);

    if (passed) {
      telemetryService.addLog(`Evaluation Stage: Approved "${candidate.topic.substring(0, 45)}..." (Signal: ${signalToNoiseRatio} >= ${threshold}).`);
    } else {
      telemetryService.addLog(`Evaluation Stage: REJECTED "${candidate.topic.substring(0, 45)}..." (Signal: ${signalToNoiseRatio} < ${threshold}).`);
    }

    return { candidate, auditItem, passed };
  }
}

export const evaluatorService = new EvaluatorService();
