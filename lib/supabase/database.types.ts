export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cities: {
        Row: {
          badge: string | null
          cost_of_living: number | null
          coworking_count: number | null
          description: string | null
          id: string
          internet_speed: number | null
          name: string
          name_en: string
          network_quality: number | null
          rank: number
          rating: number | null
          recommended_area: string | null
          review_count: number | null
          tags: string[] | null
        }
        Insert: {
          badge?: string | null
          cost_of_living?: number | null
          coworking_count?: number | null
          description?: string | null
          id: string
          internet_speed?: number | null
          name: string
          name_en: string
          network_quality?: number | null
          rank: number
          rating?: number | null
          recommended_area?: string | null
          review_count?: number | null
          tags?: string[] | null
        }
        Update: {
          badge?: string | null
          cost_of_living?: number | null
          coworking_count?: number | null
          description?: string | null
          id?: string
          internet_speed?: number | null
          name?: string
          name_en?: string
          network_quality?: number | null
          rank?: number
          rating?: number | null
          recommended_area?: string | null
          review_count?: number | null
          tags?: string[] | null
        }
        Relationships: []
      }
      coworking_spaces: {
        Row: {
          address: string | null
          amenities: string[] | null
          city: string
          id: string
          name: string
          price_per_day: number | null
          rating: number | null
          review_count: number | null
          wifi: boolean | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          city: string
          id: string
          name: string
          price_per_day?: number | null
          rating?: number | null
          review_count?: number | null
          wifi?: boolean | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          city?: string
          id?: string
          name?: string
          price_per_day?: number | null
          rating?: number | null
          review_count?: number | null
          wifi?: boolean | null
        }
        Relationships: []
      }
      meetup_rsvps: {
        Row: {
          created_at: string | null
          meetup_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          meetup_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          meetup_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetup_rsvps_meetup_id_fkey"
            columns: ["meetup_id"]
            isOneToOne: false
            referencedRelation: "meetups"
            referencedColumns: ["id"]
          },
        ]
      }
      meetups: {
        Row: {
          category: string | null
          city: string
          date: string
          description: string | null
          id: string
          max_attendees: number | null
          organizer: string | null
          organizer_id: string | null
          rsvp_count: number | null
          tags: string[] | null
          title: string
        }
        Insert: {
          category?: string | null
          city: string
          date: string
          description?: string | null
          id: string
          max_attendees?: number | null
          organizer?: string | null
          organizer_id?: string | null
          rsvp_count?: number | null
          tags?: string[] | null
          title: string
        }
        Update: {
          category?: string | null
          city?: string
          date?: string
          description?: string | null
          id?: string
          max_attendees?: number | null
          organizer?: string | null
          organizer_id?: string | null
          rsvp_count?: number | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author: string | null
          author_id: string | null
          category: string | null
          city: string | null
          comments_count: number | null
          content: string | null
          date: string | null
          id: string
          likes_count: number | null
          tags: string[] | null
          title: string
        }
        Insert: {
          author?: string | null
          author_id?: string | null
          category?: string | null
          city?: string | null
          comments_count?: number | null
          content?: string | null
          date?: string | null
          id: string
          likes_count?: number | null
          tags?: string[] | null
          title: string
        }
        Update: {
          author?: string | null
          author_id?: string | null
          category?: string | null
          city?: string | null
          comments_count?: number | null
          content?: string | null
          date?: string | null
          id?: string
          likes_count?: number | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          favorite_city: string | null
          id: string
          nickname: string
        }
        Insert: {
          created_at?: string | null
          favorite_city?: string | null
          id: string
          nickname: string
        }
        Update: {
          created_at?: string | null
          favorite_city?: string | null
          id?: string
          nickname?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          city_name: string | null
          content: string | null
          coworking_id: string | null
          created_at: string | null
          date: string | null
          hashtags: string[] | null
          id: string
          nickname: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          city_name?: string | null
          content?: string | null
          coworking_id?: string | null
          created_at?: string | null
          date?: string | null
          hashtags?: string[] | null
          id: string
          nickname?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          city_name?: string | null
          content?: string | null
          coworking_id?: string | null
          created_at?: string | null
          date?: string | null
          hashtags?: string[] | null
          id?: string
          nickname?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_coworking_id_fkey"
            columns: ["coworking_id"]
            isOneToOne: false
            referencedRelation: "coworking_spaces"
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
