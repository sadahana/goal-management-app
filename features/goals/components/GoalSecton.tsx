import { Goal } from "@/app/types/Goal";
import React from "react";
import { GoalCard } from "./GoalCard";

interface GoalSectionProps {
  goals: Goal[];
  title: string;
  dotColorClass: string;
  goalActions: {
    onToggle: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Goal>) => void;
    onDelete: (id: string) => void;
  };
}

export const GoalSection: React.FC<GoalSectionProps> = ({
  goals,
  title,
  dotColorClass,
  goalActions,
}) => {
  if (goals.length === 0) return;

  return (
    <div>
      {goals.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span
              className={`w-3 h-3 mr-3 ${dotColorClass} rounded-full`}
            ></span>
            {title}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} {...goalActions} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
