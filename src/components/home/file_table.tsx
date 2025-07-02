import { downloadFile } from "@/actions/file";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileObject } from "@supabase/storage-js";
import { Download, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMemo } from "react";
import { cn, sizeToReadable } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFilesContext } from "@/context/files-context";
import { toast } from "sonner";
import { useDeleteFileMutation } from "@/hooks/mutations";

export function FileTable() {
  const { files, searchQuery, selectedFile, setSelectedFile } =
    useFilesContext();

  const filteredFiles = useMemo(() => {
    if (!files) return [];
    const query = searchQuery.toLowerCase().trim();
    if (!query) return files;

    return files.filter((file) => file.name.toLowerCase().includes(query));
  }, [files, searchQuery]);

  const selectFile = (file: FileObject) => {
    setSelectedFile(file);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-full pl-0">Dosya Adı</TableHead>
          <TableHead className="whitespace-nowrap">Oluşturma Zamanı</TableHead>
          <TableHead className="whitespace-nowrap">Konumu</TableHead>
          <TableHead className="whitespace-nowrap">Boyut</TableHead>
          <TableHead className="w-[40px] text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <ContextMenu key={file.id}>
              <ContextMenuTrigger asChild>
                <TableRow
                  onClick={() => selectFile(file)}
                  onContextMenu={() => {
                    selectFile(file);
                  }}
                  className={cn(
                    selectedFile?.id === file.id
                      ? "bg-blue-100/60 hover:bg-blue-100/60 dark:bg-blue-900/40 dark:hover:bg-blue-900/40"
                      : "",
                  )}
                >
                  <TableCell className="w-full pl-0">{file.name}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(file.created_at), "dd.MM.yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate text-sm">
                    {file.metadata?.path || "/"}
                  </TableCell>
                  <TableCell className="text-muted-foreground w-full max-w-[200px] truncate text-sm">
                    {sizeToReadable(file.metadata?.size) || "/"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      onOpenChange={(open) => open && selectFile(file)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="rounded-full"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <FileDropdownMenu />
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </ContextMenuTrigger>

              <FileContextMenu />
            </ContextMenu>
          ))
        ) : (
          <TableRow className="border-b">
            <TableCell colSpan={5} className="py-6 text-center">
              Dosya bulunamadı.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function FileContextMenu() {
  const { selectedFile, setSelectedFile, setRenameOpen } = useFilesContext();
  const deleteMutation = useDeleteFileMutation(() => setSelectedFile(null));
  return (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => {
          toast.promise(deleteMutation.mutateAsync(selectedFile?.name ?? ""), {
            loading: "Siliniyor...",
            success: "Dosya silindi",
            error: "Silme hatası",
            description: (data) => data?.message ?? "",
          });
        }}
      >
        <Trash2 className="mr-2 size-4 text-red-500" /> Sil
      </ContextMenuItem>
      <ContextMenuItem
        onClick={async () => {
          await downloadFile(selectedFile?.name ?? "");
        }}
      >
        <Download className="mr-2 size-4 text-blue-500" />
        İndir
      </ContextMenuItem>
      <ContextMenuItem onClick={() => setRenameOpen(true)}>
        <Pencil className="mr-2 size-4 text-yellow-500" /> Yeniden Adlandır
      </ContextMenuItem>
    </ContextMenuContent>
  );
}

function FileDropdownMenu() {
  const { selectedFile, setSelectedFile, setRenameOpen } = useFilesContext();

  const deleteMutation = useDeleteFileMutation(() => setSelectedFile(null));

  return (
    <DropdownMenuContent>
      <DropdownMenuItem
        onClick={() => {
          if (!selectedFile?.name) return;

          toast.promise(deleteMutation.mutateAsync(selectedFile.name), {
            loading: "Siliniyor...",
            success: "Dosya silindi",
            error: "Silme hatası",
          });
        }}
      >
        <Trash2 className="mr-2 size-4 text-red-500" /> Sil
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={async () => {
          if (!selectedFile?.name) return;
          await downloadFile(selectedFile.name);
        }}
      >
        <Download className="mr-2 size-4 text-blue-500" /> İndir
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setRenameOpen(true)}>
        <Pencil className="mr-2 size-4 text-yellow-500" /> Yeniden Adlandır
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
