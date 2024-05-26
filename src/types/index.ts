import { Database } from "./supabase";

export type Movie = Database['public']['Tables']['Movies']['Row']