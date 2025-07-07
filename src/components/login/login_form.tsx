"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  loginDefaultValues,
  loginSchema,
} from "@/lib/form-schemas/login_schema";
import { loginAction } from "@/actions/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await loginAction(values);
      toast.success("Giriş Başarılı");
      navigate("/");
    } catch (error: any) {
      toast.error("Hata Meydana geldi: ", { description: error.message });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={isSubmitting ? Promise.resolve : form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="login_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input placeholder="a@example.com" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="login_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <PasswordInput placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <center>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            Giriş Yap
          </Button>
        </center>
      </form>
    </Form>
  );
}
