import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const darkMode = localStorage.getItem("theme") === "dark";

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put("/auth/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  const toggleTheme = () => {
  const newTheme = darkMode ? "light" : "dark";

  localStorage.setItem("theme", newTheme);

  document.body.classList.remove("light", "dark");
  document.body.classList.add(newTheme);

  // ❌ window.location.reload() remove cheyyandi
};


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <div
        className={`card shadow-lg p-4 text-center ${
          darkMode
            ? "bg-dark text-light border border-info"
            : "bg-white"
        }`}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          width="120"
          className="mx-auto rounded-circle mb-3"
        />

        <h3>{user.name}</h3>

        <p className="text-secondary">{user.email}</p>

        <hr />

        <label className="fw-bold text-start">
          Full Name
        </label>

        <input
          type="text"
          className="form-control mb-3"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />

        <label className="fw-bold text-start">
          Email Address
        </label>

        <input
          type="email"
          className="form-control mb-4"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={updateProfile}
        >
           Save Changes
        </button>

        <button
          className={`btn w-100 mb-3 ${
            darkMode
              ? "btn-warning"
              : "btn-dark"
          }`}
          onClick={toggleTheme}
        >
          {darkMode ? "☀️ Light " : "🌙 Dark "}
        </button>

        <button
          className="btn btn-danger w-100"
          onClick={logout}
        >
           Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;