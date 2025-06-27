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

  // TODO: 削除
  console.log(goals);

  return { addGoal };
};
