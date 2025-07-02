import { CommandGroup, CommandItem } from "../ui/command";
import { LogOut, User } from "lucide-react";
import { logOutHandler } from "@/lib/utils";
import { useAccessibility } from "@/context/accessibility-context";

function CommandProfileSection() {
  const { setSettingsOpen, setCommandOpen } = useAccessibility();
  return (
    <CommandGroup heading="Profil">
      <CommandItem
        onSelect={() => {
          setCommandOpen(false);
          setSettingsOpen(true);
        }}
      >
        <User />
        <span>Profili Düzenle</span>
      </CommandItem>
      <CommandItem
        onSelect={async () => {
          await logOutHandler();
        }}
      >
        <LogOut />
        <span>Çıkış Yap</span>
      </CommandItem>
    </CommandGroup>
  );
}

export default CommandProfileSection;
