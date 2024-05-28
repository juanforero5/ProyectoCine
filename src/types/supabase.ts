export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Functions: {
        Row: {
          date: string | null
          id: number
          movie_id: number | null
          room_name: string | null
          time: string | null
        }
        Insert: {
          date?: string | null
          id?: number
          movie_id?: number | null
          room_name?: string | null
          time?: string | null
        }
        Update: {
          date?: string | null
          id?: number
          movie_id?: number | null
          room_name?: string | null
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Functions_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "Movies"
            referencedColumns: ["id"]
          },
        ]
      }
      Movies: {
        Row: {
          genre: string | null
          id: number
          img: string | null
          synopsis: string | null
          title: string | null
        }
        Insert: {
          genre?: string | null
          id?: number
          img?: string | null
          synopsis?: string | null
          title?: string | null
        }
        Update: {
          genre?: string | null
          id?: number
          img?: string | null
          synopsis?: string | null
          title?: string | null
        }
        Relationships: []
      }
      Tickets: {
        Row: {
          function_id: number | null
          id: number
          seat_id: string | null
          user_id: string | null
        }
        Insert: {
          function_id?: number | null
          id?: number
          seat_id?: string | null
          user_id?: string | null
        }
        Update: {
          function_id?: number | null
          id?: number
          seat_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Tickets_function_id_fkey"
            columns: ["function_id"]
            isOneToOne: false
            referencedRelation: "Functions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
