import FileDetail from "@/components/home/file_detail";
import MainContainer from "@/components/home/main_container";
import { useAccessibility } from "@/context/accessibility-context";

function HomePage() {
  const { isSidebarOpen } = useAccessibility();
  return (
    <div className="flex flex-1 flex-row gap-4">
      {/* Klasörler burada listelenecek */}
      <MainContainer />

      {/* Klasör detayı */}
      {isSidebarOpen && <FileDetail />}
    </div>
  );
}

export default HomePage;
