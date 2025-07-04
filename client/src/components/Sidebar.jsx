import React from "react";
import { User, History, Settings, LogOut, LogIn, X, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom";


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
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 lg:justify-center flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">AI Summarizer</h2>
          <button onClick={onToggle} className="lg:hidden cursor-pointer p-1 rounded hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {isAuthenticated && user && (
          <div className="p-4 border-b bg-gray-50 flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
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
                    ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t flex-shrink-0 border-gray-300">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <Link to="/login" className="w-full max-w-[240px] mb-3">
                <button className="w-full cursor-pointer flex items-center justify-center bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              </Link>

              <Link to="/signup" className="w-full max-w-[240px]">
                <button className="w-full cursor-pointer flex items-center justify-center border border-gray-300 text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
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
