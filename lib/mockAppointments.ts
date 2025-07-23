import { Property } from "@/types/property";

export const mockProperties: Property[] = [
  // ...existing mock properties...
];

export const mockAppointments = [
  {
    id: "a1",
    propertyId: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-1234",
    date: "2025-07-20",
    time: "14:00",
    message: "Interested in a quick tour.",
  },
  {
    id: "a2",
    propertyId: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "+1-555-5678",
    date: "2025-07-22",
    time: "10:30",
    message: "Can I bring my family?",
  },
  {
    id: "a3",
    propertyId: "1",
    name: "Bob Lee",
    email: "bob@example.com",
    phone: "+1-555-9999",
    date: "2025-07-25",
    time: "16:00",
    message: "Looking for investment property.",
  },
];
