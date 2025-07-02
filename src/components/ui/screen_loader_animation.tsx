import { LoadingStatus } from "@/types/file_type";
import UserSvg from "@/assets/user.animate.svg";
import FileSvg from "@/assets/files.animate.svg";
function ScreenLoader({ status }: { status: LoadingStatus["currentStatus"] }) {
  return (
    <div className="absolute inset-0 z-[1000] flex items-center justify-center">
      <div className="flex flex-col items-center justify-start">
        {status === "user_loading" && (
          <div className="size-32">
            <img
              src={UserSvg}
              alt="User Loading Animation"
              style={{ stroke: "var(--text-blue-500)" }}
              className="h-full w-full"
            />
          </div>
        )}
        {status === "files_loading" && (
          <div className="size-32">
            <img
              src={FileSvg}
              alt="Files Loading Animation"
              style={{ stroke: "var(--text-blue-500)" }}
              className="h-full w-full"
            />
          </div>
        )}
        <p className="text-muted-foreground">
          {status === "user_loading"
            ? "Kullanıcı bilgileri alınıyor"
            : status === "files_loading"
              ? "Dosyalar hazırlanıyor"
              : "Yükleniyor"}
        </p>
      </div>
    </div>
  );
}

export default ScreenLoader;
