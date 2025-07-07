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
      className="hidden cursor-pointer rounded-xl md:flex"
      onClick={() => {
        setUploadOpen(true);
      }}
    >
      <Upload />
      <span className="hidden lg:block">Yeni</span>
    </Button>
  );
}
function UploadSheetTriggerButton() {
  const { setUploadOpen } = useAccessibility();
  return (
    <Button
      className="flex cursor-pointer flex-row items-center justify-start px-0"
      variant={"link"}
      onClick={() => {
        setUploadOpen(true);
      }}
    >
      <span>Dosya Yükle</span>
    </Button>
  );
}
export { UploadDialog, UploadTriggerButton, UploadSheetTriggerButton };
