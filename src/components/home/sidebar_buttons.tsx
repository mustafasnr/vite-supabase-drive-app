import { Button } from "../ui/button";
import { Info, X } from "lucide-react";
import { useAccessibility } from "@/context/accessibility-context";

function MainSideBarButton() {
  const { toggleSidebar } = useAccessibility();
  return (
    <Button
      variant={"outline"}
      className="rounded-full"
      size={"icon"}
      onClick={() => toggleSidebar()}
    >
      <Info />
    </Button>
  );
}

function FileDetailSideBarButton() {
  const { toggleSidebar } = useAccessibility();
  return (
    <Button
      variant={"outline"}
      className="rounded-full"
      size={"icon"}
      onClick={() => toggleSidebar()}
    >
      <X />
    </Button>
  );
}
export { MainSideBarButton, FileDetailSideBarButton };
