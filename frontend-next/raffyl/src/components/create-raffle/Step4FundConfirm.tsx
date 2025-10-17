"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Step4FundConfirmProps {
  amountToFund: string;
  onAmountToFundChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function Step4FundConfirm({
  amountToFund,
  onAmountToFundChange,
  onSubmit,
  isSubmitting = false,
}: Step4FundConfirmProps) {
  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Fund & Confirm
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Input
          placeholder="Amount to Fund"
          value={amountToFund}
          onChange={(e) => onAmountToFundChange(e.target.value)}
          className="bg-dark-secondary border-none text-white placeholder:text-text-secondary h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex px-4 py-3 justify-end">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-primary-blue hover:bg-primary-blue/90 text-white h-10 px-4 text-sm font-bold"
        >
          {isSubmitting ? "Creating..." : "Create Raffle"}
        </Button>
      </div>
    </div>
  );
}