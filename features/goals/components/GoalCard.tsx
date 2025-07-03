"use client";
import { Goal } from "@/app/types/Goal";
import { Check, Clock, Trash, X } from "lucide-react";
import { useState } from "react";

interface GoalCardProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Goal>) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

const priorityIcons = {
  high: "🔥",
  medium: "⚡",
  low: "🌱",
};

const categoryIcons = {
  work: "💻",
  personal: "🩷",
  health: "🏃",
  study: "📚",
};

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(
    goal.description || ""
  );

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(goal.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditting(false);
  };

  const handleCancel = () => {
    setEditTitle(goal.title);
    setEditDescription(goal.description || "");
    setIsEditting(false);
  };

  const handleDelete = () => {
    onDelete(goal.id);
    setIsEditting(false);
  };

  return (
    <div
      className={`group relative border-2 rounded-xl ${
        goal.completed
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="p-6">
        <GoalCardHeader
          goal={goal}
          onToggle={onToggle}
          isEditting={isEditting}
          handleCancel={handleCancel}
        />

        {isEditting ? (
          <GoalCardEditor
            editTitle={editTitle}
            editDescription={editDescription}
            setEditTitle={setEditTitle}
            setEditDescription={setEditDescription}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        ) : (
          <GoalCardContents goal={goal} setIsEditting={setIsEditting} />
        )}
      </div>

      {goal.completed && (
        <div className="absolute -top-2 -right-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce">
            🎉
          </div>
        </div>
      )}
    </div>
  );
};

const GoalCardHeader = ({
  goal,
  isEditting,
  onToggle,
  handleCancel,
}: {
  goal: Goal;
  isEditting: boolean;
  onToggle: (id: string) => void;
  handleCancel: () => void;
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-3">
        <div
          className={`border rounded-full px-2 py-1 text-xs font-medium 
                ${priorityColors[goal.priority]}`}
        >
          <span className="mr-1">{priorityIcons[goal.priority]}</span>
          {goal.priority.toUpperCase()}
        </div>
        <div
          className={`border-none rounded-full px-2 py-1 text-xs font-medium bg-gray-100`}
        >
          <span className="mr-1">{categoryIcons[goal.category]}</span>
          {goal.category.toUpperCase()}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {isEditting ? (
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X />
          </button>
        ) : (
          <button
            onClick={() => onToggle(goal.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110
            ${
              goal.completed
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50"
            }`}
          >
            {goal.completed && <Check size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

const GoalCardContents = ({
  goal,
  setIsEditting,
}: {
  goal: Goal;
  setIsEditting: (arg0: boolean) => void;
}) => {
  return (
    <>
      <div onClick={() => setIsEditting(true)} className="cursor-pointer">
        <h3
          className={`text-lg font-semibold mb-2 transition-all duration-300 ${
            goal.completed ? "text-green-700 line-through" : "text-gray-800"
          }`}
        >
          {goal.title}
        </h3>

        {goal.description && (
          <p
            className={`text-sm mb-3 transition-all duration-300 ${
              goal.completed ? "text-green-600" : "text-gray-600"
            }`}
          >
            {goal.description}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center  space-x-2">
          <Clock size={12} />
          <span>Created {goal.createdAt.toLocaleDateString()}</span>
        </div>

        {goal.completed && goal.completedAt && (
          <div className="flex items-center space-x-2 text-green-600">
            <Check size={12} />
            <span>Completed {goal.completedAt.toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </>
  );
};

const GoalCardEditor = ({
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  handleSave,
  handleDelete,
}: {
  editTitle: string;
  editDescription: string;
  setEditTitle: (title: string) => void;
  setEditDescription: (description: string) => void;
  handleSave: () => void;
  handleDelete: () => void;
}) => {
  return (
    <form onSubmit={handleSave}>
      <div className="space-y-3 mb-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Goal title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Add more details (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          rows={2}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 transition-all duration-200"
        >
          <Trash size={20} />
        </button>
        <button
          type="submit"
          className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
};
