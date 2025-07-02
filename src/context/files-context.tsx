import { RenameDialog } from "@/components/accessibility/rename_dialog";
import { useAllFiles } from "@/hooks/get_files_query";
import { FileObject } from "@supabase/storage-js";
import { createContext, useContext, useState } from "react";
type FilesContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  renameOpen: boolean;
  setRenameOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileObject | null>>;
  files: FileObject[] | undefined;
  selectedFile: FileObject | null;
};

export const FilesContext = createContext<FilesContextType | null>(null);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [renameOpen, setRenameOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null);
  const { data: files } = useAllFiles();

  return (
    <FilesContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        files,
        selectedFile,
        setSelectedFile,
        renameOpen,
        setRenameOpen,
      }}
    >
      <RenameDialog open={renameOpen} setOpen={setRenameOpen} />
      {children}
    </FilesContext.Provider>
  );
}

export function useFilesContext() {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("FilesContext must be used in FilesProvider");
  }
  return context;
}
