import { useAccessibility } from "@/context/accessibility-context";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EditProfileForm from "./edit_profile_form";

function SettingsDialog({ open, setOpen }: { open: any; setOpen: any }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profili Düzenle</DialogTitle>
          <DialogDescription className="sr-only">
            Aşağıda profilini düzenle
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm />
      </DialogContent>
    </Dialog>
  );
}
function SettingsSheetTriggerButton() {
  const { setSettingsOpen } = useAccessibility();
  return (
    <Button
      className="flex cursor-pointer flex-row items-center justify-start px-0"
      variant={"link"}
      onClick={() => {
        setSettingsOpen(true);
      }}
    >
      <span>Profili Düzenle</span>
    </Button>
  );
}
export { SettingsDialog, SettingsSheetTriggerButton };
