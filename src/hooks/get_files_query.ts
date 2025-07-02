import { useQuery } from "@tanstack/react-query";

import { getAllFiles } from "@/supabase/queries/getAllFiles";
import { useUser } from "./get_user_query";
import { useAuth } from "@/context/auth-context";

export function useAllFiles() {
  const { data: userData } = useUser();
  const { session } = useAuth();
  const query = useQuery({
    queryKey: ['userFiles'],
    queryFn: () => getAllFiles(),
    staleTime: 1000 * 60 * 5,
    enabled: !!userData?.id && !!session?.user,
  });

  return query;
}