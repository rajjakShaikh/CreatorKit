"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useDealsStore, getStageFromStatus } from "../store/deals-store";
import type { CreatorBrandDeal, Comment, TimelineEvent } from "../types";
import {
  Calendar,
  CheckSquare,
  MessageSquare,
  DollarSign,
  Clock,
  Send,
  Trash2,
  CheckCircle2,
  Edit2,
  Check,
  User,
  Building,
  ArrowRight,
} from "lucide-react";

interface DealDetailsModalProps {
  dealId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DealDetailsModal({ dealId, isOpen, onClose }: DealDetailsModalProps) {
  const deals = useDealsStore((state) => state.deals);
  const updateDeal = useDealsStore((state) => state.updateDeal);
  const addComment = useDealsStore((state) => state.addComment);
  const toggleDeliverable = useDealsStore((state) => state.toggleDeliverable);
  const deleteDeal = useDealsStore((state) => state.deleteDeal);

  const deal = deals.find((d) => d.id === dealId);

  // Form states for editing
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // Comment input state
  const [newCommentText, setNewCommentText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync state when active deal changes
  useEffect(() => {
    if (deal) {
      setBudget(deal.budget);
      setDueDate(deal.dueDate);
      setNotes(deal.notes || "");
    }
  }, [deal]);

  // Scroll to bottom of chat when comments update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [deal?.comments]);

  if (!deal) return null;

  const handleSaveDetails = () => {
    updateDeal(deal.id, {
      budget,
      dueDate,
      notes,
    });
    setIsEditing(false);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const userMsg = newCommentText.trim();
    addComment(deal.id, userMsg, "creator", "You");
    setNewCommentText("");

    // Simulate an interactive reply from the brand
    setTimeout(() => {
      const brandResponses = [
        "Thanks for updating us! We will review this and let you know if the script looks good.",
        "Excellent! Our marketing team will take a look. By the way, are the story drafts ready yet?",
        "Sounds good to us. Let's aim to lock the content outline by early next week.",
        "Perfect. That matches what we discussed. Keep us posted!",
        "Thanks for checking in! Could we make sure to include a call-to-action in the first 10 seconds?",
      ];
      const randomReply = brandResponses[Math.floor(Math.random() * brandResponses.length)];
      addComment(deal.id, randomReply, "brand", `${deal.brandName} Team`);
    }, 1500);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this deal? This action cannot be undone.")) {
      deleteDeal(deal.id);
      onClose();
    }
  };

  const totalDeliverables = deal.deliverables.length;
  const completedDeliverables = deal.checkedDeliverables.length;
  const completionPercentage = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;

  // Formatting currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Stage mapping helper for display badges
  const stageLabels = {
    inquiry: "Inquiry",
    negotiating: "Negotiating",
    contracted: "Contracted",
    in_progress: "In Progress",
    delivered: "Delivered",
    paid: "Paid",
    declined: "Declined",
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col h-full bg-background border-l border-border p-0 shadow-2xl">
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-border/40 shrink-0 bg-muted/10">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <SheetTitle className="text-xl font-bold font-heading">{deal.brandName}</SheetTitle>
                <Badge variant="secondary" className="capitalize text-[10px] py-0.5">
                  {stageLabels[deal.status]}
                </Badge>
              </div>
              <SheetDescription className="text-sm font-medium line-clamp-1">
                {deal.title}
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleDelete}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 mr-6"
              title="Delete Deal"
              aria-label="Delete Deal"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Content Scrollable */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6 pb-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-border/60 bg-muted/10 space-y-1 select-none">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Budget</span>
                {isEditing ? (
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="pl-7 h-9 text-sm"
                      aria-label="Budget amount"
                    />
                  </div>
                ) : (
                  <p className="text-lg font-extrabold text-foreground">
                    {formatCurrency(deal.budget, deal.currency)}
                  </p>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-border/60 bg-muted/10 space-y-1 select-none">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Due Date</span>
                {isEditing ? (
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-9 mt-1 text-sm"
                    aria-label="Due Date"
                  />
                ) : (
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1.5 mt-1">
                    <Calendar className="size-4 text-muted-foreground" />
                    {deal.dueDate}
                  </p>
                )}
              </div>
            </div>

            {/* Campaign Parameters / Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Campaign Details</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isEditing) handleSaveDetails();
                    else setIsEditing(true);
                  }}
                  className="h-8 text-xs font-semibold"
                >
                  {isEditing ? (
                    <>
                      <Check className="size-3.5 mr-1" /> Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="size-3.5 mr-1" /> Edit
                    </>
                  )}
                </Button>
              </div>

              {isEditing ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about brand guidelines, requirements, or links..."
                  className="min-h-[100px] text-sm"
                  aria-label="Campaign guidelines and notes"
                />
              ) : (
                <div className="rounded-xl border border-border/60 bg-muted/5 p-4 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {deal.notes || (
                    <span className="text-muted-foreground italic">No campaign notes provided. Click edit to add terms or design assets.</span>
                  )}
                </div>
              )}
            </div>

            <Separator className="border-border/40" />

            {/* Deliverables Checklist */}
            {totalDeliverables > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between select-none">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Deliverables Checklist</h4>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {completedDeliverables}/{totalDeliverables} ({Math.round(completionPercentage)}%)
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-1.5 bg-muted" />

                <div className="mt-2 space-y-2">
                  {deal.deliverables.map((item, index) => {
                    const isChecked = deal.checkedDeliverables.includes(index);
                    return (
                      <div
                        key={index}
                        onClick={() => toggleDeliverable(deal.id, index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleDeliverable(deal.id, index);
                          }
                        }}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        aria-label={`Toggle deliverable: ${item}`}
                        className={`flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card cursor-pointer transition-all hover:bg-muted/10 outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-1 ${isChecked ? "opacity-75 border-emerald-500/20 bg-emerald-500/[0.01]" : ""
                          }`}
                      >
                        <div
                          className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${isChecked
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-muted-foreground/30"
                            }`}
                        >
                          {isChecked && <Check className="size-3.5 stroke-[3]" />}
                        </div>
                        <span className={`text-sm select-none ${isChecked ? "line-through text-muted-foreground" : "font-medium"}`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Separator className="border-border/40" />

            {/* Brand Discussion Hub */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Brand Discussion</h4>
              <div className="border border-border/60 rounded-2xl bg-muted/5 flex flex-col h-[280px]">
                {/* Chat Message Scroll */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {deal.comments.length > 0 ? (
                      deal.comments.map((c) => {
                        const isCreator = c.author.role === "creator";
                        return (
                          <div
                            key={c.id}
                            className={`flex gap-3 max-w-[85%] ${isCreator ? "ml-auto flex-row-reverse" : "mr-auto"
                              }`}
                          >
                            <div
                              className={`flex size-8 shrink-0 select-none items-center justify-center rounded-full text-xs font-semibold ${isCreator
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted border border-border"
                                }`}
                            >
                              {isCreator ? <User className="size-4" /> : <Building className="size-4" />}
                            </div>
                            <div className="space-y-1">
                              <div
                                className={`flex items-center gap-2 text-[10px] text-muted-foreground ${isCreator ? "justify-end" : ""
                                  }`}
                              >
                                <span className="font-semibold">{c.author.name}</span>
                                <span>·</span>
                                <span>
                                  {new Date(c.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <div
                                className={`p-3 rounded-2xl text-sm leading-relaxed ${isCreator
                                  ? "bg-primary text-primary-foreground rounded-tr-none"
                                  : "bg-muted text-foreground rounded-tl-none border border-border/40"
                                  }`}
                              >
                                {c.content}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center h-[200px] text-muted-foreground">
                        <MessageSquare className="size-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs font-semibold">Start the Brand Discussion</p>
                        <p className="text-[10px] mt-1 max-w-[200px]">
                          Simulate messages with the client below to align on deliverables.
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Chat Input Field */}
                <form onSubmit={handleSendComment} className="p-3 border-t border-border/60 flex gap-2 items-center bg-muted/10 shrink-0 rounded-b-2xl">
                  <Input
                    placeholder="Type a message to the brand..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 h-9 bg-background text-sm"
                    aria-label="Type message to brand"
                  />
                  <Button type="submit" size="icon-sm" className="h-9 w-9 shrink-0" aria-label="Send message">
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </div>

            <Separator className="border-border/40" />

            {/* Timeline Progress Tracker */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Timeline History</h4>
              <div className="space-y-4 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/60">
                {deal.timeline.map((event) => {
                  const getTimelineIcon = (type: TimelineEvent["type"]) => {
                    switch (type) {
                      case "deal_created":
                        return <CheckCircle2 className="size-3 text-emerald-500 fill-emerald-500/20" />;
                      case "status_change":
                        return <ArrowRight className="size-3 text-primary" />;
                      case "deliverable_toggle":
                        return <CheckCircle2 className="size-3 text-emerald-500" />;
                      case "comment":
                        return <MessageSquare className="size-3 text-blue-500" />;
                      default:
                        return <Clock className="size-3 text-muted-foreground" />;
                    }
                  };

                  return (
                    <div key={event.id} className="flex gap-4 relative">
                      <div className="flex size-5 items-center justify-center rounded-full bg-background border border-border/80 z-10 shrink-0 mt-0.5 shadow-sm">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-xs text-foreground block">{event.title}</span>
                        <span className="text-[10px] text-muted-foreground block leading-normal">{event.description}</span>
                        <span className="text-[9px] text-muted-foreground/60 block mt-0.5">
                          {new Date(event.createdAt).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
