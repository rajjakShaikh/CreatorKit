"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Check, Clock, Sparkles } from "lucide-react";
import type { PricingPackagesContent, PricingPackageItem } from "../lib/types";

interface EditorProps {
  content: PricingPackagesContent;
  onChange: (updates: Partial<PricingPackagesContent>) => void;
}

export function PricingPackagesEditor({ content, onChange }: EditorProps) {
  const [newPkgTitle, setNewPkgTitle] = useState("");
  const [newPkgPrice, setNewPkgPrice] = useState(0);
  const [newPkgDesc, setNewPkgDesc] = useState("");
  const [newPkgTime, setNewPkgTime] = useState("");
  
  // States for adding deliverables to an existing package
  const [newDelivText, setNewDelivText] = useState<Record<string, string>>({});

  const updatePackage = (id: string, updates: Partial<PricingPackageItem>) => {
    const updated = content.packages.map((p) => (p.id === id ? { ...p, ...updates } : p));
    onChange({ packages: updated });
  };

  const addDeliverable = (pkgId: string) => {
    const text = newDelivText[pkgId]?.trim();
    if (text) {
      const pkg = content.packages.find((p) => p.id === pkgId);
      if (pkg) {
        const updatedDeliverables = [...pkg.deliverables, text];
        updatePackage(pkgId, { deliverables: updatedDeliverables });
        setNewDelivText((prev) => ({ ...prev, [pkgId]: "" }));
      }
    }
  };

  const removeDeliverable = (pkgId: string, delivIdx: number) => {
    const pkg = content.packages.find((p) => p.id === pkgId);
    if (pkg) {
      const updatedDeliverables = pkg.deliverables.filter((_, idx) => idx !== delivIdx);
      updatePackage(pkgId, { deliverables: updatedDeliverables });
    }
  };

  const addPackage = () => {
    if (newPkgTitle.trim() && newPkgPrice >= 0) {
      const id = `pkg-item-${Math.random().toString(36).substring(2, 9)}`;
      const newItem: PricingPackageItem = {
        id,
        title: newPkgTitle.trim(),
        price: Number(newPkgPrice),
        currency: "USD",
        description: newPkgDesc.trim() || "Package details and information...",
        deliverables: ["1x Video integration", "Social shares"],
        deliveryTime: newPkgTime.trim() || "7 Days",
      };
      onChange({ packages: [...content.packages, newItem] });
      setNewPkgTitle("");
      setNewPkgPrice(0);
      setNewPkgDesc("");
      setNewPkgTime("");
    }
  };

  const removePackage = (id: string) => {
    onChange({ packages: content.packages.filter((p) => p.id !== id) });
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
          placeholder="e.g. Services & Rates"
        />
      </div>

      {/* Packages List */}
      <div className="space-y-4">
        <Label>Pricing Tiers</Label>
        <div className="space-y-4">
          {content.packages.map((pkg) => (
            <div key={pkg.id} className="p-3 rounded-lg border bg-muted/10 space-y-3 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary">{pkg.title}</span>
                <Button
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => removePackage(pkg.id)}
                  className="size-7"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Package Title</span>
                  <Input
                    value={pkg.title}
                    onChange={(e) => updatePackage(pkg.id, { title: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Price ($)</span>
                  <Input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => updatePackage(pkg.id, { price: Number(e.target.value) })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Delivery Time</span>
                  <Input
                    value={pkg.deliveryTime}
                    onChange={(e) => updatePackage(pkg.id, { deliveryTime: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Currency</span>
                  <Input
                    value={pkg.currency}
                    onChange={(e) => updatePackage(pkg.id, { currency: e.target.value })}
                    className="h-7 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Description</span>
                <Textarea
                  value={pkg.description}
                  onChange={(e) => updatePackage(pkg.id, { description: e.target.value })}
                  className="text-xs p-2 min-h-[40px]"
                />
              </div>

              {/* Deliverables lists */}
              <div className="space-y-1.5 border-t border-border/50 pt-2">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Deliverables Checklist</span>
                <div className="space-y-1">
                  {pkg.deliverables.map((deliv, delivIdx) => (
                    <div key={delivIdx} className="flex gap-1.5 items-center">
                      <span className="text-xs flex-1 text-foreground/80 font-medium truncate">{deliv}</span>
                      <button
                        type="button"
                        onClick={() => removeDeliverable(pkg.id, delivIdx)}
                        className="text-destructive hover:bg-muted p-0.5 rounded"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 mt-1.5">
                  <Input
                    value={newDelivText[pkg.id] || ""}
                    onChange={(e) => setNewDelivText((prev) => ({ ...prev, [pkg.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDeliverable(pkg.id))}
                    placeholder="New deliverable..."
                    className="h-7 text-[11px] flex-1"
                  />
                  <Button size="sm" variant="outline" className="h-7 px-1.5" onClick={() => addDeliverable(pkg.id)}>
                    <Plus className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Package */}
        <div className="p-3 rounded-lg border border-dashed bg-muted/5 space-y-3 mt-4">
          <span className="text-xs font-bold text-muted-foreground">Add New Package</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Package Title</span>
              <Input
                value={newPkgTitle}
                onChange={(e) => setNewPkgTitle(e.target.value)}
                placeholder="e.g. Instagram Post"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Price ($)</span>
              <Input
                type="number"
                value={newPkgPrice || ""}
                onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                placeholder="e.g. 500"
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Delivery Time</span>
              <Input
                value={newPkgTime}
                onChange={(e) => setNewPkgTime(e.target.value)}
                placeholder="e.g. 5 Days"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Description</span>
              <Input
                value={newPkgDesc}
                onChange={(e) => setNewPkgDesc(e.target.value)}
                placeholder="Brief description..."
                className="h-8 text-xs"
              />
            </div>
          </div>
          <Button type="button" size="sm" className="w-full h-8 mt-1" onClick={addPackage}>
            <Plus className="size-3.5 mr-1" /> Add Package
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DisplayProps {
  content: PricingPackagesContent;
}

export function PricingPackagesDisplay({ content }: DisplayProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm @container">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mb-4">
        {content.title || "Services & Rates"}
      </h3>

      <div className="grid gap-6 @sm:grid-cols-2 @lg:grid-cols-3">
        {content.packages && content.packages.length > 0 ? (
          content.packages.map((pkg, idx) => {
            const isFeatured = idx === 1; // Highlight the middle package for premium feel
            return (
              <div
                key={pkg.id}
                className={`flex flex-col p-5 rounded-2xl border transition-all hover:-translate-y-1 relative ${
                  isFeatured
                    ? "border-primary bg-primary/[0.02] shadow-sm md:scale-[1.02] z-10 ring-1 ring-primary/30"
                    : "border-border/40 bg-muted/10"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-sm">
                    <Sparkles className="size-2.5 fill-current" /> Most Popular
                  </span>
                )}

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    {pkg.title}
                  </p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                      {pkg.price > 0 ? `$${pkg.price.toLocaleString()}` : "Contact for Pricing"}
                    </span>
                    {pkg.price > 0 && (
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                        {pkg.currency || "USD"}
                      </span>
                    )}
                  </div>
                  {pkg.deliveryTime && (
                    <div className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-medium mt-1">
                      <Clock className="size-3" />
                      <span>Delivery: {pkg.deliveryTime}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                  {pkg.description}
                </p>

                {/* Deliverables Checklist */}
                {pkg.deliverables && pkg.deliverables.length > 0 && (
                  <div className="space-y-2 mb-5 pt-3 border-t border-border/40">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      Includes:
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.deliverables.map((item, delivIdx) => (
                        <li key={delivIdx} className="flex gap-2 items-start text-xs text-foreground/80 font-medium">
                          <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  variant={isFeatured ? "default" : "outline"}
                  size="sm"
                  className="w-full mt-auto"
                >
                  Book Package
                </Button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No pricing packages added yet.
          </div>
        )}
      </div>
    </div>
  );
}
