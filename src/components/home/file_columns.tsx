import { ColumnDef } from "@tanstack/react-table";
import { FileObject } from "@supabase/storage-js";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const columns: ColumnDef<FileObject>[] = [
  {
    accessorKey: "name",
    header: "Dosya Adı",
    cell: ({ row }) => (
      <div className="flex flex-1 items-center">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Oluşturma Zamanı",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <div className="px-4">{format(date, "dd.MM.yyyy HH:mm")}</div>;
    },
  },
  {
    id: "konum",
    header: "Konumu",
    cell: ({ row }) => {
      const path = row.original.metadata?.path || "-";
      return (
        <div className="text-muted-foreground max-w-[200px] truncate text-sm">
          {path}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="mr-2 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Ayrıntılar:", row.original)}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
// export interface FileObject {
//   name: string
//   bucket_id: string
//   owner: string
//   id: string
//   updated_at: string
//   created_at: string
//   last_accessed_at: string
//   metadata: Record<string, any>
//   buckets: Bucket
// }
