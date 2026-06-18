export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;          // display string, e.g. "₹65,000"
  priceRaw: number;       // numeric, for filtering/sorting
  period?: string;        // e.g. "/mo"
  bedrooms: number;
  bathrooms: number;
  area: string;           // display string, e.g. "1,800 sqft"
  type: "Rent" | "Sale";
  category: "Builder Floor" | "Apartment" | "House" | "Villa" | "Studio";
  images: string[];
  videoLink?: string;     // optional walkthrough (mirrors Google Form "Video Link")
  description: string;
  amenities: string[];
  lat: number;            // optional map later
  lng: number;
  ownerType: "Owner" | "Broker";
  ownerId: string;
  ownerName: string;
  ownerPhone: string;     // display/tel string, e.g. "+91 98100 12345"
  ownerWhatsapp: string;  // digits only, e.g. "919810012345"
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
