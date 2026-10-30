
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAdminDashboard } from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [dashboard, setDashboard] = useState({
    totalUsers: null,
    totalStudents: null,
    totalRecommendations: null,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await getAdminDashboard();
      const data = response?.data ?? response;

      if (!data?.success || !data?.dashboard) {
        throw new Error(
          data?.message || "Unable to load dashboard"
        );
      }

      setDashboard({
        totalUsers: data.dashboard.totalUsers,
        totalStudents: data.dashboard.totalStudents,
        totalRecommendations:
          data.dashboard.totalRecommendations,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load admin dashboard"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      count: dashboard.totalUsers,
      icon: "bi-people-fill",
      color: "primary",
      description: "Registered users",
      link: "/admin/users",
      button: "Manage Users",
    },
    {
      title: "Total Students",
      count: dashboard.totalStudents,
      icon: "bi-mortarboard-fill",
      color: "success",
      description: "Student profiles",
      link: "/admin/students",
      button: "Manage Students",
    },
    {
      title: "Total Recommendations",
      count: dashboard.totalRecommendations,
      icon: "bi-lightbulb-fill",
      color: "warning",
      description: "Generated AI recommendations",
      link: "/admin/recommendations",
      button: "View Recommendations",
    },
  ];

  const CountDisplay = ({ count }) => {
    if (count === null || count === undefined) {
      return (
        <p className="text-muted mb-0">
          Count unavailable
        </p>
      );
    }

    if (count === 0) {
      return (
        <p className="text-muted mb-0">
          No records yet
        </p>
      );
    }

    return (
      <h2 className="fw-bold mb-0">
        {count}
      </h2>
    );
  };

  if (loading) {
    return (
      <div className="container min-vh-100 py-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading Admin Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4">

      <div className="container">

        {/* Welcome Section */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">

            <div className="row align-items-center">

              <div className="col-md-8">

                <span className="badge bg-primary mb-2">
                  ADMIN PANEL
                </span>

                <h2 className="fw-bold mb-2">
                  Welcome, {user?.name || "Admin"}!
                </h2>

                <p className="text-muted mb-0">
                  Manage your AI-Powered Student Career
                  Recommendation System from one place.
                  Monitor users, students and AI-generated
                  career recommendations.
                </p>

              </div>

              <div className="col-md-4 text-md-end mt-3 mt-md-0">

                <button
                  className="btn btn-outline-primary me-2 mb-2"
                  onClick={() => loadDashboard(true)}
                  disabled={refreshing}
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  {refreshing ? "Refreshing..." : "Refresh"}
                </button>

                {/* <button
                  className="btn btn-outline-danger mb-2"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button> */}

              </div>

            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center">
            <span>{error}</span>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => loadDashboard()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Dashboard Overview */}
        <div className="mb-3">

          <h4 className="fw-bold mb-1">
            Dashboard Overview
          </h4>

          <p className="text-muted">
            Current system statistics
          </p>

        </div>

        {/* Statistics Cards */}
        <div className="row g-4 mb-4">

          {stats.map((item, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={index}
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <div>

                      <p className="text-muted mb-1">
                        {item.title}
                      </p>

                      <CountDisplay count={item.count} />

                    </div>

                    {/* Statistics Icon */}
                    <div
                      className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
                      style={{
                        width: "60px",
                        height: "60px",
                        fontSize: "25px",
                      }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </div>

                  </div>

                  <p className="text-muted small">
                    {item.description}
                  </p>

                  <Link
                    to={item.link}
                    className={`btn btn-outline-${item.color} w-100`}
                  >
                    {item.button}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>

                </div>
              </div>

            </div>
          ))}

        </div>

        {/* Quick Actions */}
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body p-4">

            <h4 className="fw-bold mb-1">
              Quick Actions
            </h4>

            <p className="text-muted mb-4">
              Quickly access important admin operations.
            </p>

            <div className="row g-3">

              <div className="col-md-4">
                <Link
                  to="/admin/users"
                  className="text-decoration-none text-dark"
                >
                  <div className="border rounded-3 p-3 h-100">

                    <i className="bi bi-people fs-1 text-primary"></i>

                    <h5 className="fw-bold mt-3">
                      User Management
                    </h5>

                    <p className="text-muted mb-0">
                      View and manage registered user accounts.
                    </p>

                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link
                  to="/admin/students"
                  className="text-decoration-none text-dark"
                >
                  <div className="border rounded-3 p-3 h-100">

                    <i className="bi bi-mortarboard fs-1 text-success"></i>

                    <h5 className="fw-bold mt-3">
                      Student Management
                    </h5>

                    <p className="text-muted mb-0">
                      View and manage student profiles.
                    </p>

                  </div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link
                  to="/admin/recommendations"
                  className="text-decoration-none text-dark"
                >
                  <div className="border rounded-3 p-3 h-100">

                    <i className="bi bi-lightbulb fs-1 text-warning"></i>

                    <h5 className="fw-bold mt-3">
                      AI Recommendations
                    </h5>

                    <p className="text-muted mb-0">
                      Review generated career recommendations.
                    </p>

                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="row g-4 mb-4">

          <div className="col-lg-7">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-3">
                  About the System
                </h4>

                <p className="text-muted">
                  The AI-Powered Student Career Recommendation
                  System helps students identify suitable career
                  opportunities based on their academic
                  background, skills and interests.
                </p>

                <p className="text-muted mb-0">
                  The system integrates multiple AI providers
                  to generate and consolidate career
                  recommendations for students.
                </p>

              </div>
            </div>

          </div>

          <div className="col-lg-5">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-3">
                  Admin Responsibilities
                </h4>

                <ul className="list-group list-group-flush">

                  <li className="list-group-item px-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Manage registered users
                  </li>

                  <li className="list-group-item px-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Monitor student profiles
                  </li>

                  <li className="list-group-item px-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Review AI recommendations
                  </li>

                  <li className="list-group-item px-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Maintain system records
                  </li>

                </ul>

              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="text-center py-3">

          <p className="text-muted small mb-1">
            AI-Powered Student Career Recommendation System
          </p>

          <p className="text-muted small mb-0">
            Admin Dashboard | Manage your system efficiently
          </p>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
