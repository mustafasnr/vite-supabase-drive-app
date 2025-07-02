import { useTheme } from "next-themes";
import { CommandGroup, CommandItem, CommandShortcut } from "../ui/command";
import { Check, Monitor, Moon, Sun } from "lucide-react";

function CommandThemeSection() {
  const { theme, setTheme } = useTheme();
  return (
    <CommandGroup heading="Tema">
      <CommandItem onSelect={() => setTheme("light")}>
        <Sun />
        <span>Açık Tema</span>
        {theme === "light" && (
          <CommandShortcut>
            <Check />
          </CommandShortcut>
        )}
      </CommandItem>
      <CommandItem onSelect={() => setTheme("dark")}>
        <Moon />
        <span>Koyu Tema</span>
        {theme === "dark" && (
          <CommandShortcut>
            <Check />
          </CommandShortcut>
        )}
      </CommandItem>
      <CommandItem onSelect={() => setTheme("system")}>
        <Monitor />
        <span>Sistem Teması</span>
        {theme === "system" && (
          <CommandShortcut>
            <Check />
          </CommandShortcut>
        )}
      </CommandItem>
    </CommandGroup>
  );
}

export default CommandThemeSection;
