import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
localStorage.setItem("userId", res.data.user._id);
      
      alert(res.data.message);

navigate("/dashboard");
      setFormData({
        email: "",
        password: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;