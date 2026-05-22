"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockGeography } from "../mock-data";

function getCountryEmoji(code: string) {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function AudienceGeographyList() {
  const data = mockGeography;

  return (
    <Card className="col-span-full md:col-span-1 xl:col-span-4 surface-elevated transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">Top Territories</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Audience location and geographical distribution
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 py-4">
        {data.map((item) => {
          const emoji = getCountryEmoji(item.countryCode);
          return (
            <div key={item.countryCode} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-foreground/80">
                  <span className="text-base select-none leading-none" role="img" aria-label={item.country}>
                    {emoji}
                  </span>
                  <span>{item.country}</span>
                </div>
                <div className="flex items-center gap-2 tabular-nums">
                  <span className="font-extrabold text-foreground">{item.percentage}%</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    ({new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(item.followers)})
                  </span>
                </div>
              </div>
              <Progress value={item.percentage} className="h-1.5" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
