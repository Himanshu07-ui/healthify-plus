export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string
          doctor_name: string
          fee: number
          id: string
          refund_amount: number | null
          specialty: string
          status: string
          time: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          doctor_name: string
          fee?: number
          id?: string
          refund_amount?: number | null
          specialty: string
          status?: string
          time: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          doctor_name?: string
          fee?: number
          id?: string
          refund_amount?: number | null
          specialty?: string
          status?: string
          time?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blood_donors: {
        Row: {
          blood_group: string
          created_at: string
          id: string
          is_available: boolean
          last_donation_date: string | null
          location: string
          phone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          blood_group: string
          created_at?: string
          id?: string
          is_available?: boolean
          last_donation_date?: string | null
          location: string
          phone: string
          updated_at?: string
          user_id: string
        }
        Update: {
          blood_group?: string
          created_at?: string
          id?: string
          is_available?: boolean
          last_donation_date?: string | null
          location?: string
          phone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          contact_name: string
          created_at: string
          id: string
          is_primary: boolean
          phone: string
          relationship: string
          user_id: string
        }
        Insert: {
          contact_name: string
          created_at?: string
          id?: string
          is_primary?: boolean
          phone: string
          relationship: string
          user_id: string
        }
        Update: {
          contact_name?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          phone?: string
          relationship?: string
          user_id?: string
        }
        Relationships: []
      }
      health_assessments: {
        Row: {
          answers: Json | null
          assessment_type: string
          created_at: string
          id: string
          recommendations: string[] | null
          risk_level: string
          score: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_type: string
          created_at?: string
          id?: string
          recommendations?: string[] | null
          risk_level?: string
          score?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_type?: string
          created_at?: string
          id?: string
          recommendations?: string[] | null
          risk_level?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      medication_reminders: {
        Row: {
          created_at: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          is_active: boolean
          medicine_name: string
          notes: string | null
          start_date: string
          times: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dosage: string
          end_date?: string | null
          frequency?: string
          id?: string
          is_active?: boolean
          medicine_name: string
          notes?: string | null
          start_date?: string
          times?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          is_active?: boolean
          medicine_name?: string
          notes?: string | null
          start_date?: string
          times?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      medicine_history: {
        Row: {
          category: string | null
          created_at: string
          generic_name: string | null
          id: string
          medicine_name: string
          source: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          generic_name?: string | null
          id?: string
          medicine_name: string
          source: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          generic_name?: string | null
          id?: string
          medicine_name?: string
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          activities: string[] | null
          created_at: string
          id: string
          mood_label: string
          mood_score: number
          notes: string | null
          user_id: string
        }
        Insert: {
          activities?: string[] | null
          created_at?: string
          id?: string
          mood_label?: string
          mood_score: number
          notes?: string | null
          user_id: string
        }
        Update: {
          activities?: string[] | null
          created_at?: string
          id?: string
          mood_label?: string
          mood_score?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      telemedicine_sessions: {
        Row: {
          created_at: string
          doctor_name: string
          duration_minutes: number | null
          id: string
          notes: string | null
          prescription: string | null
          scheduled_at: string
          session_type: string
          specialty: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          doctor_name: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          prescription?: string | null
          scheduled_at: string
          session_type?: string
          specialty?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          doctor_name?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          prescription?: string | null
          scheduled_at?: string
          session_type?: string
          specialty?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vitals: {
        Row: {
          created_at: string
          diastolic: number | null
          id: string
          notes: string | null
          recorded_at: string
          systolic: number | null
          unit: string
          user_id: string
          value: number
          vital_type: string
        }
        Insert: {
          created_at?: string
          diastolic?: number | null
          id?: string
          notes?: string | null
          recorded_at?: string
          systolic?: number | null
          unit: string
          user_id: string
          value: number
          vital_type: string
        }
        Update: {
          created_at?: string
          diastolic?: number | null
          id?: string
          notes?: string | null
          recorded_at?: string
          systolic?: number | null
          unit?: string
          user_id?: string
          value?: number
          vital_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "doctor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "user"],
    },
  },
} as const
