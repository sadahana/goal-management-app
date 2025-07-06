"use client";

import { useEffect, useState } from "react";
import { Goal } from "../types/Goal";

const STORAGE_KEY = "goals";

/**
 * ローカルストレージから読み込んだ JSON を Goal[] に復元
 */
function loadGoalsFromStorage(): Goal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (
          g
        ): g is Omit<Goal, "createdAt" | "completedAt"> & {
          createdAt: string;
          completedAt?: string;
        } => typeof g.id === "string" && typeof g.title === "string"
      )
      .map((g) => ({
        ...g,
        createdAt: new Date(g.createdAt),
        completedAt: g.completedAt ? new Date(g.completedAt) : undefined,
      }));
  } catch {
    return [];
  }
}

/**
 * Goal配列を localStorage に保存
 */
function saveGoalsToStorage(goals: Goal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  // 初回のみローカルストレージから読み込む
  useEffect(() => {
    const loaded = loadGoalsFromStorage();
    setGoals(loaded);
  }, []);

  // goals が更新されるたびに保存する
  useEffect(() => {
    saveGoalsToStorage(goals);
  }, [goals]);

  const addGoal = (goalData: Omit<Goal, "id" | "completed" | "createdAt">) => {
    const goalId = Date.now().toString();

    const stepsWithGoalId = goalData?.steps?.map((step) => ({
      ...step,
      goalId,
    }));

    const newGoal: Goal = {
      ...goalData,
      id: goalId,
      steps: stepsWithGoalId,
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

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal))
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  return {
    goals,
    getActiveGoals: () => goals.filter((goal) => !goal.completed),
    getCompletedGoals: () => goals.filter((goal) => goal.completed),
    addGoal,
    toggleGoal,
    updateGoal,
    deleteGoal,
  };
};
