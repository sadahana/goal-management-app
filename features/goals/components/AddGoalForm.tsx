"use client";

import { Goal, GoalCategory, GoalPriority } from "@/app/types/Goal";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface AddGoalFormProps {
  onAdd: (goalData: Omit<Goal, "id" | "completed" | "createdAt">) => void;
}

export const AddGoalForm: React.FC<AddGoalFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
  const [category, setCategory] = useState<
    "work" | "personal" | "health" | "study"
  >("work");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
    });

    // Reset form fields
    setTitle("");
    setDescription("");
    setPriority("low");
    setCategory("work");

    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-6 bg-gradient-to-br from-blue-500 to-purple-600  text-white rounded-xl font-semibold hover:border-blue-400
        hover:text-blue-500 transition-all duration-300 group"
      >
        <div className="flex items-center justify-center space-x-2">
          <Plus
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-medium">Add New Goal</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-blue-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Add New Goal</h3>
        <button
          onClick={handleCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you want to achieve today?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label>Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as GoalPriority)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="low">🌱 Low Priority</option>
              <option value="medium">⚡ Medium Priority</option>
              <option value="high">🔥 High Priority</option>
            </select>
          </div>

          <div>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="work">💻 Work</option>
              <option value="personal">🩷 Personal</option>
              <option value="health">🏃 Health</option>
              <option value="study">📚 Study</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-white font-medium"
          >
            Add Goal
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
