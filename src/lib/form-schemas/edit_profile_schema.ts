import { z } from "zod";

export const edit_profile_schema = z.object({
  edit_profile_first_name: z
    .string()
    .min(1, "İsim boş bırakılamaz")
    .max(64, "İsim en fazla 64 karakter olabilir"),
  edit_profile_last_name: z
    .string()
    .min(1, "Soyisim boş bırakılamaz")
    .max(64, "Soyisim en fazla 64 karakter olabilir"),
  edit_profile_old_password: z
    .string()
    .min(6, "Eski şifre boş bırakılamaz")
    .max(32, "Eski şifre en fazla 32 karakter olabilir"),
  edit_profile_new_password: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 6 && val.length <= 32),
      { message: "Yeni şifre 6 ile 32 karakter arasında olmalı" }
    ),
  edit_profile_image: z
    .instanceof(File, { message: "Geçersiz dosya" })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: "Dosya boyutu 50MB'den fazla olamaz",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Sadece resim dosyası yükleyebilirsiniz",
    })
    .optional(),
});

export function validateEditProfile(values: any) {
  const { data } = edit_profile_schema.safeParse(values);
  return data;
}