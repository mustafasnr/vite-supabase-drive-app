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
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-uploader";
import { uploadFiles } from "@/actions/file";
import { uploadFileSchema } from "@/lib/form-schemas/file_upload_schema";
import { toast } from "sonner";
import { useAccessibility } from "@/context/accessibility-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function FileUploadForm() {
  const { setUploadOpen } = useAccessibility();
  const [files, setFiles] = useState<File[]>([]);
  const queryClient = useQueryClient();

  const dropZoneConfig = {
    accept: undefined,
    maxFiles: Infinity,
    maxSize: Infinity,
    multiple: true,
  };
  const form = useForm<z.infer<typeof uploadFileSchema>>({
    resolver: zodResolver(uploadFileSchema),
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFiles"] });
    },
  });

  async function onSubmit(values: z.infer<typeof uploadFileSchema>) {
    setUploadOpen(false);
    toast.promise(uploadMutation.mutateAsync(values), {
      success: "Dosya(lar) Yüklendi",
      loading: "Yükleniyor...",
      error: "Yükleme hatası",
      description: (data) => data?.message ?? "",
    });
  }

  const isSameFile = (a: File, b: File) =>
    a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="file_upload"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(newFiles) => {
                    if (!newFiles) return;

                    // File[]'e çevir
                    const incomingFiles = Array.isArray(newFiles)
                      ? newFiles
                      : [newFiles];

                    // Dosya silme: Eğer önceki dosyadan biri artık yoksa
                    const removedFiles = files.filter(
                      (existingFile) =>
                        !incomingFiles.some((incomingFile) =>
                          isSameFile(existingFile, incomingFile),
                        ),
                    );

                    // Dosya ekleme: Eğer yeni dosya daha önce yoksa
                    const addedFiles = incomingFiles.filter(
                      (incomingFile) =>
                        !files.some((existingFile) =>
                          isSameFile(existingFile, incomingFile),
                        ),
                    );

                    // Yeni dosya listesi (eklenenler ve kalanlar)
                    const updatedFiles = [
                      ...files.filter(
                        (file) =>
                          !removedFiles.some((removedFile) =>
                            isSameFile(file, removedFile),
                          ),
                      ),
                      ...addedFiles,
                    ];

                    setFiles(updatedFiles);
                    field.onChange(updatedFiles);
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
                          Tıkla ya da dosyaları buraya sürükle
                        </span>
                      </p>
                      {/* <p className="text-muted-foreground text-xs">
                        Sadece resim dosyaları (.jpg,.png...)
                      </p> */}
                    </div>
                  </FileInput>
                  <FileUploaderContent
                    className="max-h-20 overflow-y-auto"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    {files?.map((file, i) => (
                      <FileUploaderItem key={i} index={i}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button type="submit" className="cursor-pointer">
            Yükle
          </Button>
        </div>
      </form>
    </Form>
  );
}
