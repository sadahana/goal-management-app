"use client";
import { Goal } from "@/app/types/Goal";

interface GoalCardProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Goal>) => void;
  onDelete: (id: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  return (
    <div
      className={`border-2 rounded-xl ${
        goal.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="p-6">
        <div></div>
      </div>
    </div>
  );
};
