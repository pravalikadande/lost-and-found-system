import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  navigate("/login", { replace: true });
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Lost & Found
        </Link>

        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link" to="/">
            Home
          </Link>

          {!token ? (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="btn btn-outline-light ms-2"
              >
                👤 Profile
              </Link>

              <button
                className="btn btn-outline-light ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;