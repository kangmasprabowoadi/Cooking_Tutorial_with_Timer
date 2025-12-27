import { StepTimer } from './StepTimer';

export interface Step {
  id: number;
  title: string;
  description: string;
  timer?: {
    duration: number;
    label: string;
  };
  tip?: string;
}

interface RecipeStepProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
}

export function RecipeStep({ step, stepNumber, totalSteps }: RecipeStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shrink-0">
            {stepNumber}
          </span>
          <h2 className="text-gray-900">{step.title}</h2>
        </div>
        
        <div className="ml-13">
          <p className="text-gray-700 mb-4 leading-relaxed">
            {step.description}
          </p>

          {step.tip && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-blue-900">
                <span className="font-semibold">Tip:</span> {step.tip}
              </p>
            </div>
          )}
        </div>
      </div>

      {step.timer && (
        <div className="mt-6">
          <StepTimer 
            duration={step.timer.duration} 
            label={step.timer.label} 
          />
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500 text-center">
          Step {stepNumber} of {totalSteps}
        </div>
      </div>
    </div>
  );
}
