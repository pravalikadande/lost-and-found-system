import { useEffect, useState } from "react";
import API from "../services/api";

function MyLostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/lost/my-items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">My Lost Items</h2>

      <div className="row mt-4">
        {items.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow p-3">
              <h4>{item.title}</h4>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLostItems;