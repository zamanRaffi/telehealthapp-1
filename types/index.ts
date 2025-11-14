export type Doctor = {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    yearsExperience: number;
    avatar: string;
    consultationFee: number;
    nextAvailable: string;
    bio: string;
    languages: string[];
    availability: {
      day: string;
      slots: string[];
    }[];
  };
  
  export type Appointment = {
    id: string;
    doctorId: string;
    doctorName: string;
    doctorSpecialty: string;
    doctorAvatar: string;
    date: string;
    time: string;
    type: "video" | "in-person";
    status: "upcoming" | "completed" | "cancelled";
  };
  
  export type Specialty = {
    id: string;
    name: string;
    icon: string;
  };
  