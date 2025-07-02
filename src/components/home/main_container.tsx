import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../ui/card";
import { FileTable } from "./file_table";
import { MainSideBarButton } from "./sidebar_buttons";
import FileOptions from "./file_options";

function MainContainer() {
  return (
    <Card className="flex h-full flex-3 flex-col gap-0 overflow-y-hidden">
      <CardHeader className="sticky top-0 z-10 border-b">
        <CardTitle>MDrive'a Hoşgeldin</CardTitle>
        <CardDescription>
          Aşağıda dosyalarını ayrıntılı görüntüleyip indirebilirsin.
        </CardDescription>

        {/* Dosya seçenekleri */}
        <FileOptions />

        <CardAction>
          <MainSideBarButton />
        </CardAction>
      </CardHeader>

      <CardContent
        className="flex-1 overflow-y-auto p-0 pl-6"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="w-full overflow-x-auto">
          <FileTable />
        </div>
      </CardContent>
    </Card>
  );
}

export default MainContainer;
