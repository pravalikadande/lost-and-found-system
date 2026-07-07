function Home() {
  return (
    <div className="container mt-5 text-center">

      <h1 className="display-3 fw-bold text-primary">
        Lost & Found System
      </h1>

      <p className="lead mt-3">
        Welcome to the Lost & Found Portal
      </p>

      <div className="row mt-5">

        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3>Lost Items</h3>

            <p>
              Report your lost belongings quickly and safely.
            </p>

            <button className="btn btn-danger">
              View Lost Items
            </button>

          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3>Found Items</h3>

            <p>
              Help others by reporting found belongings.
            </p>

            <button className="btn btn-success">
              View Found Items
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;