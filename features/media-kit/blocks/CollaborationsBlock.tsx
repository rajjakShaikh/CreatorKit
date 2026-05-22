"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Sparkles } from "lucide-react";
import type { CollaborationsContent, CollaborationItem } from "../lib/types";

interface EditorProps {
  content: CollaborationsContent;
  onChange: (updates: Partial<CollaborationsContent>) => void;
}

export function CollaborationsEditor({ content, onChange }: EditorProps) {
  const [newBrandName, setNewBrandName] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [newCampaignTitle, setNewCampaignTitle] = useState("");
  const [newMetrics, setNewMetrics] = useState("");

  const updateBrandItem = (id: string, updates: Partial<CollaborationItem>) => {
    const updated = content.brands.map((b) => (b.id === id ? { ...b, ...updates } : b));
    onChange({ brands: updated });
  };

  const addBrandItem = () => {
    if (newBrandName.trim()) {
      const id = `collab-item-${Math.random().toString(36).substring(2, 9)}`;
      const newItem: CollaborationItem = {
        id,
        brandName: newBrandName.trim(),
        brandLogoUrl: newLogoUrl.trim() || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        campaignTitle: newCampaignTitle.trim() || "Influencer Promotion",
        metrics: newMetrics.trim() || "Successful Campaign",
      };
      onChange({ brands: [...content.brands, newItem] });
      setNewBrandName("");
      setNewLogoUrl("");
      setNewCampaignTitle("");
      setNewMetrics("");
    }
  };

  const removeBrandItem = (id: string) => {
    onChange({ brands: content.brands.filter((b) => b.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <Label htmlFor="blockTitle">Block Title</Label>
        <Input
          id="blockTitle"
          value={content.title || ""}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Previous Collaborations"
        />
      </div>

      {/* Brands List */}
      <div className="space-y-4">
        <Label>Campaigns & Partners</Label>
        <div className="space-y-3">
          {content.brands.map((b) => (
            <div key={b.id} className="p-3 rounded-lg border bg-muted/10 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary">{b.brandName}</span>
                <Button
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => removeBrandItem(b.id)}
                  className="size-7"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Brand Name</span>
                  <Input
                    value={b.brandName}
                    onChange={(e) => updateBrandItem(b.id, { brandName: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Campaign Title</span>
                  <Input
                    value={b.campaignTitle}
                    onChange={(e) => updateBrandItem(b.id, { campaignTitle: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Key Result / Metric</span>
                  <Input
                    value={b.metrics}
                    onChange={(e) => updateBrandItem(b.id, { metrics: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Logo Image URL</span>
                  <Input
                    value={b.brandLogoUrl}
                    onChange={(e) => updateBrandItem(b.id, { brandLogoUrl: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Campaign */}
        <div className="p-3 rounded-lg border border-dashed bg-muted/5 space-y-3 mt-4">
          <span className="text-xs font-bold text-muted-foreground">Add New Collaboration</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Brand Name</span>
              <Input
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="e.g. Nike"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Campaign Title</span>
              <Input
                value={newCampaignTitle}
                onChange={(e) => setNewCampaignTitle(e.target.value)}
                placeholder="e.g. Air Max Campaign"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Key Metric</span>
              <Input
                value={newMetrics}
                onChange={(e) => setNewMetrics(e.target.value)}
                placeholder="e.g. 5.8% CTR"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Logo URL</span>
              <Input
                value={newLogoUrl}
                onChange={(e) => setNewLogoUrl(e.target.value)}
                placeholder="Image URL"
                className="h-8 text-xs"
              />
            </div>
          </div>
          <Button type="button" size="sm" className="w-full h-8 mt-1" onClick={addBrandItem}>
            <Plus className="size-3.5 mr-1" /> Add Collaboration
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DisplayProps {
  content: CollaborationsContent;
}

export function CollaborationsDisplay({ content }: DisplayProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm @container">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mb-4">
        {content.title || "Previous Collaborations"}
      </h3>

      <div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
        {content.brands && content.brands.length > 0 ? (
          content.brands.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border/40 bg-muted/10 hover:shadow-xs transition-all hover:bg-muted/20"
            >
              {/* Brand Logo */}
              <div className="size-12 rounded-lg overflow-hidden bg-background border flex items-center justify-center shrink-0">
                {b.brandLogoUrl ? (
                  <img
                    src={b.brandLogoUrl}
                    alt={b.brandName}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop";
                    }}
                  />
                ) : (
                  <Sparkles className="size-5 text-muted-foreground" />
                )}
              </div>

              {/* Campaign details */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-foreground truncate uppercase tracking-wider">
                  {b.brandName}
                </p>
                <p className="text-xs text-muted-foreground truncate font-medium">
                  {b.campaignTitle}
                </p>
                <span className="inline-block text-[10px] text-primary bg-primary/10 font-bold px-1.5 py-0.5 rounded-md mt-1">
                  {b.metrics}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No brand collaborations listed yet.
          </div>
        )}
      </div>
    </div>
  );
}
