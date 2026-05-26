import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Swap mock data with these when Supabase is ready ─────────────────────────
//
// export async function getProperties() {
//   const { data, error } = await supabase.from("properties").select("*").eq("status","active");
//   if (error) throw error;
//   return data;
// }
// export async function getPropertyById(id: string) {
//   const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
//   if (error) throw error;
//   return data;
// }
// export async function createProperty(property: Omit<Property,"id"|"createdAt"|"views">) {
//   const { data, error } = await supabase.from("properties").insert(property).select().single();
//   if (error) throw error;
//   return data;
// }
// export async function getUserListings(userId: string) {
//   const { data, error } = await supabase.from("properties").select("*").eq("owner_id", userId);
//   if (error) throw error;
//   return data;
// }
