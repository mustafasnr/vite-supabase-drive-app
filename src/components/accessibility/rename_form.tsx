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
import { useFilesContext } from "@/context/files-context";
import { renameFile } from "@/actions/file";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  rename_new_name: z.string().min(1, "Dosya adı boş olamaz"),
});

export default function RenameForm() {
  const queryClient = useQueryClient();
  const { selectedFile, setRenameOpen, setSelectedFile } = useFilesContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rename_new_name: selectedFile!.name,
    },
  });
  const renameMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      renameFile(selectedFile!.name, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFiles"] });
      setSelectedFile(null);
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setRenameOpen(false);

    toast.promise(renameMutation.mutateAsync(values), {
      loading: "İşlem sürüyor...",
      success: "Dosya adı değiştirildi",
      error: (err) => err?.message ?? "Hata oluştu",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="rename_new_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeni Dosya Adı</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button type="submit">Tamamla</Button>
        </div>
      </form>
    </Form>
  );
}
