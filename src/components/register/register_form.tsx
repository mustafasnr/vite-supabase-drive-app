"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
  registerDefaultValues,
  registerSchema,
} from "@/lib/form-schemas/register_schema";
import { registerAction } from "@/actions/auth";

export default function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log("register tetiklendi");
    try {
      await registerAction(values);
      toast.success("Kayıt Başarılı");
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
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="register_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İsim</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mustafa"
                      type="text"
                      {...field}
                      maxLength={64}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="register_last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soy İsim</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Söner"
                      type="text"
                      {...field}
                      maxLength={64}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="register_email"
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
          name="register_password"
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
        <div className="col-span-12">
          <FormField
            control={form.control}
            name="register_term_of_services"
            render={({ field }) => (
              <>
                <FormLabel
                  htmlFor="register_term_of_services"
                  className="hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-primary/10 has-[[aria-checked=true]]:border-primary/25 has-[[aria-checked=true]]:bg-primary/15 dark:has-[[aria-checked=true]]:border-primary/25 dark:has-[[aria-checked=true]]:bg-primary/15 flex items-start gap-3 rounded-md border p-4 text-base focus-visible:ring-[3px] focus-visible:outline-none dark:border"
                  aria-checked={field.value}
                  role="checkbox"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      field.onChange(!field.value);
                    }
                  }}
                >
                  <Checkbox
                    id="register_term_of_services"
                    name="register_term_of_services"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    tabIndex={-1}
                    className="border-primary/25 border"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Üyelik Şartlarını Kabul Ediyorum
                      <span className="px-1">*</span>
                    </p>
                    <FormDescription>Açıklama1</FormDescription>
                  </div>
                </FormLabel>
                <FormMessage />
              </>
            )}
          />
        </div>
        <div className="col-span-12">
          <FormField
            control={form.control}
            name="register_optional_notifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="register_optional_notifications"
                  className="hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-primary/10 has-[[aria-checked=true]]:border-primary/25 has-[[aria-checked=true]]:bg-primary/15 dark:has-[[aria-checked=true]]:border-primary/25 dark:has-[[aria-checked=true]]:bg-primary/15 flex items-start gap-3 rounded-md border p-4 text-base focus-visible:ring-[3px] focus-visible:outline-none dark:border"
                  aria-checked={field.value}
                  role="checkbox"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      field.onChange(!field.value);
                    }
                  }}
                >
                  <Checkbox
                    id="register_optional_notifications"
                    name="register_optional_notifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    tabIndex={-1}
                    className="border-primary/25 border"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Değişikliklerden Haberdar ol
                    </p>
                    <FormDescription>Açıklama2</FormDescription>
                  </div>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <center>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            Kaydı Tamamla
          </Button>
        </center>
      </form>
    </Form>
  );
}
