import { useFilesContext } from "@/context/files-context";
import { Button } from "../ui/button";
import { Download, Pencil, Trash2, X } from "lucide-react";
import { downloadFile } from "@/actions/file";
import { toast } from "sonner";
import { useDeleteFileMutation } from "@/hooks/mutations";

function FileOptions() {
  const { setRenameOpen } = useFilesContext();
  const { selectedFile, setSelectedFile } = useFilesContext();
  const deleteMutation = useDeleteFileMutation(() => setSelectedFile(null));
  return selectedFile ? (
    <div className="col-span-full mt-4 flex w-full flex-row items-center gap-2 rounded-full border px-4 py-2">
      <span className="mr-4">Dosya Seçildi</span>
      <Button
        size={"icon"}
        variant={"outline"}
        className="rounded-full"
        onClick={async () => {
          toast.promise(deleteMutation.mutateAsync(selectedFile.name), {
            loading: "Siliniyor...",
            success: "Dosya silindi",
            error: "Silme hatası",
            description: (data) => data?.message ?? "",
          });
        }}
      >
        <Trash2 />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        className="rounded-full"
        onClick={async () => {
          await downloadFile(selectedFile.name);
        }}
      >
        <Download />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        className="c rounded-full"
        onClick={async () => {
          setRenameOpen(true);
        }}
      >
        <Pencil />
      </Button>
      <div className="flex flex-1 items-center justify-end">
        <Button
          size={"icon"}
          variant={"outline"}
          className="c rounded-full"
          onClick={() => {
            setSelectedFile(null);
          }}
        >
          <X />
        </Button>
      </div>
    </div>
  ) : (
    <div className="col-span-full mt-4 flex w-full flex-row items-center gap-2 rounded-full border px-4 py-2">
      <span className="text-muted-foreground">İşlem yapmak için dosya seç</span>
    </div>
  );
}

export default FileOptions;
