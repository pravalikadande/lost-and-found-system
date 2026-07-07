 import { Link } from "react-router-dom";
 import { useEffect, useState } from "react";
 import API from "../services/api";
 function Dashboard() {
    const [lostCount, setLostCount] = useState(0);
const [foundCount, setFoundCount] = useState(0);

useEffect(() => {
  fetchCounts();
}, []);

const fetchCounts = async () => {
  try {
    const lost = await API.get("/lost");
    const found = await API.get("/found");

    setLostCount(lost.data.length);
    setFoundCount(found.data.length);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Dashboard</h1>
       <div className="row mt-4">
  <div className="col-md-6">
   <div className="card bg-danger text-white text-center shadow p-4">
  <h3>Total Lost Items</h3>
  <h1>{lostCount}</h1>
</div>
  </div>

  <div className="col-md-6">
   <div className="card bg-success text-white text-center shadow p-4">
  <h3>Total Found Items</h3>
      <h1>{foundCount}</h1>
    </div>
  </div>
</div>
      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h4>Lost Items</h4>
            <p>View and manage lost items.</p>
            <Link to="/lost-items" className="btn btn-danger">
  View Lost Items
</Link>
<Link to="/add-lost-item" className="btn btn-primary mt-2">
  Add Lost Item
</Link>
<Link
  to="/my-lost-items"
  className="btn btn-secondary mt-2"
>
  My Lost Items
</Link>
          </div>
        </div>

       <div className="col-md-4">
  <div className="card shadow p-3">
    <h4>Found Items</h4>
    <p>View and manage found items.</p>

    <Link to="/found-items" className="btn btn-success">
      View Found Items
    </Link>

    <Link to="/add-found-item" className="btn btn-primary mt-2">
      Add Found Item
    </Link>
    <Link
  to="/my-found-items"
  className="btn btn-secondary mt-2"
>
  My Found Items
</Link>

  </div>
</div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h4>Claims</h4>
            <p>Track claimed items.</p>
            <Link className="nav-link" to="/claims"  className="btn btn-success mt-2">
  Claims
</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;