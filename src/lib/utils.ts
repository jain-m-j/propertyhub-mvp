import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property, User } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build a WhatsApp deep link to a listing's owner/broker with a prefilled enquiry.
 * @param numberDigits digits only, e.g. "919810012345"
 * @param title optional listing title to reference in the message
 */
export function whatsappLink(numberDigits: string, title?: string) {
  const text = title
    ? `Hi, I saw "${title}" on GharJi and I'd like to know more. Is it still available?`
    : `Hi, I'm enquiring about a property I saw on GharJi.`;
  return `https://wa.me/${numberDigits}?text=${encodeURIComponent(text)}`;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "3 BHK builder floor + terrace",
    location: "B Block, Sainik Farms",
    price: "₹65,000",
    priceRaw: 65000,
    period: "/mo",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,800 sqft",
    type: "Rent",
    category: "Builder Floor",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    ],
    description:
      "Bright, freshly painted builder floor on a quiet B Block lane. Independent terrace, modular kitchen, two covered parking spots and 24x7 backup. Walkable to the main market.",
    amenities: ["Private Terrace", "Modular Kitchen", "Covered Parking", "Power Backup", "Semi-Furnished"],
    lat: 28.4912,
    lng: 77.2031,
    ownerType: "Owner",
    ownerId: "u1",
    ownerName: "Rajesh Khanna",
    ownerPhone: "+91 98100 12345",
    ownerWhatsapp: "919810012345",
    createdAt: "2026-06-01",
    status: "active",
    views: 312,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Furnished 2 BHK apartment",
    location: "Western Avenue, Sainik Farms",
    price: "₹42,000",
    priceRaw: 42000,
    period: "/mo",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,150 sqft",
    type: "Rent",
    category: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    ],
    description:
      "Fully furnished 2 BHK on Western Avenue — ideal for a small family or working couple. Comes with beds, sofa, fridge, washing machine and ACs in both rooms. Gated lane with security.",
    amenities: ["Fully Furnished", "Air Conditioning", "Gated Security", "Parking", "Pet Friendly"],
    lat: 28.4889,
    lng: 77.1998,
    ownerType: "Broker",
    ownerId: "u2",
    ownerName: "Simran Real Estate",
    ownerPhone: "+91 98200 54321",
    ownerWhatsapp: "919820054321",
    createdAt: "2026-06-08",
    status: "active",
    views: 198,
  },
  {
    id: "3",
    title: "Villa with private pool",
    location: "Central Avenue, Sainik Farms",
    price: "₹1,75,000",
    priceRaw: 175000,
    period: "/mo",
    bedrooms: 3,
    bathrooms: 4,
    area: "4,000 sqft",
    type: "Rent",
    category: "Villa",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    ],
    description:
      "A standalone villa on Central Avenue set in a leafy plot with its own swimming pool and lawn. Double-height living room, staff room, and parking for four cars. Long-lease preferred.",
    amenities: ["Private Pool", "Landscaped Lawn", "Staff Room", "4-Car Parking", "Power Backup"],
    lat: 28.4925,
    lng: 77.2057,
    ownerType: "Owner",
    ownerId: "u3",
    ownerName: "Meera Anand",
    ownerPhone: "+91 99300 67890",
    ownerWhatsapp: "919930067890",
    createdAt: "2026-05-20",
    status: "active",
    views: 421,
    isFeatured: true,
  },
  {
    id: "4",
    title: "1 BHK studio for singles",
    location: "Said-ul-Ajaib, Sainik Farms",
    price: "₹22,000",
    priceRaw: 22000,
    period: "/mo",
    bedrooms: 1,
    bathrooms: 1,
    area: "560 sqft",
    type: "Rent",
    category: "Studio",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
    ],
    description:
      "Compact, sunlit studio in Said-ul-Ajaib — perfect for a single professional or student. Independent entrance, kitchenette and attached bath. Walking distance to autos and the metro feeder.",
    amenities: ["Independent Entrance", "Kitchenette", "Semi-Furnished", "Power Backup"],
    lat: 28.5072,
    lng: 77.1986,
    ownerType: "Broker",
    ownerId: "u2",
    ownerName: "Simran Real Estate",
    ownerPhone: "+91 98200 54321",
    ownerWhatsapp: "919820054321",
    createdAt: "2026-06-12",
    status: "active",
    views: 145,
  },
  {
    id: "5",
    title: "4 BHK house with lawn",
    location: "A Block, Sainik Farms",
    price: "₹1,10,000",
    priceRaw: 110000,
    period: "/mo",
    bedrooms: 4,
    bathrooms: 4,
    area: "3,200 sqft",
    type: "Rent",
    category: "House",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    ],
    description:
      "Spacious independent house on A Block with a front lawn and a large terrace. Four well-sized bedrooms, two living areas, and ample parking. Quiet, family-friendly stretch.",
    amenities: ["Front Lawn", "Terrace", "Parking", "Power Backup", "Unfurnished"],
    lat: 28.4948,
    lng: 77.2012,
    ownerType: "Owner",
    ownerId: "u1",
    ownerName: "Rajesh Khanna",
    ownerPhone: "+91 98100 12345",
    ownerWhatsapp: "919810012345",
    createdAt: "2026-05-28",
    status: "active",
    views: 276,
  },
  {
    id: "6",
    title: "Semi-furnished 2 BHK floor",
    location: "Khirki Extension, Sainik Farms",
    price: "₹35,000",
    priceRaw: 35000,
    period: "/mo",
    bedrooms: 2,
    bathrooms: 2,
    area: "980 sqft",
    type: "Rent",
    category: "Builder Floor",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    ],
    description:
      "Well-kept 2 BHK floor in Khirki Extension with wardrobes, fans, geysers and a modular kitchen. Good ventilation and a small balcony. Easy access to Saket and the metro.",
    amenities: ["Semi-Furnished", "Modular Kitchen", "Balcony", "Parking"],
    lat: 28.5219,
    lng: 77.2079,
    ownerType: "Broker",
    ownerId: "u4",
    ownerName: "Capital Homes",
    ownerPhone: "+91 97400 11223",
    ownerWhatsapp: "919740011223",
    createdAt: "2026-06-14",
    status: "active",
    views: 167,
  },
];

export const MOCK_USERS: User[] = [
  { id: "u1", name: "Rajesh Khanna", email: "rajesh@example.com", phone: "+91 98100 12345", role: "user", joinedAt: "2026-01-10", totalListings: 2 },
  { id: "u2", name: "Simran Real Estate", email: "simran@example.com", phone: "+91 98200 54321", role: "user", joinedAt: "2026-02-05", totalListings: 2 },
  { id: "u3", name: "Meera Anand", email: "meera@example.com", phone: "+91 99300 67890", role: "admin", joinedAt: "2025-12-01", totalListings: 1 },
  { id: "u4", name: "Capital Homes", email: "capital@example.com", phone: "+91 97400 11223", role: "user", joinedAt: "2026-03-18", totalListings: 1 },
];

// Current logged-in user (mock — internal/admin use only; buyers don't sign in)
export const CURRENT_USER: User = MOCK_USERS[0];
