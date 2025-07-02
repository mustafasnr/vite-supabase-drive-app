import { z } from "zod";

export const uploadFileSchema = z.object({
  file_upload: z
    .array(
      z
        .instanceof(File, { message: "Geçersiz dosya" })
        .refine((file) => file.size <= 50 * 1024 * 1024, {
          message: "Dosya boyutu 50MB'den fazla olamaz",
        }),
    )
    .min(1, { message: "En az bir dosya seçin." }),
});


export function validateFiles(rawFormData: any) {

  const x = uploadFileSchema.safeParse(rawFormData);
  if (x.error) {
    throw new Error("Form doğrulama hatası")
  }
  return x.data;
}