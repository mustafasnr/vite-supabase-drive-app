"use client";
import { useState } from "react";
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
import { useUser } from "@/hooks/get_user_query";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-uploader";
import { CloudUpload, Paperclip } from "lucide-react";
import { edit_profile_schema } from "@/lib/form-schemas/edit_profile_schema";
import { useAccessibility } from "@/context/accessibility-context";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/hooks/mutations";

export default function EditProfileForm() {
  const { settingsOpen, setSettingsOpen } = useAccessibility();
  const { data: userData } = useUser();
  const [submit, setSubmit] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const updateMutation = useUpdateProfileMutation();
  const dropZoneConfig = {
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 4,
    accept: {
      "image/*": [],
    },
  };
  const form = useForm<z.infer<typeof edit_profile_schema>>({
    resolver: zodResolver(edit_profile_schema),
    defaultValues: {
      edit_profile_first_name: userData?.first_name ?? "",
      edit_profile_last_name: userData?.last_name ?? "",
      edit_profile_old_password: "",
      edit_profile_new_password: "",
      edit_profile_image: undefined as any, // zorunlu alan için, başta undefined olabilir
    },
  });

  function onSubmit(values: z.infer<typeof edit_profile_schema>) {
    if (!settingsOpen || submit) return;
    setSubmit(true);
    toast.promise(
      updateMutation.mutateAsync({
        values,
      }),
      {
        loading: "Düzenleme işlemi devam ediyor",
        success: () => {
          setSubmit(true);
          setSettingsOpen(false);
          return "Profil düzenleme başarılı";
        },
        error: "Düzenleme işlemi hata",
        description: (data) => data?.message ?? "",
        finally: () => {
          setSubmit(false);
        },
      },
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="edit_profile_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="edit_profile_last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soyad</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="edit_profile_old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eski Şifre</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="edit_profile_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yeni Şifre</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="edit_profile_image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(newFiles) => {
                    // newFiles ya File ya File[] geliyor; silince [] dönüyor
                    if (Array.isArray(newFiles)) {
                      if (newFiles.length === 0) {
                        setFiles([]);
                        field.onChange(undefined);
                        return;
                      }
                      const incomingFile = newFiles[0];
                      setFiles([incomingFile]);
                      field.onChange(incomingFile);
                    } else if (!newFiles) {
                      setFiles([]);
                      field.onChange(undefined);
                    } else {
                      setFiles([newFiles]);
                      field.onChange(newFiles);
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="bg-background relative overflow-visible rounded-lg"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-1 outline-slate-500 outline-dashed"
                  >
                    <div className="flex w-full flex-col items-center justify-center p-8">
                      <CloudUpload className="text-muted-foreground h-10 w-10" />
                      <p className="text-muted-foreground mb-1 text-sm">
                        <span className="font-semibold">
                          Tıkla ya da dosyayı buraya sürükle (tek dosya)
                        </span>
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent
                    className="max-h-20 overflow-y-auto"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    {files.length > 0 && (
                      <FileUploaderItem index={0}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{files[0].name}</span>
                      </FileUploaderItem>
                    )}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={submit}>
            Düzenle
          </Button>
        </div>
      </form>
    </Form>
  );
}
