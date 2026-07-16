import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        URL Shortener
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <Link
              to="/dashboard"
              className="text-sm text-gray-700 hover:text-blue-600"
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
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-gray-700 hover:text-blue-600"
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
