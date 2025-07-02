import { z } from "zod"
export const loginSchema = z.object({
    login_password: z
        .string()
        .min(6, "Şifre boş bırakılamaz")
        .max(32, "Şifre en fazla 32 karakter olabilir"),
    login_email: z.string().min(1, "E-posta boş olamaz").email("Hatalı E-posta"),
});

export const loginDefaultValues = {
    login_email: "",
    login_password: "",
}


export function validateLoginForm(data: any) {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        throw new Error("Form Doğrulama Hatası");
    }
    return result.data;
}