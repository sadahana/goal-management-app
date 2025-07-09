import { Check } from "lucide-react";
import React from "react";

interface ToggleCompletedButtonProps {
  onClick: () => void;
  completed: boolean;
  disabled?: boolean;
}

export const ToggleCompletedButton: React.FC<ToggleCompletedButtonProps> = ({
  onClick,
  completed,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110
            ${
              completed
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50"
            }`}
    >
      {completed && <Check size={14} />}
    </button>
  );
};
