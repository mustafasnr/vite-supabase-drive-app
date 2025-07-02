// to-do deleteFile
import { validateFiles } from "@/lib/form-schemas/file_upload_schema";
import { supabaseClient } from "@/supabase/client";
import { validateLoggedInUser } from "./auth";
import { validateRenameForm } from "@/lib/form-schemas/rename_schema";


export async function uploadFiles(params: any) {
  const { file_upload: files } = validateFiles(params); // files -> File[]

  // Kullanıcıyı doğrula
  const { data: userData, error: userError } = await validateLoggedInUser();
  if (userError) {
    throw new Error("Kullanıcı oturumu doğrulanamadı");
  }

  const userId = userData.user.id;

  // Dosyaları yükle
  const responses = await Promise.all(
    files.map(async (file) => {
      const { data, error } = await supabaseClient.storage
        .from("drive")
        .upload(`${userId}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false, // istersen true yapabilirsin
        });

      if (error) {
        return { name: file.name, message: error.message };
      } else {
        return { name: file.name, path: data?.path };
      }
    })
  );

  return { message: `${responses.length} dosya` };
}

export async function downloadFile(filePath: string) {
  const { data: userData, error: userError } = await validateLoggedInUser();
  if (userError) {
    throw new Error("Kullanıcı Oturumu Doğrulanamadı");
  }
  const { data, error } = await supabaseClient
    .storage
    .from("drive")
    .createSignedUrl(`${userData.user.id}/${filePath}`, 60)

  if (error) {
    throw new Error('Signed URL hatası:' + error.message)
  }

  // URL zaman aşımına uğramadan fetch başlasın
  const response = await fetch(data.signedUrl)
  const blob = await response.blob()

  // Tarayıcıda indir
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filePath.split('/').pop() || 'dosya'
  a.click()
  URL.revokeObjectURL(url)
}

export async function renameFile(oldPath: string, values: any) {
  const { data: userData, error: userError } = await validateLoggedInUser();
  if (userError) {
    throw new Error("Kullanıcı oturumu doğrulanamadı");
  }

  const result = validateRenameForm(values);
  if (!result) {
    throw new Error("Form doğrulama hatası");
  }

  const userId = userData.user.id;

  const _oldPath = [userId, oldPath].join("/");
  const pathParts = oldPath.split("/");

  pathParts[pathParts.length - 1] = result.rename_new_name;
  const newRelativePath = pathParts.join("/");
  const _newPath = [userId, newRelativePath].join("/");


  const { error: moveError } = await supabaseClient
    .storage
    .from("drive")
    .move(_oldPath, _newPath);

  if (moveError) {
    throw new Error(moveError.message);
  }
}


export async function deleteFile(fileName: string) {
  const { data: userData, error: userError } = await validateLoggedInUser();

  if (userError) {
    console.log(userError.message)
    throw new Error("Kullanıcı oturumu doğrulanamadı");
  }
  const userId = userData.user.id;
  const deleteFilePath = [userId, fileName].join("/");
  const { error: deleteError } = await supabaseClient.storage.from("drive").move(deleteFilePath, deleteFilePath, { destinationBucket: "trash" });

  if (deleteError) {
    console.log(deleteError.message)
    throw new Error(deleteError.message);
  }
}