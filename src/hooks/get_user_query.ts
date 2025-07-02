import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUser } from '@/supabase/queries/getUser'
import { supabaseClient } from '@/supabase/client'
import { useAuth } from '@/context/auth-context'

export function useUser() {
  const queryClient = useQueryClient()
  const { user, session } = useAuth();
  const userId = user?.id;
  const query = useQuery(
    {
      queryKey: ['userData'],
      queryFn: getUser,
      staleTime: 1000 * 60 * 15,
      enabled: !!session,
    }
  )

  useEffect(() => {
    if (!userId) return;
    const channel = supabaseClient
      .channel('users_table_change')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${userId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['userData'] })
        }
      )
      .subscribe()


    return () => {
      supabaseClient.removeChannel(channel)
    }
  }, [queryClient])
  return query
}