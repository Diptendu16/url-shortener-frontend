import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/useTheme";
import Button from "./Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between transition-colors">
      <Link
        to="/"
        className="text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        URL Shortener
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-200"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
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
    </nav>
  );
};

export default Navbar;
