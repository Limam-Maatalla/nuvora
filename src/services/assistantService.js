export async function getAssistantReply(message) {
  const normalized = String(message || "").trim();
  if (!normalized) return "Write a small question or goal to begin.";
  const lower = normalized.toLowerCase();
  if (lower.includes("study") || lower.includes("learn"))
    return "Try a 20-minute study block: define one outcome, remove one distraction, and write a two-line summary when you finish.";
  if (lower.includes("stress") || lower.includes("overwhelm"))
    return "Pause for a moment. Take three comfortable breaths, name the next smallest action, and give yourself permission to focus only on that action.";
  return "Thanks for sharing. What is one small next step you can take in the next five minutes? Keep it specific and realistic.";
}
