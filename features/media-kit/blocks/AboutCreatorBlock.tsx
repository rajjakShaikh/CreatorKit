"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, X, Globe, MessageSquare } from "lucide-react";
import type { AboutCreatorContent } from "../lib/types";

interface EditorProps {
  content: AboutCreatorContent;
  onChange: (updates: Partial<AboutCreatorContent>) => void;
}

export function AboutCreatorEditor({ content, onChange }: EditorProps) {
  const [newNiche, setNewNiche] = useState("");

  const addNiche = () => {
    if (newNiche.trim() && !content.niche.includes(newNiche.trim())) {
      onChange({ niche: [...content.niche, newNiche.trim()] });
      setNewNiche("");
    }
  };

  const removeNiche = (indexToRemove: number) => {
    onChange({ niche: content.niche.filter((_, idx) => idx !== indexToRemove) });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          value={content.displayName}
          onChange={(e) => onChange({ displayName: e.target.value })}
          placeholder="e.g. Alex Chen"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          value={content.tagline}
          onChange={(e) => onChange({ tagline: e.target.value })}
          placeholder="e.g. Lifestyle & Tech Storyteller"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          value={content.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Brief intro..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={content.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            value={content.avatarUrl}
            onChange={(e) => onChange({ avatarUrl: e.target.value })}
            placeholder="Image URL"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="coverUrl">Cover Image URL</Label>
        <Input
          id="coverUrl"
          value={content.coverUrl}
          onChange={(e) => onChange({ coverUrl: e.target.value })}
          placeholder="Cover URL"
        />
      </div>

      <div className="space-y-2">
        <Label>Niches / Tags</Label>
        <div className="flex flex-wrap gap-1.5 p-2 rounded-lg border bg-muted/20 min-h-[40px]">
          {content.niche.length === 0 ? (
            <span className="text-xs text-muted-foreground self-center">No tags added yet.</span>
          ) : (
            content.niche.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="gap-1 pr-1 text-xs">
                {tag}
                <button
                  type="button"
                  onClick={() => removeNiche(idx)}
                  className="rounded-full hover:bg-muted p-0.5"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={newNiche}
            onChange={(e) => setNewNiche(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addNiche())}
            placeholder="Add niche tag..."
            className="h-8 text-xs"
          />
          <Button type="button" size="sm" variant="outline" className="h-8" onClick={addNiche}>
            <Plus className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DisplayProps {
  content: AboutCreatorContent;
}

export function AboutCreatorDisplay({ content }: DisplayProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm @container">
      {/* Cover Image */}
      <div className="h-36 @sm:h-48 @md:h-64 w-full overflow-hidden bg-muted relative">
        {content.coverUrl ? (
          <img
            src={content.coverUrl}
            alt="Creator Cover"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="px-4 @sm:px-6 @md:px-8 pb-6 @sm:pb-8 pt-0 relative flex flex-col @sm:flex-row items-center @sm:items-end gap-4 @sm:gap-5 -mt-10 @sm:-mt-12 @md:-mt-16">
        {/* Avatar */}
        <div className="size-20 @sm:size-24 @md:size-32 rounded-full border-4 border-card overflow-hidden shadow-lg bg-muted shrink-0 z-10">
          {content.avatarUrl ? (
            <img
              src={content.avatarUrl}
              alt={content.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
              {content.displayName.charAt(0)}
            </div>
          )}
        </div>

        {/* Name and Tagline */}
        <div className="text-center @sm:text-left flex-1 min-w-0 z-10 @sm:mb-1">
          <div className="flex flex-col @sm:flex-row items-center gap-1.5 @sm:gap-2 justify-center @sm:justify-start">
            <h2 className="text-xl @sm:text-2xl @md:text-3xl font-extrabold tracking-tight text-foreground truncate">
              {content.displayName || "New Creator"}
            </h2>
            <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 shadow-2xs">
              <span className="size-1 rounded-full bg-emerald-500 animate-ping" />
              <span>Verified Creator</span>
            </span>
          </div>
          <p className="text-xs @sm:text-sm @md:text-base font-semibold text-primary/80 mt-1 truncate">
            {content.tagline || "Creator tagline"}
          </p>
        </div>

        {/* Location Badge */}
        {content.location && (
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3.5 py-1.5 rounded-full border border-border/50 shrink-0 z-10">
            <MapPin className="size-3.5 text-primary" />
            <span>{content.location}</span>
          </div>
        )}
      </div>

      {/* Bio and Niches */}
      <div className="px-4 @sm:px-6 @md:px-8 pb-6 @sm:pb-8 pt-4 @sm:pt-6 border-t border-border/40 bg-muted/5 flex flex-col @md:flex-row @md:items-center justify-between gap-4 @sm:gap-6">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
            {content.bio || "Write your bio description here..."}
          </p>
        </div>

        {content.niche && content.niche.length > 0 && (
          <div className="flex flex-wrap gap-1.5 @md:justify-end shrink-0 max-w-sm">
            {content.niche.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-primary/5 border-primary/20 text-primary text-xs font-semibold">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
