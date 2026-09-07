import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Student Dashboard</h2>
          <p className="mb-0">
            Welcome, {user?.name}
          </p>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5>Student Profile</h5>
              <p>
                Add or update your education, marks, skills,
                interests and career preference.
              </p>
              <Link
                to="/student-profile"
                className="btn btn-primary"
              >
                Manage Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5>AI Recommendation</h5>
              <p>
                Get AI-powered career and skill recommendations
                based on your profile.
              </p>
              <Link
                to="/recommendation"
                className="btn btn-success"
              >
                Get Recommendation
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5>Recommendation History</h5>
              <p>
                View your previous AI career recommendations
                and results.
              </p>
              <Link
                to="/history"
                className="btn btn-dark"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;