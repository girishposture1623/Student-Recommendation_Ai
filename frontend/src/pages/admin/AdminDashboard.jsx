import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAdminDashboard } from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalRecommendations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setDashboard({
        totalUsers: data.totalUsers || 0,
        totalStudents: data.totalStudents || 0,
        totalRecommendations:
          data.totalRecommendations || 0,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Admin Dashboard</h2>
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

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Users</h5>
              <h2>{dashboard.totalUsers}</h2>
              <Link
                to="/admin/users"
                className="btn btn-primary"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Students</h5>
              <h2>{dashboard.totalStudents}</h2>
              <Link
                to="/admin/students"
                className="btn btn-success"
              >
                Manage Students
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Recommendations</h5>
              <h2>{dashboard.totalRecommendations}</h2>
              <Link
                to="/admin/recommendations"
                className="btn btn-dark"
              >
                View Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <h4>Admin Panel</h4>
          <p className="text-muted">
            Manage users, student profiles and AI
            recommendations from the admin panel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;