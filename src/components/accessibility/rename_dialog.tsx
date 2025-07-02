import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import RenameForm from "./rename_form";

function RenameDialog({ open, setOpen }: { open: any; setOpen: any }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeniden Adlandır</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <RenameForm />
      </DialogContent>
    </Dialog>
  );
}
export { RenameDialog };
