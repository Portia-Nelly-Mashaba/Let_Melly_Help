/** Best-effort parse for Gemini responses that may wrap JSON in fences. */
export function parseModelJson<T>(raw: string): T {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) text = fence[1].trim();
  return JSON.parse(text) as T;
}
