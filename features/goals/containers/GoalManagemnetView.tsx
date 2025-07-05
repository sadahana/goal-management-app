"use client";

import { AddGoalForm } from "@/features/goals/components/AddGoalForm";
import { Target } from "lucide-react";
import { useGoals } from "@/app/hooks/useGoals";
import { GoalSection } from "../components/GoalSecton";
import { Goal } from "@/app/types/Goal";

interface goalGroup {
  status: "active" | "completed";
  title: string;
  dotColorClass: string;
  goals: Goal[];
}

export const GoalManagemnetView: React.FC = () => {
  const {
    goals,
    getActiveGoals,
    getCompletedGoals,
    addGoal,
    toggleGoal,
    updateGoal,
    deleteGoal,
  } = useGoals();

  const activeGoals = getActiveGoals();
  const completedGoals = getCompletedGoals();

  const goalsActions = {
    onToggle: toggleGoal,
    onUpdate: updateGoal,
    onDelete: deleteGoal,
  };

  const goalGroup: goalGroup[] = [
    {
      status: "active",
      title: `Active Goals (${activeGoals.length})`,
      dotColorClass: "bg-blue-500",
      goals: activeGoals,
    },
    {
      status: "completed",
      title: `Active Goals (${completedGoals.length})`,
      dotColorClass: "bg-green-500",
      goals: completedGoals,
    },
  ];

  return (
    <div>
      {goals.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Target />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No goals yet
          </h3>

          <p className="text-gray-500">
            Start by adding your first goal for today!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {goalGroup.map(
            ({ goals, title, dotColorClass: dotColorClass, status }) => (
              <GoalSection
                key={status}
                goals={goals}
                title={title}
                dotColorClass={dotColorClass}
                goalActions={goalsActions}
              />
            )
          )}
        </div>
      )}
      <div className="fixed bottom-0 w-full sm:w-1/3 md:2/3 left-1/2 transform -translate-x-1/2 z-50 px-4 py-4">
        <AddGoalForm onAdd={addGoal} />
      </div>
    </div>
  );
};
