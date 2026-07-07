import { useEffect, useState } from "react";
import API from "../services/api";

const IMAGE_BASE_URL = "https://lost-and-found-system-87fk.onrender.com";

function LostItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
const loggedInUserId = localStorage.getItem("userId");
  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      setLoading(true);

      const res = await API.get("/lost");
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

      await API.delete(`/lost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item Deleted Successfully");
      fetchLostItems();
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
        `/lost/${item._id}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item Updated Successfully");
      fetchLostItems();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };



  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Lost Items</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search Lost Items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : items.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ).length === 0 ? (
        <div className="text-center mt-5">
          <h4>No Lost Items Found 😔</h4>
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

                  {item.image && (
                    <img
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      alt={item.title}
                      className="card-img-top mb-3"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  )}

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
  <strong>Status:</strong>{" "}
  <span
    className={
      item.status === "Claimed"
        ? "text-success"
        : "text-danger"
    }
  >
    {item.status || "Lost"}
  </span>
</p>
{item.user && item.user._id === loggedInUserId && (
  <div className="d-flex gap-2">
    <button
      className="btn btn-warning w-50"
      onClick={() => editItem(item)}
    >
      Edit
    </button>

    <button
      className="btn btn-danger w-50"
      onClick={() => deleteItem(item._id)}
    >
      Delete
    </button>
  </div>
)}
</div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default LostItems;