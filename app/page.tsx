"use client";

import { Header } from "@/features/header/components/Header";
import { getTodayFormatted } from "./lib/date";
import { AddGoalForm } from "@/features/goals/containers/AddGoalForm";
import { useGoals } from "./hooks/useGoals";
import { GoalCard } from "@/features/goals/components/GoalCard";

export default function Home() {
  const { goals, addGoal, toggleGoal, updateGoal, deleteGoal } = useGoals();

  const today = getTodayFormatted();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <Header today={today} />
        {/* Progress Stats */}
        <div className=""></div>
        {/* Add Goal Form */}
        <AddGoalForm onAdd={addGoal} />
        {/* Goal List */}
        <div>
          {goals.map((goal) => {
            return (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={toggleGoal}
                onUpdate={updateGoal}
                onDelete={deleteGoal}
              />
            );
          })}
        </div>
        {/* Footer */}
        <div className=""></div>
      </div>
    </div>
  );
}
