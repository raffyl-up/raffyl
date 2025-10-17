"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step2RaffleSetupProps {
  title: string;
  description: string;
  numberOfWinners: string;
  duration: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNumberOfWinnersChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}

export function Step2RaffleSetup({
  title,
  description,
  numberOfWinners,
  duration,
  onTitleChange,
  onDescriptionChange,
  onNumberOfWinnersChange,
  onDurationChange,
}: Step2RaffleSetupProps) {
  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Raffle Setup
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Input
          placeholder="Raffle Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-dark-secondary border-none text-white placeholder:text-text-secondary h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Textarea
          placeholder="Raffle Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="bg-dark-secondary border-none text-white placeholder:text-text-secondary min-h-36 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
        />
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Input
          placeholder="Number of Winners"
          type="number"
          value={numberOfWinners}
          onChange={(e) => onNumberOfWinnersChange(e.target.value)}
          className="bg-dark-secondary border-none text-white placeholder:text-text-secondary h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <Select value={duration} onValueChange={onDurationChange}>
          <SelectTrigger className="bg-dark-secondary border-none text-white h-14 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent className="bg-dark-secondary border-[#3d4352] text-white">
            <SelectItem value="1-day">1 Day</SelectItem>
            <SelectItem value="3-days">3 Days</SelectItem>
            <SelectItem value="7-days">7 Days</SelectItem>
            <SelectItem value="14-days">14 Days</SelectItem>
            <SelectItem value="30-days">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}