"use client";
import { Goal } from "@/app/types/Goal";
import { Check } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
  onToggle?: (id: string) => void;
  onUpdate?: (id: string, updates: Partial<Goal>) => void;
  onDelete?: (id: string) => void;
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

const priorityIcons = {
  high: "🔥",
  medium: "⚡",
  low: "🌱",
};

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onToggle }) => {
  return (
    <div
      className={`border-2 rounded-xl ${
        goal.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggle && onToggle(goal.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110
            ${
              goal.completed
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50"
            }`}
          >
            {goal.completed && <Check size={14} />}
          </button>

          <div
            className={`border rounded-full px-2 py-1 text-xs font-medium 
                ${priorityColors[goal.priority]}`}
          >
            <span className="mr-1">{priorityIcons[goal.priority]}</span>
            {goal.priority.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
