export async function requestNotificationPermission() {
  if (typeof window === "undefined" || !("Notification" in window))
    return { supported: false, permission: "unsupported" };
  const permission = await window.Notification.requestPermission();
  return { supported: true, permission };
}
export function showReminder(title, body) {
  if (
    typeof window === "undefined" ||
    !("Notification" in window) ||
    window.Notification.permission !== "granted"
  )
    return false;
  new window.Notification(title, { body });
  return true;
}
// Browser notifications only work when supported and permitted; they are not reliable background scheduling.
