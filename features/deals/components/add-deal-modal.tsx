"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDealsStore } from "../store/deals-store";
import { Plus, X, PlusCircle } from "lucide-react";
import type { CreatorBrandDeal } from "../types";

interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDealModal({ isOpen, onClose }: AddDealModalProps) {
  const addDeal = useDealsStore((state) => state.addDeal);

  // Form states
  const [brandName, setBrandName] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [deliverableInput, setDeliverableInput] = useState("");
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [status, setStatus] = useState<CreatorBrandDeal["status"]>("inquiry");

  const handleAddDeliverable = () => {
    if (deliverableInput.trim()) {
      setDeliverables([...deliverables, deliverableInput.trim()]);
      setDeliverableInput("");
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !title.trim() || !dueDate) return;

    addDeal({
      brandName: brandName.trim(),
      title: title.trim(),
      budget: Number(budget) || 0,
      currency: "USD",
      status,
      dueDate,
      notes: notes.trim(),
      deliverables,
    });

    // Reset Form
    setBrandName("");
    setTitle("");
    setBudget("");
    setDueDate("");
    setNotes("");
    setDeliverables([]);
    setStatus("inquiry");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border p-0 shadow-2xl">
        <SheetHeader className="p-6 pb-4 border-b border-border/40 shrink-0 bg-muted/10">
          <SheetTitle className="text-lg font-bold font-heading">Add Brand Deal</SheetTitle>
          <SheetDescription className="text-xs">
            Initiate a new partnership in your tracking pipeline.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Brand Name */}
            <div className="space-y-1.5">
              <Label htmlFor="brandName" className="text-xs font-semibold">Brand Name *</Label>
              <Input
                id="brandName"
                placeholder="e.g. Notion, Figma, Spotify"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>

            {/* Campaign Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold">Campaign Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Summer launch series, Product review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>

            {/* Budget & Due Date row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="budget" className="text-xs font-semibold">Budget (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value === "" ? "" : Number(e.target.value))}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dueDate" className="text-xs font-semibold">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>
            </div>

            {/* Initial Status */}
            <div className="space-y-1.5">
              <Label htmlFor="status" className="text-xs font-semibold">Pipeline Stage</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as CreatorBrandDeal["status"])}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="inquiry">Inquiry (Pitch received)</option>
                <option value="negotiating">Negotiation (Discussing terms)</option>
                <option value="in_progress">Active (Production phase)</option>
                <option value="paid">Completed (Delivered & Paid)</option>
              </select>
            </div>

            {/* Deliverables Builder */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Deliverables</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. 1x Dedicated YouTube Video"
                  value={deliverableInput}
                  onChange={(e) => setDeliverableInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddDeliverable();
                    }
                  }}
                  className="h-9 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddDeliverable}
                  className="h-9 px-3 shrink-0"
                >
                  <PlusCircle className="size-4" />
                </Button>
              </div>

              {deliverables.length > 0 && (
                <div className="mt-2 space-y-1.5 max-h-[120px] overflow-y-auto border border-border/60 rounded-lg p-2 bg-muted/10">
                  {deliverables.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-background border border-border/40 px-2.5 py-1.5 rounded-md text-xs font-medium"
                    >
                      <span className="line-clamp-1">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(index)}
                        className="text-muted-foreground/60 hover:text-destructive shrink-0"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs font-semibold">Campaign Guidelines & Notes</Label>
              <Textarea
                id="notes"
                placeholder="Include deal constraints, briefs, or client guidelines..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px] text-sm"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <SheetFooter className="p-6 border-t border-border/40 shrink-0 bg-muted/10 flex flex-row justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="h-9 text-xs">
              Cancel
            </Button>
            <Button type="submit" className="h-9 text-xs font-bold mr-6">
              Create Deal
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
