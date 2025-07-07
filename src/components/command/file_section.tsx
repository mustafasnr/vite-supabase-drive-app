import { CommandGroup, CommandItem } from "../ui/command";
import { Search, Upload } from "lucide-react";
import { useAccessibility } from "@/context/accessibility-context";
import { useIsMobile } from "@/hooks/use_mobile";

function CommandFileSection() {
  const { setCommandOpen, requestSearchFocus, setUploadOpen } =
    useAccessibility();
  const isMobile = useIsMobile();
  return (
    <CommandGroup heading="Dosya İşlemleri">
      {!isMobile && (
        <CommandItem
          onSelect={() => {
            setCommandOpen(false);
            requestSearchFocus();
          }}
        >
          <Search />
          <span>Dosya Ara</span>
        </CommandItem>
      )}

      <CommandItem
        onSelect={() => {
          setCommandOpen(false);
          setUploadOpen(true);
        }}
      >
        <Upload />
        <span>Yeni Dosya Yükle</span>
      </CommandItem>
      {/* <CommandItem>
        <Trash2 />
        <span>Son Silinenler</span>
      </CommandItem> */}
    </CommandGroup>
  );
}

export default CommandFileSection;
