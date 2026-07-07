import { useEffect, useState } from "react";
import API from "../services/api";

function FoundItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    try {
      setLoading(true);

      const res = await API.get("/found");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/found/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Found Item Deleted Successfully");
      fetchFoundItems();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

  const editItem = async (item) => {
    const title = window.prompt("Enter New Title", item.title);

    if (title === null || title.trim() === "") return;

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/found/${item._id}`,
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Found Item Updated Successfully");
      fetchFoundItems();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

  

const claimItem = async (id) => {
  const message = window.prompt(
    "Why do you want to claim this item?"
  );

  if (!message) return;

  try {
    const token = localStorage.getItem("token");

    const res = await API.post(
      "/claim",
      {
        foundItem: id,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Claim Failed"
    );
  }
};

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">Found Items</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search Found Items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-success"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : items.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ).length === 0 ? (
        <div className="text-center mt-5">
          <h4>No Found Items Found 😔</h4>
        </div>
      ) : (
        <div className="row">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card shadow p-3">
                  <h4>{item.title}</h4>

                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>

                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>

                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>

                  <p>
                    <strong>Date Found:</strong>{" "}
                    {new Date(item.dateFound).toLocaleDateString()}
                  </p>

                  <button
                    className="btn btn-warning me-2"
                    onClick={() => editItem(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                  
                </div>
                <button
  className="btn btn-primary w-100"
  onClick={() => claimItem(item._id)}
>
  Claim
</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default FoundItems;