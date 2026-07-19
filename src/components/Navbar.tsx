import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/useTheme";
import Button from "./Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-sm px-6 py-2.5 transition-colors">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          <span className="hidden sm:inline">URL Shortener</span>
          <span className="sm:hidden">U</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-8">
          <button
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Hi, {user.name}
              </span>
              <Link
                to="/dashboard"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
              <Button
                onClick={handleLogout}
                className="w-auto px-4 py-1.5 text-sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden text-gray-700 dark:text-gray-200"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 pb-2">
          <button
            onClick={toggleDarkMode}
            className="text-left text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 flex items-center gap-2 w-fit"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Hi, {user.name}
              </span>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
              <Button
                onClick={handleLogout}
                className="w-auto px-4 py-1.5 text-sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
