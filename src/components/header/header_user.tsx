import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeDropdown from "./theme_dropdown";
import { logOutHandler } from "@/lib/utils";
import { useUser } from "@/hooks/get_user_query";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { UserX2 } from "lucide-react";
import { useAccessibility } from "@/context/accessibility-context";
import { useIsMobile } from "@/hooks/use_mobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UploadSheetTriggerButton } from "../accessibility/upload_dialog";
import { CommandSheetTriggerButton } from "../accessibility/command_dialog";
import { SettingsSheetTriggerButton } from "../accessibility/settings_dialog";

function HeaderUser() {
  const { setSettingsOpen } = useAccessibility();
  const { data: user, isLoading, error } = useUser();
  const isMobile = useIsMobile();
  if (isLoading) {
    return (
      <Avatar>
        <Skeleton className="h-full w-full" />
      </Avatar>
    );
  }
  if (!user || error) {
    return (
      <Avatar asChild>
        <Button variant={"destructive"} size={"icon"} className="rounded-full">
          <UserX2 />
        </Button>
      </Avatar>
    );
  }

  return !isMobile ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile_url + ""} alt="profil resmi" />
          <AvatarFallback>
            {user.first_name![0] + user.last_name![0] + ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user?.first_name + " " + user?.last_name}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setSettingsOpen(true);
            }}
          >
            <User className="mr-2 size-4" />
            Profili Düzenle
          </DropdownMenuItem>

          {/* Tema Dropdown Menüsü */}
          <ThemeDropdown />

          <DropdownMenuItem
            onClick={async () => {
              await logOutHandler();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Sheet>
      <SheetTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile_url + ""} alt="profil resmi" />
          <AvatarFallback>
            {user.first_name![0] + user.last_name![0] + ""}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <Avatar className="size-20">
            <AvatarImage src={user?.profile_url + ""} alt="profil resmi" />
            <AvatarFallback>
              {user.first_name![0] + user.last_name![0] + ""}
            </AvatarFallback>
          </Avatar>

          <SheetTitle>{user?.first_name + " " + user?.last_name}</SheetTitle>
          <SheetDescription>{user?.email}</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min overflow-y-auto px-4">
          <UploadSheetTriggerButton />
          <CommandSheetTriggerButton />
          <SettingsSheetTriggerButton />
        </div>
        <SheetFooter>
          <Button
            className="items-center justify-start gap-2"
            variant={"outline"}
            onClick={async () => await logOutHandler()}
          >
            <LogOut />
            <span>Çıkış yap</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default HeaderUser;
