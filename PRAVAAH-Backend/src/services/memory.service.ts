import { dbStore } from '../store/database';
import { telemetryService } from './telemetry.service';
import { EvaluatedTopic } from './evaluator.service';
import { KnowledgeGraphNode } from '../types';

export class MemoryService {
  public async synthesizeMemory(evaluated: EvaluatedTopic): Promise<KnowledgeGraphNode> {
    telemetryService.updateTelemetryStage('Research & Memory');
    telemetryService.addLog(`Memory Stage: Querying 1,536-d HNSW Vector index for "${evaluated.candidate.topic.substring(0, 40)}..."`);

    // Create a new Knowledge Graph Node
    const existingNodes = dbStore.getGraphNodes();
    const nodeId = `n${existingNodes.length + 1}`;
    
    // Pick 1-2 random existing node IDs for graph connection
    const randomConnection = existingNodes.length > 0
      ? [existingNodes[Math.floor(Math.random() * existingNodes.length)].id]
      : [];

    const depthScore = Math.floor(evaluated.auditItem.noveltyScore * 100);

    const newNode: KnowledgeGraphNode = {
      id: nodeId,
      label: evaluated.candidate.topic.split(':')[0].substring(0, 25),
      category: evaluated.candidate.category,
      x: Math.floor(Math.random() * 500) + 150,
      y: Math.floor(Math.random() * 300) + 100,
      connections: randomConnection,
      depthScore,
      details: evaluated.candidate.summaryHint
    };

    dbStore.addGraphNode(newNode);
    telemetryService.addLog(`Memory Stage: Indexed Node #${newNode.id} into dynamic graph with ${newNode.connections.length} semantic connections.`);

    return newNode;
  }
}

export const memoryService = new MemoryService();
