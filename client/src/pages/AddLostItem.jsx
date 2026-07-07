import { useState } from "react";
import API from "../services/api";

function AddLostItem() {
const [formData, setFormData] = useState({
  title: "",
  category: "",
  location: "",
  date: "",
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

      const res = await API.post("/lost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      setFormData({
        title: "",
        category: "",
        location: "",
        date: "",
        description: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add Lost Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-3"
          placeholder="Item Name"
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
  name="date"
  className="form-control mb-3"
  value={formData.date}
  onChange={handleChange}
/>

        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Add Lost Item
        </button>
      </form>
    </div>
  );
}

export default AddLostItem;