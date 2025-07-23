// Simulate fetching from backend with a delay
export async function fetchAppointments() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3s delay
  const { mockAppointments } = await import("@/lib/mockAppointments");
  return mockAppointments;
}

export async function fetchListings() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3s delay
  const { mockProperties } = await import("@/lib/mockData");
  return mockProperties;
}
