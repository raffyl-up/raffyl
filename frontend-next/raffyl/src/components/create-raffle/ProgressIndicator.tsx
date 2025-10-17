interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepTitle,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-6 justify-between">
        <p className="text-white text-base font-medium leading-normal">
          Step {currentStep} of {totalSteps}: {stepTitle}
        </p>
      </div>
      <div className="rounded bg-[#3d4352]">
        <div
          className="h-2 rounded bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}