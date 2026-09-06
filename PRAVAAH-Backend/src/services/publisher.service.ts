import { dbStore } from '../store/database';
import { telemetryService } from './telemetry.service';
import { EvaluatedTopic } from './evaluator.service';
import { IntelligenceFeedItem } from '../types';

export class PublisherService {
  public async publishInsight(evaluated: EvaluatedTopic): Promise<IntelligenceFeedItem> {
    telemetryService.updateTelemetryStage('Publishing');
    telemetryService.addLog(`Publishing Stage: Synthesizing editorial breakdown for "${evaluated.candidate.topic.substring(0, 40)}..."`);

    const depthScore = Math.floor(evaluated.auditItem.noveltyScore * 100);
    const confidence = Math.floor(evaluated.auditItem.signalToNoiseRatio * 100);

    const feedItem: IntelligenceFeedItem = {
      id: `feed-${Date.now()}`,
      title: evaluated.candidate.topic,
      category: evaluated.candidate.category,
      source: evaluated.candidate.source,
      depthScore,
      confidence,
      summary: evaluated.candidate.summaryHint,
      systemRationale: `High technical novelty (${evaluated.auditItem.noveltyScore}) and signal-to-noise ratio (${evaluated.auditItem.signalToNoiseRatio}). Passes 0.75 depth discriminator.`,
      fullAnalysis: `${evaluated.candidate.summaryHint} This paper/repository provides architectural improvements, optimizing execution bottlenecks and advancing state-of-the-art capability in ${evaluated.candidate.category}.`,
      tags: [evaluated.candidate.category, evaluated.candidate.source, 'Pravaah AI', 'Verified Signal'],
      timestamp: 'Just now',
      url: evaluated.candidate.url,
      authorOrRepo: evaluated.candidate.authorOrRepo
    };

    dbStore.addFeedItem(feedItem);
    telemetryService.addLog(`Publishing Stage: Published Intelligence Feed Article "${feedItem.title.substring(0, 45)}...".`);

    return feedItem;
  }
}

export const publisherService = new PublisherService();
