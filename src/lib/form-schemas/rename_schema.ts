import { z } from "zod";

export const renameSchema = z.object({
  rename_new_name: z.string().min(1, "Dosya adı boş olamaz"),
});

export function validateRenameForm(params: any) {
  const { data } = renameSchema.safeParse(params);
  return data;
}