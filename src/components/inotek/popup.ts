/** Template `showPopup()`: toast in the bottom-left corner that disappears after 3 seconds. */
export function showPopup(status: "success" | "error", message: string) {
  const host = document.getElementById("inotek-portal") ?? document.body;
  const popup = document.createElement("div");
  popup.className = `popup-status ${status}`;
  popup.setAttribute("role", status === "error" ? "alert" : "status");
  const icon = document.createElement("i");
  icon.className = `far fa-${status === "success" ? "check-circle" : "times-circle"}`;
  popup.append(icon, ` ${message}`);
  host.appendChild(popup);
  window.setTimeout(() => popup.remove(), 3000);
}
