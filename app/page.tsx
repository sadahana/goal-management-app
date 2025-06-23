import Header from "@/features/header/components/Header";
import { getTodayFormatted } from "./lib/date";

export default function Home() {
  const today = getTodayFormatted();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <Header today={today} />
      {/* Progress Stats */}
      <div className=""></div>
      {/* Add Goal Form */}
      <div className=""></div>
      {/* Goal List */}
      <div className=""></div>
      {/* Footer */}
      <div className=""></div>
    </div>
  );
}
