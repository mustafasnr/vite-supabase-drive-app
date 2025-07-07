import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FileDetailSideBarButton } from "./sidebar_buttons";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { useFilesContext } from "@/context/files-context";
import { sizeToReadable } from "@/lib/utils";

function FileDetail() {
  const { selectedFile } = useFilesContext();
  return (
    <Card className="hidden flex-1 md:flex">
      {selectedFile != null ? (
        <>
          <CardHeader>
            <CardTitle>{selectedFile.name}</CardTitle>
            <CardAction>
              <FileDetailSideBarButton />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <CardTitle>Dosya Ayrıntıları</CardTitle>
              <Separator />
            </div>

            <div className="flex flex-col items-start justify-start gap-2 text-base">
              <div>
                <CardTitle>Ad</CardTitle>
                <CardDescription>{selectedFile.name}</CardDescription>
              </div>
              <div>
                <CardTitle>Türü</CardTitle>
                <CardDescription>
                  {selectedFile.metadata.mimetype}
                </CardDescription>
              </div>

              <div>
                <CardTitle>Boyut</CardTitle>
                <CardDescription>
                  {sizeToReadable(selectedFile.metadata.size)}
                </CardDescription>
              </div>
              <div>
                <CardTitle>Oluşturma Zamanı</CardTitle>
                <CardDescription>{selectedFile.created_at}</CardDescription>
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardAction>
              <FileDetailSideBarButton />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1">
            <div className="text-muted-foreground flex h-full flex-1 flex-col items-center justify-center text-base">
              <Search className="size-32" />
              <p>Henüz dosya seçilmedi</p>
              <p>ayrıntıları görmek için bir dosya seçin</p>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default FileDetail;
