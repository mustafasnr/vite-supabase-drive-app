import { validateEditProfile } from "@/lib/form-schemas/edit_profile_schema";
import { validateLoginForm } from "@/lib/form-schemas/login_schema";
import { validateRegisterForm } from "@/lib/form-schemas/register_schema";
import { checkPassword, createPasswordHash } from "@/lib/utils";
import { login, signOut, signUp, updateUser } from "@/supabase/auth";
import { supabaseClient } from "@/supabase/client";


export async function loginAction(formData: any) {
  try {
    const validatedData = validateLoginForm(formData);

    const { login_email, login_password } = validatedData;

    const { error } = await login({ email: login_email, password: login_password });

    if (error) {
      throw new Error(error.message);
    }

  } catch (err: any) {
    console.log(err.message)
    throw new Error(err.message);
  }
}

export async function registerAction(formData: any) {
  try {
    const { register_email, register_password, register_first_name, register_last_name } = validateRegisterForm(formData);
    const custom_hash = await createPasswordHash(register_password);


    const data = await signUp({
      email: register_email,
      password: register_password,
      options: {
        first_name: register_first_name,
        last_name: register_last_name,
        custom_hash: custom_hash,
      }
    });
    return data;
  } catch (err: any) {
    console.log(err.message)
    throw new Error(err.message);
  }
}

export async function logOutAction() {
  try {
    await signOut();
  } catch (err: any) {
    console.log(err.message)
    throw new Error(err.message);
  }
}

export async function validateLoggedInUser() {
  return await supabaseClient.auth.getUser();
}

export async function updateProfileAction(values: any, old_hash: string) {
  // 1) Kullanıcıyı doğrula
  const { data: userData, error: userError } = await validateLoggedInUser()
  if (userError) throw new Error('Kullanıcı oturumu doğrulanamadı')

  // 2) Formu doğrula
  const result = validateEditProfile(values)
  if (!result) throw new Error('Form doğrulama hatası')

  // 3) Eski parolayı kontrol et
  const isMatch = await checkPassword(result.edit_profile_old_password, old_hash)
  if (!isMatch) throw new Error('Parola hatalı')

  // 4) Yeni profil verilerini hazırla
  const updates: Record<string, any> = {
    first_name: result.edit_profile_first_name || undefined,
    last_name: result.edit_profile_last_name || undefined,
  }

  // 5) Profil fotoğrafı varsa yükle ve URL al
  if (result.edit_profile_image) {
    updates.profile_url = await uploadAndReplaceAvatar(userData.user.id, result.edit_profile_image)
  }

  // 6) Yeni parolayı işle
  if (result.edit_profile_new_password) {
    // Auth şifresini güncelle
    await supabaseClient.auth.updateUser({ password: result.edit_profile_new_password })
    // DB’de saklayacağımız hash’i oluştur
    updates.custom_hash = await createPasswordHash(result.edit_profile_new_password)
  }

  // 7) DB’de kullanıcı kaydını güncelle
  await updateUser(userData.user.id, updates)
}

async function uploadAndReplaceAvatar(userId: string, file: File): Promise<string> {
  const bucket = supabaseClient.storage.from('avatars')

  // Eski avatarı deletedavatars’a taşı
  const { data: files } = await bucket.list(userId)
  if (files?.length) {
    const oldPath = `${userId}/${files[0].name}`
    await bucket.move(oldPath, oldPath, { destinationBucket: 'deletedavatars' })
  }

  // Yeni dosyayı avatars/userId/ içine yükle
  const filePath = `${userId}/${file.name}`
  await bucket.upload(filePath, file, { upsert: true })

  // İmzalı URL döndür
  const { data } = bucket.getPublicUrl(filePath)

  return data?.publicUrl ?? ""
}