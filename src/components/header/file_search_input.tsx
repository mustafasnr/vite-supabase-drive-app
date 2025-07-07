import { useFilesContext } from "@/context/files-context";
import { Input } from "../ui/input";
import { useAccessibility } from "@/context/accessibility-context";

function FileSearchInput() {
  const { searchRef } = useAccessibility();
  const { setSearchQuery } = useFilesContext();
  return (
    <div className="hidden w-full max-w-xs min-w-32 sm:block">
      <Input
        ref={searchRef}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        name="file_search_input"
        placeholder="Dosya ara..."
        className="rounded-full px-4 py-2"
      />
    </div>
  );
}

export default FileSearchInput;
