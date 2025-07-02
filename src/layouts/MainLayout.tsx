import MainHeader from "@/components/header/header";
import ScreenLoader from "@/components/ui/screen_loader_animation";
import { useAllFiles } from "@/hooks/get_files_query";
import { useUser } from "@/hooks/get_user_query";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const { isLoading: userLoading } = useUser();
  const { isLoading: filesLoading } = useAllFiles();
  if (userLoading || filesLoading) {
    const status = userLoading
      ? "user_loading"
      : filesLoading
        ? "files_loading"
        : "waiting";

    return (
      <ScreenLoader
        status={status === "waiting" ? "user_loading" : status} // "waiting" yoksa user_loading olarak geçiyor
      />
    );
  }
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <MainHeader />

      <main className="flex-1 overflow-y-hidden p-4">
        <div className="flex h-full gap-4">
          {/* Sidebar */}
          {/* <aside className="w-52 truncate overflow-y-auto rounded-xl py-4">
           
            <p>:c</p>
          </aside> */}

          {/* Ana İçerik */}
          <section className="flex flex-1 overflow-hidden">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
