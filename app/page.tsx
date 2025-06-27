"use client";

import { Header } from "@/features/header/components/Header";
import { getTodayFormatted } from "./lib/date";
import { AddGoalForm } from "@/features/goals/containers/AddGoalForm";
import { useGoals } from "./hooks/useGoals";

export default function Home() {
  const { addGoal } = useGoals();

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
        <div className=""></div>
        {/* Footer */}
        <div className=""></div>
      </div>
    </div>
  );
}
