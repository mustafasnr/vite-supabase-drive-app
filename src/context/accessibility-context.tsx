import { CmmndDialog } from "@/components/accessibility/command_dialog";
import { SettingsDialog } from "@/components/accessibility/settings_dialog";
import { UploadDialog } from "@/components/accessibility/upload_dialog";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

const AccessibilityContext = createContext<any>(null);

export default function AccessibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen((prev) => (prev = !prev));
  }
  const requestSearchFocus = () => {
    requestAnimationFrame(() => {
      searchRef.current?.focus();
    });
  };
  return (
    <AccessibilityContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,

        searchRef,
        requestSearchFocus,

        commandOpen,
        setCommandOpen,

        uploadOpen,
        setUploadOpen,

        settingsOpen,
        setSettingsOpen,
      }}
    >
      <CmmndDialog open={commandOpen} setOpen={setCommandOpen} />
      <UploadDialog open={uploadOpen} setOpen={setUploadOpen} />
      <SettingsDialog open={settingsOpen} setOpen={setSettingsOpen} />

      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "AccessibilityContext must be used in AccessibilityProvider",
    );
  }
  return context;
}
