// Mock doctor data
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number; // years
  rating: number; // 0-5
  reviewCount: number;
  price: number; // in your currency
  avatar: string;
  bio: string;
  languages: string[];
  availability: string; // e.g., "Available Today", "Next available: Dec 25"
  education: string[];
  certifications: string[];
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Dermatologist",
    experience: 12,
    rating: 4.9,
    reviewCount: 328,
    price: 15000, // ₦15,000
    avatar: "/img/doc_1.png",
    bio: "Board-certified dermatologist specializing in acne treatment, skin cancer screening, and medical dermatology. Passionate about providing personalized care for all skin types.",
    languages: ["English", "French"],
    availability: "Available Today",
    education: [
      "MD - University of Lagos",
      "Dermatology Residency - Lagos University Teaching Hospital",
    ],
    certifications: [
      "Board Certified Dermatologist",
      "Fellow, American Academy of Dermatology",
    ],
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Cosmetic Dermatologist",
    experience: 8,
    rating: 4.8,
    reviewCount: 256,
    price: 18000,
    avatar: "/img/doc_2.png",
    bio: "Expert in cosmetic dermatology procedures including botox, fillers, and laser treatments. Dedicated to helping patients achieve natural-looking results.",
    languages: ["English", "Mandarin"],
    availability: "Next available: Dec 24",
    education: [
      "MD - University of Ibadan",
      "Cosmetic Dermatology Fellowship - Harvard Medical School",
    ],
    certifications: [
      "Board Certified Dermatologist",
      "Certified Cosmetic Dermatology Specialist",
    ],
  },
  {
    id: "dr-amina-yusuf",
    name: "Dr. Amina Yusuf",
    specialty: "Pediatric Dermatologist",
    experience: 10,
    rating: 5.0,
    reviewCount: 412,
    price: 16000,
    avatar: "/img/doc_3.png",
    bio: "Specializes in treating skin conditions in children and adolescents. Known for gentle approach and making young patients feel comfortable.",
    languages: ["English", "Hausa", "Yoruba"],
    availability: "Available Today",
    education: [
      "MD - Ahmadu Bello University",
      "Pediatric Dermatology Fellowship - Johns Hopkins",
    ],
    certifications: [
      "Board Certified Pediatric Dermatologist",
      "Member, Society for Pediatric Dermatology",
    ],
  },
  {
    id: "dr-james-okonkwo",
    name: "Dr. James Okonkwo",
    specialty: "Dermatologic Surgeon",
    experience: 15,
    rating: 4.9,
    reviewCount: 389,
    price: 20000,
    avatar: "/img/doc_4.png",
    bio: "Expert in dermatologic surgery including mole removal, skin cancer treatment, and scar revision. Over 15 years of surgical experience.",
    languages: ["English", "Igbo"],
    availability: "Next available: Dec 26",
    education: [
      "MD - University of Nigeria",
      "Dermatologic Surgery Fellowship - Mayo Clinic",
    ],
    certifications: [
      "Board Certified Dermatologic Surgeon",
      "Fellow, American College of Mohs Surgery",
    ],
  },
];

// Helper function to get doctor by ID
export const getDoctorById = (id: string): Doctor | undefined => {
  return DOCTORS.find((doc) => doc.id === id);
};

// Helper function to format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

