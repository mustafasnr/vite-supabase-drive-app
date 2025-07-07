import { useAccessibility } from "@/context/accessibility-context";
import CommandFileSection from "../command/file_section";
import CommandProfileSection from "../command/profile_section";
import CommandThemeSection from "../command/theme_section";
import { Button } from "../ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useEffect } from "react";

function CmmndDialog({ open, setOpen }: { open: any; setOpen: any }) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Kısayol Ara" />
      <CommandList>
        <CommandEmpty>Sonuç Bulunamadı</CommandEmpty>

        {/* Command File Shortcuts */}
        <CommandFileSection />
        <CommandSeparator />
        {/* Command Profile Shortcuts */}
        <CommandProfileSection />
        <CommandSeparator />
        {/* Command Theme Shortcuts */}
        <CommandThemeSection />
      </CommandList>
    </CommandDialog>
  );
}

function CommandTriggerButton() {
  const { setCommandOpen } = useAccessibility();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open: boolean) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <Button
      variant="outline"
      className="hidden cursor-pointer items-center justify-between gap-2.5 rounded-xl text-sm md:flex"
      onClick={() => setCommandOpen(true)}
    >
      <span className="hidden text-xs lg:block">Kısayollar</span>
      <div className="flex gap-0.5">
        <span>
          <kbd className="bg-muted text-foreground rounded px-1 text-xs">
            Ctrl
          </kbd>
        </span>
        <span>
          <kbd className="bg-muted text-foreground rounded px-1 text-xs">K</kbd>
        </span>
      </div>
    </Button>
  );
}

function CommandSheetTriggerButton() {
  const { setCommandOpen } = useAccessibility();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open: boolean) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <Button
      className="flex cursor-pointer flex-row items-center justify-start px-0"
      variant={"link"}
      onClick={() => {
        setCommandOpen(true);
      }}
    >
      <span>Kısayollar</span>
    </Button>
  );
}

export { CmmndDialog, CommandTriggerButton, CommandSheetTriggerButton };
