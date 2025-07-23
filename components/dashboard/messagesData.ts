// components/dashboard/messagesData.ts
export async function fetchMessages(token: string) {
  const res = await fetch("http://localhost:5000/api/admin/requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
