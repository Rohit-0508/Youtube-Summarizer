import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const Layout = ({ showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!showSidebar) {
    return <Outlet />;
  }

  return (
    <div className="h-[100dvh] bg-[#0B0E14] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Topbar */}
        <div className="lg:hidden bg-[#131824] border-b border-[#2A314A] flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-2 p-2 hover:bg-[#1A2033] cursor-pointer border-none rounded-lg text-gray-300 border border-[#2A314A]"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-100">AI Video Summarizer</h1>
            </div>
          </div>
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-auto bg-[#0B0E14] hide-scrollbar">
          <Outlet /> {/* ✅ this renders your page components */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
