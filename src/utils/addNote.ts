import { supabase } from '../lib/supabaseClient'

export async function addNote(user: string, text: string) {
  if (!user || !text) {
    console.error('User or text is empty')
    return
  }

  const { data, error } = await supabase.from('notes').insert([
    { user, text }
  ])

  if (error) {
    console.error('Insert error:', error.message)
  } else {
    console.log('Note added:', data)
  }
}
