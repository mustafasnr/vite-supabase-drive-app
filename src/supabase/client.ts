import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

function createSupabaseClient() {
  return createBrowserClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookieEncoding: "base64url",
    }
  );
}
export const supabaseClient = createSupabaseClient();