import { PageHeader } from "@/components/shared";
import { PageTransition } from "@/components/motion";
import { DealsDashboard } from "@/features/deals";

export default function DealsPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Brand Deals"
        description="Track partnerships from inquiry to paid."
      />

      <DealsDashboard />
    </PageTransition>
  );
}

