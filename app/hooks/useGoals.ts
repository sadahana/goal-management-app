"use client";

import { useState } from "react";
import { Goal } from "../types/Goal";

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

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

  console.log(goals);

  return { goals, addGoal, toggleGoal };
};
