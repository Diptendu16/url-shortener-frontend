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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#03045E] shadow-sm px-6 py-6.5 transition-colors">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-[#0077B6] dark:text-[#48CAE4]"
        >
          <span className="hidden sm:inline">Shortify</span>
          <span className="sm:hidden">U</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-6">
          <button
            onClick={toggleDarkMode}
            className="text-[#023E8A] dark:text-[#ADE8F4] border border-[#90E0EF] dark:border-[#0077B6] rounded px-2 py-1"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            <>
              <span className="text-sm text-[#023E8A] dark:text-[#ADE8F4]">
                Hi, {user.name}
              </span>
              <Link
                to="/dashboard"
                className="text-sm text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4]"
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
                className="text-sm text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden text-[#023E8A] dark:text-[#ADE8F4]"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 pb-2">
          <button
            onClick={toggleDarkMode}
            className="text-left text-sm text-[#023E8A] dark:text-[#ADE8F4] border border-[#90E0EF] dark:border-[#0077B6] rounded px-3 py-2 flex items-center gap-2 w-fit"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <>
              <span className="text-sm text-[#023E8A] dark:text-[#ADE8F4]">
                Hi, {user.name}
              </span>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="text-sm text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4]"
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
                className="text-sm text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4]"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-sm text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4]"
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
