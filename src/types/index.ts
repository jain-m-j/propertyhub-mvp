export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceRaw: number;
  period?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: "Rent" | "Buy";
  category: "Apartment" | "Villa" | "House" | "Studio" | "Penthouse";
  images: string[];
  description: string;
  amenities: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  createdAt: string;
  status: "active" | "pending" | "expired";
  views: number;
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "user" | "admin";
  joinedAt: string;
  totalListings: number;
}

export interface FilterState {
  type: string;
  category: string[];
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  location: string;
  sortBy: string;
}
