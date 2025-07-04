import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // ✅ important import

const Layout = ({ showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!showSidebar) {
    return <Outlet />; // ✅ fallback for routes without sidebar
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Topbar */}
        <div className="lg:hidden bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-2 p-2 hover:bg-gray-100 cursor-pointer border-none rounded-lg text-gray-700 border border-gray-300"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">AI Video Summarizer</h1>
            </div>
          </div>
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet /> {/* ✅ this renders your page components */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
