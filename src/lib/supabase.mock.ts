// Mock Supabase implementation for testing designs without backend setup

// Mock data storage (in-memory, resets on page reload)
const mockWaitlist: any[] = []
const mockUsers: any[] = []
const mockEvents: any[] = []

// Types (same as real implementation)
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

// Mock Supabase client
export const supabase = {
  from: (table: string) => ({
    insert: (data: any[]) => ({
      select: () => ({
        single: async () => {
          await new Promise(resolve => setTimeout(resolve, 200))

          const record = {
            ...data[0],
            id: 'mock_' + Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString(),
          }

          console.log(`🎨 MOCK: Inserted into ${table}:`, record)

          // Store in mock storage
          if (table === 'waitlist') {
            // Check for duplicate email
            if (mockWaitlist.find(item => item.email === record.email)) {
              return {
                data: null,
                error: { code: '23505', message: 'Duplicate email' }
              }
            }
            mockWaitlist.push(record)
          } else if (table === 'users') {
            mockUsers.push(record)
          } else if (table === 'analytics_events') {
            mockEvents.push(record)
          }

          return { data: record, error: null }
        }
      })
    }),
    update: (updates: any) => ({
      eq: (field: string, value: any) => ({
        select: () => ({
          single: async () => {
            await new Promise(resolve => setTimeout(resolve, 200))
            console.log(`🎨 MOCK: Updated ${table} where ${field} = ${value}:`, updates)
            return { data: { id: value, ...updates }, error: null }
          }
        })
      })
    })
  })
}

// Helper functions (same signatures as real implementation)
export async function addToWaitlist(email: string, variant: string): Promise<WaitlistEntry> {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email, variant_seen: variant }])
    .select()
    .single()

  if (error) throw error
  return data as WaitlistEntry
}

export async function createUser(userData: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()

  if (error) throw error
  return data as User
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as User
}

// Debug helper to view mock data
export function getMockData() {
  return {
    waitlist: mockWaitlist,
    users: mockUsers,
    events: mockEvents,
  }
}

// Make it available in console for debugging
if (typeof window !== 'undefined') {
  (window as any).mockData = getMockData
  console.log('🎨 MOCK MODE: Supabase is mocked. Type mockData() in console to see stored data.')
}
