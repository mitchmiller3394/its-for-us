import { useAuth } from '../context/AuthContext'

export function useCouple() {
  const { profile } = useAuth()
  const coupleId = profile?.couple_id ?? null
  return { coupleId }
}
