import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// SLCC table names
export const TABLES = {
  MEMBERS:            'slcc_members',
  MEMBERSHIPS:        'slcc_memberships',
  MEMBERSHIP_PLANS:   'slcc_membership_plans',
  HEALTH_RECORDS:     'slcc_health_records',
  CARE_SERVICES:      'slcc_care_services',
  CARE_BOOKINGS:      'slcc_care_bookings',
  BILLING:            'slcc_billing',
  INSURANCE_CLAIMS:   'slcc_insurance_claims',
  IOT_DEVICES:        'slcc_iot_devices',
  IOT_EVENTS:         'slcc_iot_events',
  STAFF:              'slcc_staff',
  FACILITIES:         'slcc_facilities',
} as const

export type TableName = typeof TABLES[keyof typeof TABLES]
