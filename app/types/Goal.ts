/**
 * ユーザーが設定した「目標（Goal）」を表すデータ型。
 */
export interface Goal {
  /**
   * 一意の識別子（UUIDなど）。
   */
  id: string;

  /**
   * 目標のタイトル（例：「英単語を10個覚える」）。
   */
  title: string;

  /**
   * 目標の詳細説明（任意）。
   */
  description?: string;

  /**
   * 目標の優先度（高・中・低）。
   */
  priority: GoalPriority;

  /**
   * 目標のカテゴリ（仕事・プライベート・健康・学習）。
   */
  category: GoalCategory;

  /**
   * 目標が完了しているかどうか。
   */
  completed: boolean;

  /**
   * この目標が作成された日時。
   */
  createdAt: Date;

  /**
   * 目標が完了した日時（完了していない場合は undefined）。
   */
  completedAt?: Date;
}

/**
 * 目標の優先度を表す列挙型。
 * - "high": 高優先度
 * - "medium": 中優先度
 * - "low": 低優先度
 */
export type GoalPriority = "high" | "medium" | "low";

/**
 * 目標のカテゴリを表す列挙型。
 * - "work": 仕事関連
 * - "personal": プライベート（家庭・趣味など）
 * - "health": 健康（運動・睡眠・食事など）
 * - "study": 学習（資格・語学・読書など）
 */
export type GoalCategory = "work" | "personal" | "health" | "study";
