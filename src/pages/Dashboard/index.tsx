import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Overview } from "./components/Overview";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { Plus } from "lucide-react";

const pages: Record<string, { title: string; description: string }> = {
  "duyet-tin-dang": { title: "Duyệt Tin Đăng", description: "Quản lý và duyệt các tin đăng từ người dùng." },
  "quan-ly-host": { title: "Quản Lý Host", description: "Xem và quản lý danh sách chủ nhà đã đăng ký." },
  "tat-ca-tin-dang": { title: "Tất Cả Tin Đăng", description: "Xem toàn bộ tin đăng bất động sản trên hệ thống." },
  "tin-dang-cua-toi": { title: "Tin Đăng Của Tôi", description: "Quản lý tin đăng cá nhân của bạn." },
  "dang-tin-moi": { title: "Đăng Tin Mới", description: "Tạo tin đăng bất động sản mới." },
  "cai-dat": { title: "Cài Đặt", description: "Quản lý cài đặt tài khoản và hệ thống." },
};

export default function Dashboard() {
  const [activePage, setActivePage] = useState("tong-quan");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#eef2f8] overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col p-5">
          {activePage === "tong-quan" ? (
            <Overview />
          ) : (
            <PlaceholderPage
              title={pages[activePage]?.title || ""}
              description={pages[activePage]?.description}
            />
          )}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
