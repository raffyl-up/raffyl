"use client";

import { Input } from "@/components/ui/input";

interface Step3RequirementsProps {
  minimumEntryFee: string;
  additionalRequirements: string;
  onMinimumEntryFeeChange: (value: string) => void;
  onAdditionalRequirementsChange: (value: string) => void;
}

export function Step3Requirements({
  minimumEntryFee,
  additionalRequirements,
  onMinimumEntryFeeChange,
  onAdditionalRequirementsChange,
}: Step3RequirementsProps) {
  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Requirements
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Input
          placeholder="Minimum Entry Fee"
          value={minimumEntryFee}
          onChange={(e) => onMinimumEntryFeeChange(e.target.value)}
          className="bg-dark-secondary border-none text-white placeholder:text-text-secondary h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Input
          placeholder="Additional Requirements (Optional)"
          value={additionalRequirements}
          onChange={(e) => onAdditionalRequirementsChange(e.target.value)}
          className="bg-dark-secondary border-none text-white placeholder:text-text-secondary h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}