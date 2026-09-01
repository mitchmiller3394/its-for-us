import { supabase } from '../lib/supabaseClient'

export async function fetchTasks(coupleId) {
  if (!supabase) return { data: [], error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })

  return { data: data ?? [], error }
}

export async function createTask(payload) {
  if (!supabase) return { data: null, error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('tasks')
    .insert([payload])
    .select()
    .single()

  return { data, error }
}

export async function toggleTask(id, completed) {
  if (!supabase) return { error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('tasks')
    .update({ completed, completed_at: completed ? new Date().toISOString() : null })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteTask(id) {
  if (!supabase) return { error: 'Supabase not configured' }

  const { error } = await supabase.from('tasks').delete().eq('id', id)
  return { error }
}
