
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllRecommendations,
  deleteRecommendation,
} from "../../services/admin.service";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllRecommendations();
      const data = response?.data ?? response;

      if (!data.success) {
        setError(
          data.message || "Unable to load recommendations"
        );
        return;
      }

      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load recommendations"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recommendation?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await deleteRecommendation(id);
      const data = response?.data ?? response;

      if (!data.success) {
        setError(
          data.message || "Unable to delete recommendation"
        );
        return;
      }

      setRecommendations((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (expandedId === id) {
        setExpandedId(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete recommendation"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const toggleDetails = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredRecommendations = recommendations.filter(
    (item) => {
      const career = item.career || "";
      const name = item.userId?.name || "";
      const email = item.userId?.email || "";

      const searchText = search.toLowerCase();

      return (
        career.toLowerCase().includes(searchText) ||
        name.toLowerCase().includes(searchText) ||
        email.toLowerCase().includes(searchText)
      );
    }
  );

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">
          Loading AI recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">

        {/* Header */}
        <div className="card border-0 shadow-sm mb-4 rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <span className="badge bg-primary mb-2">
                  ADMIN PANEL
                </span>

                <h2 className="fw-bold mb-1">
                  AI Recommendations
                </h2>

                <p className="text-muted mb-0">
                  View, search and manage AI-generated student career recommendations.
                </p>
              </div>

              <Link
                to="/admin/dashboard"
                className="btn btn-outline-primary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        {/* Statistics */}
        <div className="row g-3 mb-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 55, height: 55 }}>
                  <i className="bi bi-lightbulb-fill fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">
                    {recommendations.length}
                  </h3>
                  <small className="text-muted">
                    Total Recommendations
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 55, height: 55 }}>
                  <i className="bi bi-person-check-fill fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">
                    {
                      new Set(
                        recommendations
                          .map((item) => item.userId?._id)
                          .filter(Boolean)
                          .map(String)
                      ).size
                    }
                  </h3>
                  <small className="text-muted">
                    Linked Students
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 55, height: 55 }}>
                  <i className="bi bi-search fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">
                    {filteredRecommendations.length}
                  </h3>
                  <small className="text-muted">
                    Matching Records
                  </small>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Recommendations Table */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-3 p-md-4">

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <h4 className="fw-bold mb-1">
                  All Recommendations
                </h4>
                <p className="text-muted small mb-0">
                  Click View Details to see the full explanation and learning path.
                </p>
              </div>

              <div className="input-group" style={{ maxWidth: 350 }}>
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search career, student, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {filteredRecommendations.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-lightbulb fs-1 text-secondary"></i>

                <h5 className="fw-bold mt-3">
                  {recommendations.length === 0
                    ? "No Recommendations Found"
                    : "No Matching Recommendations"}
                </h5>

                <p className="text-muted mb-0">
                  {recommendations.length === 0
                    ? "Generated AI recommendations will appear here."
                    : "Try searching with a different keyword."}
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">

                  <thead className="table-primary">
                    <tr>
                      <th className="py-3">#</th>
                      <th className="py-3">Student</th>
                      <th className="py-3">Career</th>
                      <th className="py-3">Match Score</th>
                      <th className="py-3">Skills</th>
                      <th className="py-3">Created At</th>
                      <th className="py-3 text-center">Details</th>
                      <th className="py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRecommendations.map((item, index) => (
                      <>
                        <tr key={item._id}>

                          {/* Serial Number */}
                          <td className="fw-semibold text-muted">
                            {index + 1}
                          </td>

                          {/* Student */}
                          <td style={{ minWidth: 190 }}>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                                style={{ width: 40, height: 40 }}
                              >
                                {(item.userId?.name || "S")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <div className="fw-bold">
                                  {item.userId?.name || "Name unavailable"}
                                </div>
                                <small className="text-muted">
                                  {item.userId?.email || "Email unavailable"}
                                </small>
                              </div>
                            </div>
                          </td>

                          {/* Career */}
                          <td style={{ minWidth: 150 }}>
                            <span className="fw-bold text-primary">
                              {item.career || "-"}
                            </span>
                          </td>

                          {/* Match Score */}
                          <td style={{ minWidth: 115 }}>
                            {item.matchScore != null ? (
                              <>
                                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                                  {item.matchScore}%
                                </span>

                                <div
                                  className="progress mt-2"
                                  style={{ height: 6 }}
                                >
                                  <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        Math.max(0, Number(item.matchScore) || 0)
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              </>
                            ) : "-"}
                          </td>

                          {/* Skills */}
                          <td style={{ minWidth: 160, maxWidth: 220 }}>
                            {item.recommendedSkills?.length ? (
                              <div className="d-flex flex-wrap gap-1">
                                {item.recommendedSkills.slice(0, 3).map(
                                  (skill, i) => (
                                    <span
                                      key={i}
                                      className="badge bg-primary bg-opacity-10 text-primary"
                                    >
                                      {skill}
                                    </span>
                                  )
                                )}

                                {item.recommendedSkills.length > 3 && (
                                  <span className="badge bg-secondary">
                                    +{item.recommendedSkills.length - 3} more
                                  </span>
                                )}
                              </div>
                            ) : "-"}
                          </td>

                          {/* Created At */}
                          <td style={{ minWidth: 140 }}>
                            <small className="text-muted">
                              {item.createdAt
                                ? new Date(item.createdAt).toLocaleDateString()
                                : "-"}
                            </small>
                          </td>

                          {/* View Details */}
                          <td className="text-center">
                            <button
                              className={`btn btn-sm ${
                                expandedId === item._id
                                  ? "btn-primary"
                                  : "btn-outline-primary"
                              }`}
                              onClick={() => toggleDetails(item._id)}
                            >
                              <i className={`bi ${
                                expandedId === item._id
                                  ? "bi-chevron-up"
                                  : "bi-eye"
                              } me-1`}></i>

                              {expandedId === item._id
                                ? "Hide Details"
                                : "View Details"}
                            </button>
                          </td>

                          {/* Delete */}
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              disabled={deletingId === item._id}
                              onClick={() => handleDelete(item._id)}
                            >
                              {deletingId === item._id ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <>
                                  <i className="bi bi-trash me-1"></i>
                                  Delete
                                </>
                              )}
                            </button>
                          </td>

                        </tr>

                        {/* Expandable Details Row */}
                        {expandedId === item._id && (
                          <tr key={`${item._id}-details`}>
                            <td colSpan="8" className="bg-light p-3 p-md-4">

                              <div className="row g-4">

                                {/* Explanation */}
                                <div className="col-12 col-lg-5">
                                  <div className="card border-0 shadow-sm h-100 rounded-3">
                                    <div className="card-body p-4">
                                      <h6 className="fw-bold mb-3">
                                        <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                                        Explanation
                                      </h6>

                                      <p
                                        className="text-muted mb-0"
                                        style={{ lineHeight: 1.8 }}
                                      >
                                        {item.explanation || "No explanation available."}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Learning Path */}
                                <div className="col-12 col-lg-7">
                                  <div className="card border-0 shadow-sm h-100 rounded-3">
                                    <div className="card-body p-4">
                                      <h6 className="fw-bold mb-3">
                                        <i className="bi bi-signpost-split-fill text-primary me-2"></i>
                                        Complete Learning Path
                                      </h6>

                                      {item.learningPath?.length ? (
                                        <ol className="ps-3 mb-0">
                                          {item.learningPath.map((step, i) => (
                                            <li
                                              key={i}
                                              className="mb-2"
                                              style={{ lineHeight: 1.7 }}
                                            >
                                              {step}
                                            </li>
                                          ))}
                                        </ol>
                                      ) : (
                                        <p className="text-muted mb-0">
                                          No learning path available.
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}

                      </>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <small className="text-muted">
            AI-Powered Student Career Recommendation System
            <br />
            Admin Panel | AI Recommendations Management
          </small>
        </div>

      </div>
    </div>
  );
};

export default Recommendations;
