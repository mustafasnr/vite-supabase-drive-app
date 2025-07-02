import { z } from "zod"
export const registerSchema = z.object({
    register_first_name: z
        .string()
        .min(1, "İsim boş bırakılamaz")
        .max(64, "İsim en fazla 64 karakter olabilir"),
    register_last_name: z
        .string()
        .min(1, "Soyisim boş bırakılamaz")
        .max(64, "Soyisim en fazla 64 karakter olabilir"),
    register_password: z
        .string()
        .min(6, "Şifre boş bırakılamaz")
        .max(32, "Şifre en fazla 32 karakter olabilir"),
    register_email: z
        .string()
        .min(1, "E-posta boş olamaz")
        .email("Hatalı E-posta"),
    register_term_of_services: z.boolean().refine((val) => val === true, {
        message: "Şartları kabul etmek zorundasınız",
    }),
    register_optional_notifications: z.boolean().default(false).optional(),
});

export const registerDefaultValues = {
    register_first_name: "",
    register_last_name: "",
    register_email: "",
    register_password: "",
    register_term_of_services: false,
    register_optional_notifications: false,
}

export function validateRegisterForm(data: any) {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
        throw new Error("Form Doğrulama Hatası");
    }
    return result.data;
}