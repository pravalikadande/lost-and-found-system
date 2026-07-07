import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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
      const res = await API.post("/auth/register", formData);

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center mb-4">
        Register
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          className="form-control mb-3"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;