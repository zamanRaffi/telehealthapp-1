import { Appointment } from "../types";

export const appointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "General",
    doctorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    date: "2025-11-14",
    time: "2:00 PM",
    type: "video",
    status: "upcoming",
  },
  {
    id: "2",
    doctorId: "5",
    doctorName: "Dr. Priya Patel",
    doctorSpecialty: "Psychiatry",
    doctorAvatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    date: "2025-11-16",
    time: "11:00 AM",
    type: "video",
    status: "upcoming",
  },
  
];
