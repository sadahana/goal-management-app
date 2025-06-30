"use client";

import { useState } from "react";
import { Goal } from "../types/Goal";

const baseGoal: Goal = {
  id: "goal-001",
  title: "朝の散歩",
  description: "近所を20分ほど歩く",
  priority: "medium",
  category: "health",
  completed: false,
  createdAt: new Date(),
  completedAt: undefined,
};

const variations: Goal[] = [
  { ...baseGoal, id: "goal-001", title: "通常の目標" },
  {
    ...baseGoal,
    id: "goal-002",
    title: "完了済み",
    completed: true,
    completedAt: new Date(),
  },
  { ...baseGoal, id: "goal-003", title: "高優先度", priority: "high" },
  { ...baseGoal, id: "goal-004", title: "低優先度", priority: "low" },
  { ...baseGoal, id: "goal-005", title: "説明なし", description: "" },
];

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>(variations);

  const addGoal = (goalData: Omit<Goal, "id" | "completed" | "createdAt">) => {
    const newGoal = {
      ...goalData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const toggleGoal = (goalId: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              completed: !goal.completed,
              completedAt: goal.completed ? undefined : new Date(),
            }
          : goal
      )
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  return { goals, addGoal, toggleGoal, deleteGoal };
};
