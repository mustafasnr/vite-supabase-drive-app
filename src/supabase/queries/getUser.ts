import { supabaseClient } from "../client";

export async function getUser() {
  const { data: userData, error } = await supabaseClient.auth.getUser();

  if (!error) {
    const { data, error } = await supabaseClient
      .from("users")
      .select(`id, email, first_name, last_name, profile_url, created_at,custom_hash`)
      .eq("id", userData.user.id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
  return null;
}
