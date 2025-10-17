"use client";

import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { Step1RaffleType } from "./Step1RaffleType";
import { Step2RaffleSetup } from "./Step2RaffleSetup";
import { Step3Requirements } from "./Step3Requirements";
import { Step4FundConfirm } from "./Step4FundConfirm";

interface RaffleFormData {
  raffleType: string;
  title: string;
  description: string;
  numberOfWinners: string;
  duration: string;
  minimumEntryFee: string;
  additionalRequirements: string;
  amountToFund: string;
}

export function CreateRaffleForm() {
  const [formData, setFormData] = useState<RaffleFormData>({
    raffleType: "",
    title: "",
    description: "",
    numberOfWinners: "",
    duration: "",
    minimumEntryFee: "",
    additionalRequirements: "",
    amountToFund: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate form submission
    console.log("Form submitted:", formData);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Raffle created successfully!");
    }, 1500);
  };

  const isFormValid = () => {
    return (
      formData.raffleType &&
      formData.title &&
      formData.description &&
      formData.numberOfWinners &&
      formData.duration &&
      formData.minimumEntryFee &&
      formData.amountToFund
    );
  };

  return (
    <div className="flex flex-col">
      {/* Step 1 */}
      <ProgressIndicator
        currentStep={1}
        totalSteps={4}
        stepTitle="Select Raffle Type"
      />
      <Step1RaffleType
        selectedType={formData.raffleType}
        onTypeChange={(value) =>
          setFormData({ ...formData, raffleType: value })
        }
      />

      {/* Step 2 */}
      <ProgressIndicator
        currentStep={2}
        totalSteps={4}
        stepTitle="Raffle Setup"
      />
      <Step2RaffleSetup
        title={formData.title}
        description={formData.description}
        numberOfWinners={formData.numberOfWinners}
        duration={formData.duration}
        onTitleChange={(value) => setFormData({ ...formData, title: value })}
        onDescriptionChange={(value) =>
          setFormData({ ...formData, description: value })
        }
        onNumberOfWinnersChange={(value) =>
          setFormData({ ...formData, numberOfWinners: value })
        }
        onDurationChange={(value) =>
          setFormData({ ...formData, duration: value })
        }
      />

      {/* Step 3 */}
      <ProgressIndicator
        currentStep={3}
        totalSteps={4}
        stepTitle="Requirements"
      />
      <Step3Requirements
        minimumEntryFee={formData.minimumEntryFee}
        additionalRequirements={formData.additionalRequirements}
        onMinimumEntryFeeChange={(value) =>
          setFormData({ ...formData, minimumEntryFee: value })
        }
        onAdditionalRequirementsChange={(value) =>
          setFormData({ ...formData, additionalRequirements: value })
        }
      />

      {/* Step 4 */}
      <ProgressIndicator
        currentStep={4}
        totalSteps={4}
        stepTitle="Fund & Confirm"
      />
      <Step4FundConfirm
        amountToFund={formData.amountToFund}
        onAmountToFundChange={(value) =>
          setFormData({ ...formData, amountToFund: value })
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting || !isFormValid()}
      />
    </div>
  );
}