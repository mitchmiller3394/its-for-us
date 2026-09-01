import { supabase } from '../lib/supabaseClient'

export async function fetchEvents(coupleId) {
  if (!supabase) return { data: [], error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('couple_id', coupleId)
    .order('start_at', { ascending: true })

  return { data: data ?? [], error }
}

export async function createEvent(payload) {
  if (!supabase) return { data: null, error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('calendar_events')
    .insert([payload])
    .select()
    .single()

  return { data, error }
}

export async function deleteEvent(id) {
  if (!supabase) return { error: 'Supabase not configured' }

  const { error } = await supabase.from('calendar_events').delete().eq('id', id)
  return { error }
}
