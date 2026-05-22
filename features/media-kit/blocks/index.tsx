import type { MediaKitBlockType } from "@/types";
import { AboutCreatorEditor, AboutCreatorDisplay } from "./AboutCreatorBlock";
import { DemographicsEditor, DemographicsDisplay } from "./DemographicsBlock";
import { SocialPlatformsEditor, SocialPlatformsDisplay } from "./SocialPlatformsBlock";
import { CollaborationsEditor, CollaborationsDisplay } from "./CollaborationsBlock";
import { TestimonialsEditor, TestimonialsDisplay } from "./TestimonialsBlock";
import { PricingPackagesEditor, PricingPackagesDisplay } from "./PricingPackagesBlock";

// Custom simple Call-to-Action block
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function CTAEditor({ content, onChange }: { content: any; onChange: any }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Block Title</Label>
        <Input
          value={content.title || ""}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Let's Work Together"
        />
      </div>
      <div className="space-y-1">
        <Label>Description</Label>
        <Input
          value={content.description || ""}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Interested in a collaboration?..."
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label>Button Text</Label>
          <Input
            value={content.buttonText || ""}
            onChange={(e) => onChange({ buttonText: e.target.value })}
            placeholder="e.g. Send Email"
          />
        </div>
        <div className="space-y-1">
          <Label>Link URL</Label>
          <Input
            value={content.url || ""}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="mailto:collab@example.com"
          />
        </div>
      </div>
    </div>
  );
}

function CTADisplay({ content }: { content: any }) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground text-center shadow-sm max-w-xl mx-auto">
      <h3 className="font-heading text-xl font-bold tracking-tight text-foreground mb-2">
        {content.title || "Let's Collaborate"}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-md mx-auto">
        {content.description || "Interested in working together? Get in touch to start a campaign."}
      </p>
      <Button
        render={<a href={content.url || "#"} target="_blank" rel="noopener noreferrer" />}
      >
        {content.buttonText || "Get in touch"}
      </Button>
    </div>
  );
}

export const blockRegistry: Record<
  MediaKitBlockType,
  {
    display: React.ComponentType<{ content: any }>;
    editor: React.ComponentType<{ content: any; onChange: (updates: any) => void }>;
    label: string;
    description: string;
  }
> = {
  bio: {
    display: AboutCreatorDisplay,
    editor: AboutCreatorEditor,
    label: "About Creator",
    description: "Bio, profile tagline, location, and nice tags",
  },
  hero: {
    display: AboutCreatorDisplay,
    editor: AboutCreatorEditor,
    label: "Hero Profile",
    description: "Header profile with cover photo and details",
  },
  stats: {
    display: DemographicsDisplay,
    editor: DemographicsEditor,
    label: "Audience Demographics",
    description: "Key reach numbers and visual demographic splits",
  },
  social: {
    display: SocialPlatformsDisplay,
    editor: SocialPlatformsEditor,
    label: "Social Platforms",
    description: "Connected channels, handles, and follower counts",
  },
  gallery: {
    display: CollaborationsDisplay,
    editor: CollaborationsEditor,
    label: "Previous Collaborations",
    description: "Logos and campaign metrics from past sponsors",
  },
  testimonials: {
    display: TestimonialsDisplay,
    editor: TestimonialsEditor,
    label: "Testimonials",
    description: "Quotes and star ratings from partner brands",
  },
  rates: {
    display: PricingPackagesDisplay,
    editor: PricingPackagesEditor,
    label: "Pricing Packages",
    description: "Deliverables lists and rates for brand deals",
  },
  cta: {
    display: CTADisplay,
    editor: CTAEditor,
    label: "Call to Action",
    description: "A button and message to convert visiting brands",
  },
};
export {
  AboutCreatorEditor,
  AboutCreatorDisplay,
  DemographicsEditor,
  DemographicsDisplay,
  SocialPlatformsEditor,
  SocialPlatformsDisplay,
  CollaborationsEditor,
  CollaborationsDisplay,
  TestimonialsEditor,
  TestimonialsDisplay,
  PricingPackagesEditor,
  PricingPackagesDisplay,
};
