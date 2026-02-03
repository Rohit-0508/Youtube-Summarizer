import React from "react";
import { User, History, Settings, LogOut, LogIn, X, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const publicMenuItems = [{ icon: Home, label: "Home", href: "/" }]

  const privateMenuItems = [
    { icon: History, label: "History", href: "/history" },
  ]

  const menuItems = isAuthenticated ? [...publicMenuItems, ...privateMenuItems] : publicMenuItems

  const handleNavClick = (href) => {
    if (location.pathname !== href) {
      navigate(href);
    }
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const handleLogout = () => {
    logout()
    toast('You have been logged out', {
      icon: '👋',
    });
    navigate('/');
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-[100dvh] w-64 bg-[#131824] border-r border-[#2A314A] transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A314A] lg:justify-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-100">AI Summarizer</h2>
          <button
            onClick={onToggle}
            className="lg:hidden cursor-pointer p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-[#1A2033]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isAuthenticated && user && (
          <div className="p-4 border-b border-[#2A314A] bg-[#0B0E14] flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#1A2033] rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-[#7C7CFF]" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-200">{user.name || user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full cursor-pointer flex items-center px-4 py-3 rounded-lg text-left transition-colors ${location.pathname === item.href
                      ? "bg-[rgba(124,124,255,0.12)] text-[#7C7CFF]"
                      : "text-gray-300 hover:bg-[#1A2033]"
                    }`}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 ${location.pathname === item.href
                        ? "text-[#7C7CFF]"
                        : "text-gray-400"
                      }`}
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t flex-shrink-0 border-[#2A314A]">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <Link to="/login" className="w-full max-w-[240px] mb-3">
                <button className="w-full cursor-pointer flex items-center justify-center bg-[#7C7CFF] text-white text-sm px-4 py-2 rounded-md hover:bg-[#6A6AF5] transition-colors">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              </Link>

              <Link to="/signup" className="w-full max-w-[240px]">
                <button className="w-full cursor-pointer flex items-center justify-center border border-[#2A314A] text-gray-300 text-sm px-4 py-2 rounded-md hover:bg-[#1A2033] transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
