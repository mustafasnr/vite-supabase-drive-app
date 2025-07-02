import { supabaseClient } from "./client";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

}

type RegisterOptions = {
  first_name?: string;
  last_name?: string;
  custom_hash?: string;
};
export async function signUp({ email, password, options }: {
  email: string;
  password: string;
  options?: RegisterOptions;
}) {
  return await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: options
    }
  });
}

export async function updateUser(
  userId: string,
  updates: {
    first_name?: string
    last_name?: string
    profile_url?: string
    custom_hash?: string
  }
) {
  const { error } = await supabaseClient
    .from('users')
    .update({
      ...updates,
    })
    .eq('id', userId)

  if (error) throw new Error(`Profil güncelleme hatası: ${error.message}`)
}

export async function signOut() {
  return await supabaseClient.auth.signOut();
}