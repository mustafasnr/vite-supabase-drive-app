import { supabaseClient } from "../client";

export async function getAllFiles() {
  const { data: userData, error: userError } = await supabaseClient.auth.getUser();

  if (userError || !userData?.user) {
    return [];
  }
  const userId = userData.user.id;
  const folderPath = `${userId}/`;

  const { data: files, error } = await supabaseClient.storage
    .from("drive")
    .list(folderPath, { limit: 100, offset: 0 });

  if (error) {
    return [];
  }

  return files;
}