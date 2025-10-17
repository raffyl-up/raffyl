"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Step1RaffleTypeProps {
  selectedType: string;
  onTypeChange: (value: string) => void;
}

const raffleTypes = [
  { value: "giveaway", label: "Giveaway" },
  { value: "gamified", label: "Gamified" },
  { value: "engagement", label: "Engagement" },
];

export function Step1RaffleType({
  selectedType,
  onTypeChange,
}: Step1RaffleTypeProps) {
  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Select Raffle Type
      </h3>
      <div className="flex flex-wrap gap-3 p-4">
        <RadioGroup value={selectedType} onValueChange={onTypeChange}>
          <div className="flex flex-wrap gap-3">
            {raffleTypes.map((type) => (
              <Label
                key={type.value}
                htmlFor={type.value}
                className={`text-sm font-medium leading-normal flex items-center justify-center rounded-lg border px-4 h-11 text-white cursor-pointer transition-all ${
                  selectedType === type.value
                    ? "border-[3px] border-primary-blue px-3.5"
                    : "border border-[#3d4352]"
                }`}
              >
                {type.label}
                <RadioGroupItem
                  value={type.value}
                  id={type.value}
                  className="sr-only"
                />
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}