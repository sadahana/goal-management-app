"use client";
import { Goal } from "@/app/types/Goal";
import { Check, Clock, Edit2, Trash } from "lucide-react";

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

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`group border-2 rounded-xl ${
        goal.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="p-6">
        {/* GoalCardHeader */}
        <div className="flex justify-between items-center mb-4">
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

          <div className="flex items-center space-x-3 mr-3">
            <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-500 transition-all duration-200">
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete && onDelete(goal.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all duration-200"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>

        {/* GoalCardContents */}
        <div>
          <h3
            className={`text-lg font-semibold mb-2 transition-all duration-300 ${
              goal.completed ? "text-green-700 line-through" : "text-gray-800"
            }`}
          >
            {goal.title}
          </h3>

          {goal.description && (
            <p
              className={`text-sm mb-3 transition-all duration-300 ${
                goal.completed ? "text-green-600" : "text-gray-600"
              }`}
            >
              {goal.description}
            </p>
          )}
        </div>

        {/* GoalCardFooter */}
        <div className="flex justify-between items-center text-gray-500">
          <div className="flex items-center  space-x-2">
            <Clock size={12} />
            <span>Created {goal.createdAt.toLocaleDateString()}</span>
          </div>

          {goal.completed && goal.completedAt && (
            <div className="flex items-center space-x-2 text-green-600">
              <Check size={12} />
              <span>Completed {goal.completedAt.toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
