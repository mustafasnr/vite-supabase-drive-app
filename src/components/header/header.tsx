import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { CommandTriggerButton } from "../accessibility/command_dialog";
import { UploadTriggerButton } from "../accessibility/upload_dialog";
import FileSearchInput from "./file_search_input";
import HeaderUser from "./header_user";

function MainHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 px-4">
      {/* Sol kısım */}
      <div className="w-52">
        <Link to={"/"} className="inline-flex items-center space-x-2">
          <User className="size-5" />
          <span className="text-lg font-bold">MDrive</span>
        </Link>
      </div>
      {/* Sağ kısım */}
      <div className="flex flex-1 items-center justify-between">
        {/* Search alanı */}
        <FileSearchInput />
        {/* Command + Avatar */}
        <div className="ml-4 flex items-center space-x-4">
          {/* Upload Button */}
          <UploadTriggerButton />

          {/* Command Button and CommandDialog */}
          <CommandTriggerButton />

          {/* Avatar Dropdown */}
          <HeaderUser />
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
