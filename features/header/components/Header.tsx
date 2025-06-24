import { Calendar, Target } from "lucide-react";

interface HeaderProps {
  /**
   * 表示用の日付文字列（例："2025年6月23日月曜日"）。
   * サーバーサイドで生成された、日本語ロケール形式のフォーマットを想定。
   */
  today: string;
}

export const Header: React.FC<HeaderProps> = ({ today }) => {
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
};
