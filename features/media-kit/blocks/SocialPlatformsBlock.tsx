"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import type { SocialPlatformsContent, SocialPlatformItem } from "../lib/types";
import type { SocialPlatform } from "@/types";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.505a3.003 3.003 0 0 0-2.11 2.108C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.505 9.388.505 9.388.505s7.53 0 9.388-.505a3.003 3.003 0 0 0 2.11-2.108C24 15.983 24 12 24 12s0-3.983-.502-5.837z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.54-4.06-1.42-.45-.34-.84-.75-1.18-1.2v6.62c0 1.93-.52 3.86-1.57 5.4-1.12 1.68-2.92 2.87-4.89 3.29-2.3.52-4.82.16-6.83-1.07-2.02-1.22-3.47-3.39-3.9-5.73-.5-2.58.11-5.39 1.71-7.46 1.63-2.12 4.18-3.37 6.85-3.41v4.03c-1.52.02-3.08.72-3.94 1.97-.9 1.25-1.11 2.92-.61 4.4.47 1.45 1.71 2.65 3.2 2.98 1.34.31 2.82.02 3.89-.83.94-.73 1.44-1.89 1.44-3.1V.02z" />
  </svg>
);

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535C18.636 24 24 18.63 24 12.013 24 5.397 18.636 0 12.017 0z" />
  </svg>
);


interface EditorProps {
  content: SocialPlatformsContent;
  onChange: (updates: Partial<SocialPlatformsContent>) => void;
}

export function SocialPlatformsEditor({ content, onChange }: EditorProps) {
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>("instagram");
  const [newHandle, setNewHandle] = useState("");
  const [newFollowers, setNewFollowers] = useState(0);
  const [newEngagement, setNewEngagement] = useState(0);
  const [newUrl, setNewUrl] = useState("");

  const updatePlatformItem = (id: string, updates: Partial<SocialPlatformItem>) => {
    const updated = content.platforms.map((p) => (p.id === id ? { ...p, ...updates } : p));
    onChange({ platforms: updated });
  };

  const addPlatformItem = () => {
    if (newHandle.trim()) {
      const id = `soc-item-${Math.random().toString(36).substring(2, 9)}`;
      const newItem: SocialPlatformItem = {
        id,
        platform: newPlatform,
        handle: newHandle.trim(),
        followers: Number(newFollowers),
        engagement: Number(newEngagement),
        url: newUrl.trim() || `https://${newPlatform}.com`,
      };
      onChange({ platforms: [...content.platforms, newItem] });
      setNewHandle("");
      setNewFollowers(0);
      setNewEngagement(0);
      setNewUrl("");
    }
  };

  const removePlatformItem = (id: string) => {
    onChange({ platforms: content.platforms.filter((p) => p.id !== id) });
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
          placeholder="e.g. Social Platforms"
        />
      </div>

      {/* Social Platforms List */}
      <div className="space-y-4">
        <Label>Channels</Label>
        <div className="space-y-3">
          {content.platforms.map((p) => (
            <div key={p.id} className="p-3 rounded-lg border bg-muted/10 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-primary tracking-wider">{p.platform}</span>
                <Button
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => removePlatformItem(p.id)}
                  className="size-7"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Handle</span>
                  <Input
                    value={p.handle}
                    onChange={(e) => updatePlatformItem(p.id, { handle: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Followers</span>
                  <Input
                    type="number"
                    value={p.followers}
                    onChange={(e) => updatePlatformItem(p.id, { followers: Number(e.target.value) })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Engagement (%)</span>
                  <Input
                    type="number"
                    step="0.1"
                    value={p.engagement}
                    onChange={(e) => updatePlatformItem(p.id, { engagement: Number(e.target.value) })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Link URL</span>
                  <Input
                    value={p.url}
                    onChange={(e) => updatePlatformItem(p.id, { url: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Channel */}
        <div className="p-3 rounded-lg border border-dashed bg-muted/5 space-y-3 mt-4">
          <span className="text-xs font-bold text-muted-foreground">Add New Channel</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Platform</span>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
                className="w-full h-8 rounded-md border border-input bg-transparent px-2 text-xs"
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter / X</option>
                <option value="linkedin">LinkedIn</option>
                <option value="pinterest">Pinterest</option>
              </select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Handle</span>
              <Input
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                placeholder="@alexchen"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Followers</span>
              <Input
                type="number"
                value={newFollowers || ""}
                onChange={(e) => setNewFollowers(Number(e.target.value))}
                placeholder="248000"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Engagement (%)</span>
              <Input
                type="number"
                step="0.1"
                value={newEngagement || ""}
                onChange={(e) => setNewEngagement(Number(e.target.value))}
                placeholder="4.8"
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Channel URL</span>
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://instagram.com/alexchen"
              className="h-8 text-xs"
            />
          </div>
          <Button type="button" size="sm" className="w-full h-8 mt-1" onClick={addPlatformItem}>
            <Plus className="size-3.5 mr-1" /> Add Channel
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DisplayProps {
  content: SocialPlatformsContent;
}

// Utility to format number of followers (e.g. 512000 -> 512K)
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
};

const getPlatformIcon = (platform: SocialPlatform) => {
  switch (platform) {
    case "instagram":
      return <InstagramIcon className="size-5 text-pink-500" />;
    case "youtube":
      return <YoutubeIcon className="size-5 text-red-500" />;
    case "linkedin":
      return <LinkedinIcon className="size-5 text-blue-600" />;
    case "twitter":
      return <TwitterIcon className="size-5 text-sky-500" />;
    case "tiktok":
      return <TikTokIcon className="size-5 text-foreground dark:text-white" />;
    case "pinterest":
      return <PinterestIcon className="size-5 text-red-600" />;
    default: {
      const fallback = platform as string;
      return (
        <span className="size-5 font-bold text-xs flex items-center justify-center rounded-full bg-foreground text-background">
          {fallback.charAt(0).toUpperCase()}
        </span>
      );
    }
  }
};

export function SocialPlatformsDisplay({ content }: DisplayProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm @container">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mb-4">
        {content.title || "Social Platforms"}
      </h3>
      
      <div className="grid gap-4 @sm:grid-cols-2 @md:grid-cols-3">
        {content.platforms && content.platforms.length > 0 ? (
          content.platforms.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-4 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/30 transition-all hover:-translate-y-0.5 hover:shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(p.platform)}
                  <span className="text-xs font-semibold text-muted-foreground capitalize">
                    {p.platform}
                  </span>
                </div>
                {p.engagement && (
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 font-bold px-2 py-0.5 rounded-full">
                    {p.engagement}% Eng
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground tracking-tight">
                  {formatNumber(p.followers)}
                </p>
                <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
                  {p.handle}
                </p>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No social channels added yet.
          </div>
        )}
      </div>
    </div>
  );
}
