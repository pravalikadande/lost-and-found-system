import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddFoundItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    dateFound: "",
    description: "",
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
      const token = localStorage.getItem("token");

      const res = await API.post("/found", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      console.log("Success");
      
      setFormData({
        title: "",
        category: "",
        location: "",
        dateFound: "",
        description: "",
      });

      navigate("/found-items");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add found item");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add Found Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-3"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          className="form-control mb-3"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          className="form-control mb-3"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateFound"
          className="form-control mb-3"
          value={formData.dateFound}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">
          Add Found Item
        </button>
      </form>
    </div>
  );
}

export default AddFoundItem;