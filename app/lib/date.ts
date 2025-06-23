/**
 * 現在の日付を日本語形式でフォーマットして返します。
 *
 * フォーマット例: `2025年6月23日月曜日`
 *
 * `toLocaleDateString` を使用して、以下の形式で出力します：
 * - 年：西暦（例：2025年）
 * - 月：日本語の月名（例：6月）
 * - 日：日付（例：23日）
 * - 曜日：日本語の曜日名（例：月曜日）
 *
 * @returns `"2025年6月23日月曜日"` のような日本語ロケール（ja-JP）で整形された日付文字列
 */
export function getTodayFormatted(): string {
  return new Date().toLocaleDateString("ja-jp", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "Asia/Tokyo",
  });
}
