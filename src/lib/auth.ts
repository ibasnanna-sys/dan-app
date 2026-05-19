export function saveSession(member: any) {
  localStorage.setItem(
    "member",
    JSON.stringify(member)
  );
}

export function getSession() {
  const member =
    localStorage.getItem("member");

  if (!member) return null;

  return JSON.parse(member);
}

export function logoutSession() {
  localStorage.removeItem("member");

  window.location.href = "/login";
}
