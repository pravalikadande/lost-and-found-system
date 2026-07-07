import { useEffect, useState } from "react";
import API from "../services/api";

function Claims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/claim", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClaims(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveClaim = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/claim/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Claim Approved");
      fetchClaims();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const rejectClaim = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/claim/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Claim Rejected");
      fetchClaims();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Claims</h2>

      <div className="row">
        {claims.map((claim) => (
          <div className="col-md-6 mb-4" key={claim._id}>
            <div className="card shadow p-3">

              <h4>{claim.foundItem?.title}</h4>

              <p>
                <strong>Claimed By:</strong>{" "}
                {claim.claimant?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {claim.claimant?.email}
              </p>

              <p>
                <strong>Reason:</strong>{" "}
                {claim.message}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    claim.status === "Approved"
                      ? "text-success"
                      : claim.status === "Rejected"
                      ? "text-danger"
                      : "text-warning"
                  }
                >
                  {claim.status}
                </span>
              </p>

              {claim.status === "Pending" && (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success w-50"
                    onClick={() => approveClaim(claim._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger w-50"
                    onClick={() => rejectClaim(claim._id)}
                  >
                    Reject
                  </button>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Claims;