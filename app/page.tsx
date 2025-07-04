"use client";

import { Header } from "@/features/header/components/Header";
import { getTodayFormatted } from "./lib/date";
import { GoalManagemnetView } from "@/features/goals/containers/GoalManagemnetView";

export default function Home() {
  const today = getTodayFormatted();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col gap-4">
        <Header today={today} />
        <GoalManagemnetView />
      </div>
    </div>
  );
}
