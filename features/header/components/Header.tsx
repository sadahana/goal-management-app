"use client";
import { Calendar, Target } from "lucide-react";

export default function Header() {
  const today = new Date().toLocaleDateString("ja-jp", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <header className="text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
          <Target className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Daily Goal Manager
          </h1>
          <p className="text-center text-gray-600">一日の目標管理アプリ</p>
        </div>
      </div>

      <div className="flex items-center justify-center text-gray-600">
        <Calendar size={20} className="mr-2" />
        <span className="text-lg">{today}</span>
      </div>
    </header>
  );
}
