
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container py-4 py-md-5 mb-4">

      {/* Welcome Header */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
        <div className="card-body p-4 p-md-5 bg-primary text-white">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge bg-white text-primary mb-3 px-3 py-2">
                <i className="bi bi-mortarboard-fill me-2"></i>
                STUDENT PORTAL
              </span>

              <h2 className="fw-bold mb-2">
                Welcome back, {user?.name || "Student"}!
              </h2>

              <p className="mb-0 opacity-75">
                Take the next step towards your dream career.
                Explore AI-powered recommendations and improve your skills.
              </p>
            </div>

            
          </div>
        </div>
      </div>

      {/* Dashboard Heading */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Your Dashboard</h4>
        <p className="text-muted mb-0">
          Manage your profile and explore career opportunities.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">

        {/* Student Profile */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
            <div className="card-body p-4 d-flex flex-column">

              <div
                className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mb-4"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="bi bi-person-vcard fs-2"></i>
              </div>

              <h5 className="fw-bold mb-2">Student Profile</h5>

              <p className="text-muted mb-4">
                Add or update your education, marks, skills,
                interests and career preference.
              </p>

              <div className="mt-auto">
                <Link
                  to="/student-profile"
                  className="btn btn-primary w-100"
                >
                  Manage Profile
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
            <div className="card-body p-4 d-flex flex-column">

              <div
                className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mb-4"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="bi bi-robot fs-2"></i>
              </div>

              <h5 className="fw-bold mb-2">AI Career Recommendation</h5>

              <p className="text-muted mb-4">
                Get AI-powered career and skill recommendations
                based on your education, skills and interests.
              </p>

              <div className="mt-auto">
                <Link
                  to="/recommendation"
                  className="btn btn-success w-100"
                >
                  Get Recommendation
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Recommendation History */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
            <div className="card-body p-4 d-flex flex-column">

              <div
                className="rounded-3 bg-dark bg-opacity-10 text-dark d-flex align-items-center justify-content-center mb-4"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="bi bi-clock-history fs-2"></i>
              </div>

              <h5 className="fw-bold mb-2">Recommendation History</h5>

              <p className="text-muted mb-4">
                View your previous AI career recommendations
                and track your recommended career paths.
              </p>

              <div className="mt-auto">
                <Link
                  to="/history"
                  className="btn btn-dark w-100"
                >
                  View History
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Information */}
      <div className="card border-0 bg-light rounded-4 mt-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-start gap-3">
            <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
            <div>
              <h6 className="fw-bold mb-1">
                Your Career Journey Starts Here!
              </h6>
              <p className="text-muted small mb-0">
                Keep your student profile updated to get more
                relevant AI-powered career recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.10) !important;
        }
      `}</style>

    </div>
  );
};

export default Dashboard;
