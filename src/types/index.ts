import { Database } from "./supabase";

export type Movie = Database['public']['Tables']['Movies']['Row']
export type MovieFunction = Database['public']['Tables']['Functions']['Row']
export type Ticket = Database['public']['Tables']['Tickets']['Row']