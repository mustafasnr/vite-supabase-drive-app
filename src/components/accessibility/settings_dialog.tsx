import { useAccessibility } from "@/context/accessibility-context";
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
function SettingsTriggerFunction() {
  const { setSettingsOpen } = useAccessibility();
  return setSettingsOpen(true);
}
export { SettingsDialog, SettingsTriggerFunction };
