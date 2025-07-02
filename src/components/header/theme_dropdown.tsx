import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-4">
        <Palette className="text-muted-foreground size-4" />
        Tema
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun />
              Açık
              {theme === "light" && (
                <DropdownMenuShortcut>
                  <Check />
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon />
              Koyu
              {theme === "dark" && (
                <DropdownMenuShortcut>
                  <Check />
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor />
              Sistem
              {theme === "system" && (
                <DropdownMenuShortcut>
                  <Check />
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

export default ThemeDropdown;
