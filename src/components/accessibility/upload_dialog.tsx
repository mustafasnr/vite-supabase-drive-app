import { Upload } from "lucide-react";
import FileUploadForm from "../header/file_upload_form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useAccessibility } from "@/context/accessibility-context";

function UploadDialog({ open, setOpen }: { open: any; setOpen: any }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dosya Yükle</DialogTitle>
          <DialogDescription>
            Bir dosya en fazla 50 MB boyutunda olabilir.
          </DialogDescription>
        </DialogHeader>
        {/* Dosya Yükleme Alanı */}
        <FileUploadForm />
      </DialogContent>
    </Dialog>
  );
}
function UploadTriggerButton() {
  const { setUploadOpen } = useAccessibility();
  return (
    <Button
      className="cursor-pointer rounded-xl"
      onClick={() => {
        setUploadOpen(true);
      }}
    >
      <Upload />
      Yeni
    </Button>
  );
}
export { UploadDialog, UploadTriggerButton };
