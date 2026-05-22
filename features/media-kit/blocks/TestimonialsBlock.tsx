"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Star } from "lucide-react";
import type { TestimonialsContent, TestimonialItem } from "../lib/types";

interface EditorProps {
  content: TestimonialsContent;
  onChange: (updates: Partial<TestimonialsContent>) => void;
}

export function TestimonialsEditor({ content, onChange }: EditorProps) {
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [newRating, setNewRating] = useState(5);

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    const updated = content.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t));
    onChange({ testimonials: updated });
  };

  const addTestimonial = () => {
    if (newQuote.trim() && newAuthor.trim()) {
      const id = `test-item-${Math.random().toString(36).substring(2, 9)}`;
      const newItem: TestimonialItem = {
        id,
        quote: newQuote.trim(),
        author: newAuthor.trim(),
        role: newRole.trim() || "Marketing Manager",
        brandName: newBrandName.trim() || "Partner Brand",
        avatarUrl: newAvatarUrl.trim() || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: Number(newRating),
      };
      onChange({ testimonials: [...content.testimonials, newItem] });
      setNewQuote("");
      setNewAuthor("");
      setNewRole("");
      setNewBrandName("");
      setNewAvatarUrl("");
      setNewRating(5);
    }
  };

  const removeTestimonial = (id: string) => {
    onChange({ testimonials: content.testimonials.filter((t) => t.id !== id) });
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
          placeholder="e.g. What Brands Say"
        />
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        <Label>Testimonials</Label>
        <div className="space-y-3">
          {content.testimonials.map((t) => (
            <div key={t.id} className="p-3 rounded-lg border bg-muted/10 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary">{t.author} ({t.brandName})</span>
                <Button
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => removeTestimonial(t.id)}
                  className="size-7"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Quote</span>
                  <Textarea
                    value={t.quote}
                    onChange={(e) => updateTestimonial(t.id, { quote: e.target.value })}
                    className="text-xs p-2 min-h-[50px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Author</span>
                    <Input
                      value={t.author}
                      onChange={(e) => updateTestimonial(t.id, { author: e.target.value })}
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Role</span>
                    <Input
                      value={t.role}
                      onChange={(e) => updateTestimonial(t.id, { role: e.target.value })}
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Brand Company</span>
                    <Input
                      value={t.brandName}
                      onChange={(e) => updateTestimonial(t.id, { brandName: e.target.value })}
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Rating (1-5)</span>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={t.rating || 5}
                      onChange={(e) => updateTestimonial(t.id, { rating: Number(e.target.value) })}
                      className="h-7 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Testimonial */}
        <div className="p-3 rounded-lg border border-dashed bg-muted/5 space-y-3 mt-4">
          <span className="text-xs font-bold text-muted-foreground">Add New Testimonial</span>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Quote Text</span>
            <Textarea
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              placeholder="Alex was great to work with..."
              className="text-xs p-2 min-h-[60px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Author Name</span>
              <Input
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Sarah Jenkins"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Author Role</span>
              <Input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Senior Brand Manager"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Company Brand</span>
              <Input
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Sony Electronics"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Star Rating</span>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="w-full h-8 rounded-md border border-input bg-transparent px-2 text-xs"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Avatar Image URL</span>
            <Input
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              placeholder="Image URL"
              className="h-8 text-xs"
            />
          </div>
          <Button type="button" size="sm" className="w-full h-8 mt-1" onClick={addTestimonial}>
            <Plus className="size-3.5 mr-1" /> Add Testimonial
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DisplayProps {
  content: TestimonialsContent;
}

export function TestimonialsDisplay({ content }: DisplayProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm @container">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mb-4">
        {content.title || "Testimonials"}
      </h3>

      <div className="grid gap-4 @md:grid-cols-2">
        {content.testimonials && content.testimonials.length > 0 ? (
          content.testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col p-5 rounded-xl border border-border/40 bg-muted/10 relative hover:shadow-xs transition-all hover:bg-muted/20"
            >
              {/* Star Rating */}
              <div className="flex gap-0.5 mb-3.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < (t.rating || 5)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-sm text-muted-foreground italic leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Author Section */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/40">
                <div className="size-9 rounded-full overflow-hidden bg-muted border shrink-0">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.author}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      {t.author.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">
                    {t.author}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {t.role} · <span className="font-semibold text-primary/80">{t.brandName}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No testimonials listed yet.
          </div>
        )}
      </div>
    </div>
  );
}
