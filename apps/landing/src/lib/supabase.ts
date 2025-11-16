import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - using mock implementation')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any // Will be replaced by mock in index.ts

// Types
export interface User {
  id: string
  email: string
  stripe_customer_id?: string
  subscription_status?: 'active' | 'canceled' | 'past_due'
  subscription_id?: string
  created_at: string
  updated_at: string
}

export interface WaitlistEntry {
  id: string
  email: string
  variant_seen: 'neo_brutalist' | 'modern' | 'production_studio'
  created_at: string
}

export interface AnalyticsEvent {
  id: string
  event_name: string
  variant: string
  metadata?: Record<string, any>
  created_at: string
}

// Helper functions
export async function addToWaitlist(email: string, variant: string) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email, variant_seen: variant }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createUser(userData: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateUser(id: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
