import { GoalStep } from "@/app/types/Goal";
import { Trash } from "lucide-react";
import React from "react";
import { ToggleCompletedButton } from "./ToggleCompletedButton";

interface GoalStepItemProps {
  step: GoalStep;
  disabled?: boolean;
  removable?: boolean;
  onChange?: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
  onToggleStep?: (goalId: string, stepId: string) => void;
}

export const GoalStepItem: React.FC<GoalStepItemProps> = ({
  step,
  removable = false,
  onChange,
  onDelete,
  onToggleStep,
}) => {
  const handleToggleStep = () => {
    if (onToggleStep) {
      onToggleStep(step.goalId, step.id);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-3 items-center">
        <ToggleCompletedButton
          onClick={handleToggleStep}
          completed={step.completed}
        />
        <input
          type="text"
          className={`text-left ${
            step.completed ? "text-green-700 line-through" : "text-gray-800"
          }`}
          value={step.title}
          onChange={(e) => onChange && onChange(step.id, e)}
        />
      </div>
      {removable && (
        <button
          onClick={(e) => onDelete && onDelete(step.id, e)}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Trash />
        </button>
      )}
    </div>
  );
};
