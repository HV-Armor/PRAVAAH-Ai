'use client';

import React, { useState, useEffect } from 'react';
import { fetchIntelligenceFeed, triggerFeedScan, IntelligenceFeedItem } from '@/services/api';
import FeedCard from '@/components/FeedCard';
import FeedModal from '@/components/FeedModal';
import { Radio, Search, Filter, RefreshCw, Sparkles } from 'lucide-react';

export default function FeedPage() {
  const [items, setItems] = useState<IntelligenceFeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'depth' | 'confidence'>('newest');
  const [activeModalItem, setActiveModalItem] = useState<IntelligenceFeedItem | null>(null);

  const loadFeed = async () => {
    setLoading(true);
    const data = await fetchIntelligenceFeed();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 15000); // Auto-refresh feed every 15s
    return () => clearInterval(interval);
  }, []);

  const handleTriggerScan = async () => {
    setIsScanning(true);
    await triggerFeedScan();
    setTimeout(async () => {
      await loadFeed();
      setIsScanning(false);
    }, 2000);
  };

  const categories = ['All', 'LLMs', 'Autonomous Agents', 'Quantum Computing', 'Multimodal AI'];

  // Filtering & Sorting logic
  const filteredItems = items
    .filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'depth') return b.depthScore - a.depthScore;
      if (sortBy === 'confidence') return b.confidence - a.confidence;
      return 0; // Newest by default
    });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-pravaah-outline/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-teal/10 border border-pravaah-teal/30 text-pravaah-primary font-mono text-xs mb-2">
            <Radio className="w-3.5 h-3.5 text-pravaah-cyan animate-pulse" />
            AUTONOMOUS RESEARCH PUBLICATION
          </div>
          <h1 className="font-sans text-3xl font-bold text-pravaah-text">
            Live Intelligence Feed (/feed)
          </h1>
          <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
            Real-time feed of technical papers and code breakthroughs synthesized autonomously by PRAVAAH.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pravaah-teal/15 border border-pravaah-teal/40 text-pravaah-primary font-mono text-xs font-semibold hover:bg-pravaah-teal/25 hover:border-pravaah-cyan transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-pravaah-cyan ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Repos...' : 'Trigger Scan (POST /feed/trigger)'}</span>
          </button>

          <div className="flex items-center gap-2 bg-pravaah-lowest border border-pravaah-outline/40 px-3 py-2 rounded-xl font-mono text-xs text-pravaah-cyan">
            <Sparkles className="w-4 h-4 text-pravaah-teal" />
            <span>{filteredItems.length} Insights Active</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 surface-card p-4 rounded-xl border border-pravaah-outline/40">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-pravaah-teal text-pravaah-bg font-bold shadow-[0_0_15px_rgba(0,184,169,0.3)]'
                  : 'bg-pravaah-lowest text-pravaah-muted border border-pravaah-outline/40 hover:border-pravaah-cyan'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative flex-grow md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pravaah-muted/60" />
            <input
              type="text"
              placeholder="Search feed, tags, papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-pravaah-lowest border border-pravaah-outline/40 rounded-lg pl-9 pr-3 py-1.5 font-mono text-xs text-pravaah-text focus:border-pravaah-cyan focus:outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-pravaah-lowest border border-pravaah-outline/40 rounded-lg px-3 py-1.5 font-mono text-xs text-pravaah-text focus:border-pravaah-cyan focus:outline-none"
          >
            <option value="newest">Sort: Newest</option>
            <option value="depth">Sort: High Depth</option>
            <option value="confidence">Sort: High Confidence</option>
          </select>
        </div>
      </div>

      {/* Feed Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="surface-card p-12 rounded-xl text-center flex flex-col items-center gap-3 border border-pravaah-outline/40">
          <Filter className="w-8 h-8 text-pravaah-muted/50" />
          <h3 className="font-sans text-lg font-bold text-pravaah-text">No Insights Found</h3>
          <p className="font-mono text-xs text-pravaah-muted">
            Try adjusting your search criteria or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <FeedCard key={item.id} item={item} onSelect={(selected) => setActiveModalItem(selected)} />
          ))}
        </div>
      )}

      {/* Modal */}
      {activeModalItem && (
        <FeedModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />
      )}
    </div>
  );
}
