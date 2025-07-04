"use client";

import { AddGoalForm } from "@/features/goals/components/AddGoalForm";
import { GoalCard } from "@/features/goals/components/GoalCard";
import { Target } from "lucide-react";
import { useGoals } from "@/app/hooks/useGoals";

export const GoalManagemnetView = () => {
  const { goals, addGoal, toggleGoal, updateGoal, deleteGoal } = useGoals();

  const activeGoals = goals.filter((goal) => goal.completed === false);
  const completedGoals = goals.filter((goal) => goal.completed === true);

  return (
    <div>
      {/* Goal List */}
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
        <>
          {activeGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 mr-3 bg-blue-500 rounded-full "></span>
                Active Goals({activeGoals.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {activeGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onToggle={toggleGoal}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                  />
                ))}
              </div>
            </div>
          )}

          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 mr-3 bg-green-500 rounded-full "></span>
                Completed Goals({completedGoals.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {completedGoals
                  .filter((goal) => goal.completed)
                  .map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onToggle={toggleGoal}
                      onUpdate={updateGoal}
                      onDelete={deleteGoal}
                    />
                  ))}
              </div>
            </div>
          )}
        </>
      )}
      <div className="fixed bottom-0 w-full sm:w-1/3 md:2/3 left-1/2 transform -translate-x-1/2 z-50 px-4 py-4">
        <AddGoalForm onAdd={addGoal} />
      </div>
    </div>
  );
};
