"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Percent } from "lucide-react";
import { motion } from "framer-motion";
import type { DemographicsContent, DemographicsMetric, DemographicsChartItem } from "../lib/types";

interface EditorProps {
  content: DemographicsContent;
  onChange: (updates: Partial<DemographicsContent>) => void;
}

export function DemographicsEditor({ content, onChange }: EditorProps) {
  const [newMetricLabel, setNewMetricLabel] = useState("");
  const [newMetricValue, setNewMetricValue] = useState("");

  const [newLocCountry, setNewLocCountry] = useState("");
  const [newLocPercent, setNewLocPercent] = useState(0);

  // Helper updates
  const updateMetric = (idx: number, updates: Partial<DemographicsMetric>) => {
    const updated = content.metrics.map((m, i) => (i === idx ? { ...m, ...updates } : m));
    onChange({ metrics: updated });
  };

  const addMetric = () => {
    if (newMetricLabel.trim() && newMetricValue.trim()) {
      onChange({
        metrics: [...content.metrics, { label: newMetricLabel.trim(), value: newMetricValue.trim() }],
      });
      setNewMetricLabel("");
      setNewMetricValue("");
    }
  };

  const removeMetric = (idx: number) => {
    onChange({ metrics: content.metrics.filter((_, i) => i !== idx) });
  };

  const updateGender = (idx: number, percentage: number) => {
    const updated = content.genderSplit.map((g, i) => (i === idx ? { ...g, percentage } : g));
    onChange({ genderSplit: updated });
  };

  const updateAgeGroup = (idx: number, percentage: number) => {
    const updated = content.ageGroups.map((a, i) => (i === idx ? { ...a, percentage } : a));
    onChange({ ageGroups: updated });
  };

  const addLocation = () => {
    if (newLocCountry.trim() && newLocPercent > 0) {
      onChange({
        topLocations: [
          ...content.topLocations,
          { country: newLocCountry.trim(), percentage: Number(newLocPercent) },
        ],
      });
      setNewLocCountry("");
      setNewLocPercent(0);
    }
  };

  const removeLocation = (idx: number) => {
    onChange({ topLocations: content.topLocations.filter((_, i) => i !== idx) });
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
          placeholder="e.g. Audience Demographics"
        />
      </div>

      {/* Metrics List */}
      <div className="space-y-2">
        <Label>Key Highlights / Metrics</Label>
        <div className="space-y-2">
          {content.metrics.map((m, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input
                value={m.label}
                onChange={(e) => updateMetric(idx, { label: e.target.value })}
                placeholder="Label (e.g. Top Country)"
                className="flex-1 h-8 text-xs"
              />
              <Input
                value={m.value}
                onChange={(e) => updateMetric(idx, { value: e.target.value })}
                placeholder="Value (e.g. US)"
                className="w-1/3 h-8 text-xs"
              />
              <Button
                variant="destructive"
                size="icon-xs"
                onClick={() => removeMetric(idx)}
                className="size-8"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2 pt-2 border-t border-border/50">
          <Input
            value={newMetricLabel}
            onChange={(e) => setNewMetricLabel(e.target.value)}
            placeholder="New label..."
            className="flex-1 h-8 text-xs"
          />
          <Input
            value={newMetricValue}
            onChange={(e) => setNewMetricValue(e.target.value)}
            placeholder="New value..."
            className="w-1/3 h-8 text-xs"
          />
          <Button size="sm" variant="outline" className="h-8" onClick={addMetric}>
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Gender Splits */}
      <div className="space-y-2">
        <Label>Gender Split (%)</Label>
        <div className="grid grid-cols-3 gap-2">
          {content.genderSplit.map((g, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-xs text-muted-foreground">{g.category}</span>
              <div className="relative flex items-center">
                <Input
                  type="number"
                  value={g.percentage}
                  onChange={(e) => updateGender(idx, Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="h-8 pr-6 text-xs"
                />
                <span className="absolute right-2 text-xs text-muted-foreground">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age Groups */}
      <div className="space-y-2">
        <Label>Age Brackets (%)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {content.ageGroups.map((a, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-xs text-muted-foreground">{a.category}</span>
              <div className="relative flex items-center">
                <Input
                  type="number"
                  value={a.percentage}
                  onChange={(e) => updateAgeGroup(idx, Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="h-8 pr-6 text-xs"
                />
                <span className="absolute right-2 text-xs text-muted-foreground">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="space-y-2">
        <Label>Top Country Locations</Label>
        <div className="space-y-2">
          {content.topLocations.map((loc, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <span className="text-xs font-medium flex-1">{loc.country}</span>
              <span className="text-xs text-muted-foreground">{loc.percentage}%</span>
              <Button variant="destructive" size="icon-xs" onClick={() => removeLocation(idx)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2 pt-2 border-t border-border/50">
          <Input
            value={newLocCountry}
            onChange={(e) => setNewLocCountry(e.target.value)}
            placeholder="Country name..."
            className="flex-1 h-8 text-xs"
          />
          <div className="relative w-1/3">
            <Input
              type="number"
              value={newLocPercent || ""}
              onChange={(e) => setNewLocPercent(Number(e.target.value))}
              placeholder="%"
              className="h-8 pr-6 text-xs"
            />
            <span className="absolute right-2 top-2 text-xs text-muted-foreground">%</span>
          </div>
          <Button size="sm" variant="outline" className="h-8" onClick={addLocation}>
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DisplayProps {
  content: DemographicsContent;
}

export function DemographicsDisplay({ content }: DisplayProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm @container">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mb-4">
        {content.title || "Audience Demographics"}
      </h3>

      {/* Key Highlights Grid */}
      {content.metrics && content.metrics.length > 0 && (
        <div className="grid grid-cols-2 @md:grid-cols-3 gap-4 mb-6">
          {content.metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-muted/30 border border-border/40">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {m.label}
              </p>
              <p className="text-lg font-bold text-foreground mt-1 tracking-tight">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 @md:grid-cols-2">
        {/* Gender Splits & Age Groups */}
        <div className="space-y-4">
          {/* Gender Split progress bars */}
          {content.genderSplit && content.genderSplit.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-2">
                Gender Identity
              </h4>
              <div className="space-y-2">
                {content.genderSplit.map((g, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{g.category}</span>
                      <span>{g.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${g.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Age Brackets progress bars */}
          {content.ageGroups && content.ageGroups.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-2">
                Age Distribution
              </h4>
              <div className="space-y-2">
                {content.ageGroups.map((a, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{a.category}</span>
                      <span>{a.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${a.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top Locations list */}
        {content.topLocations && content.topLocations.length > 0 && (
          <div className="rounded-lg border border-border/40 p-4 bg-muted/10 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-3">
                Top Geographical Markets
              </h4>
              <div className="space-y-3">
                {content.topLocations.map((loc, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{loc.country}</span>
                      <span className="text-muted-foreground">{loc.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary/70"
                        initial={{ width: 0 }}
                        animate={{ width: `${loc.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
