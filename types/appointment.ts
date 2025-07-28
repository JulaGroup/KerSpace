export interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  propertyId: string;
  userId: string;
}
