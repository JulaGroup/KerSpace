import { API_URL } from "@/config/constat";

export async function fetchMessages(token: string) {
  const res = await fetch(
    `${API_URL}/api/admin/requests`, // Use API_URL constant
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
