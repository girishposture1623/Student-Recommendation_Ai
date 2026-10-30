
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getRecommendationHistory,
  deleteRecommendation,
} from "../../services/recommendation.service";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setError("");

      const response = await getRecommendationHistory();
      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to load history");
        return;
      }

      setHistory(data.recommendations || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load recommendation history"
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
        setError(data.message || "Unable to delete recommendation");
        return;
      }

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete recommendation"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">
          Loading recommendation history...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5 mb-4">

      {/* Header */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="card-body bg-primary text-white p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge bg-white text-primary px-3 py-2 mb-3">
                <i className="bi bi-clock-history me-2"></i>
                CAREER HISTORY
              </span>

              <h2 className="fw-bold mb-2">
                Recommendation History
              </h2>

              <p className="mb-0 opacity-75">
                Review your previous AI-generated career recommendations
                and track your career exploration journey.
              </p>
            </div>

            <div className="col-md-4 text-md-end mt-4 mt-md-0">
              <i
                className="bi bi-journal-check"
                style={{ fontSize: "75px" }}
              ></i>
            </div>
          </div>
        </div>
      </div>

      {/* Page Heading */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Your Previous Results</h4>
          <p className="text-muted small mb-0">
            All your saved career recommendations in one place.
          </p>
        </div>

        <Link
          to="/recommendation"
          className="btn btn-primary"
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Recommendation
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show rounded-3">
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center p-4 p-md-5">
            <div
              className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: "85px", height: "85px" }}
            >
              <i className="bi bi-journal-x fs-1"></i>
            </div>

            <h4 className="fw-bold mb-2">
              No Recommendations Found
            </h4>

            <p className="text-muted mx-auto mb-4" style={{ maxWidth: "450px" }}>
              You haven't generated any career recommendations yet.
              Start exploring careers that match your skills and interests.
            </p>

            <Link
              to="/recommendation"
              className="btn btn-primary px-4"
            >
              <i className="bi bi-stars me-2"></i>
              Generate Recommendation
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="bi bi-collection fs-3"></i>
                </div>

                <div>
                  <p className="text-muted small mb-1">
                    Total Recommendations
                  </p>
                  <h3 className="fw-bold mb-0">
                    {history.length}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* History Cards */}
          <div className="row g-4">
            {history.map((item) => (
              <div
                className="col-12 col-md-6"
                key={item._id}
              >
                <div className="card border-0 shadow-sm rounded-4 h-100 history-card">
                  <div className="card-body p-4 d-flex flex-column">

                    {/* Career Title */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "48px", height: "48px" }}
                        >
                          <i className="bi bi-briefcase-fill fs-4"></i>
                        </div>

                        <div>
                          <p className="text-muted small mb-1">
                            Recommended Career
                          </p>
                          <h5 className="fw-bold mb-0">
                            {item.career || "Career not available"}
                          </h5>
                        </div>
                      </div>

                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
                        AI Result
                      </span>
                    </div>

                    <hr />

                    {/* Match Score */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-semibold small">
                          <i className="bi bi-bullseye text-primary me-2"></i>
                          Match Score
                        </span>

                        <span className="fw-bold text-primary">
                          {item.matchScore}%
                        </span>
                      </div>

                      <div
                        className="progress rounded-pill"
                        style={{ height: "9px" }}
                      >
                        <div
                          className="progress-bar bg-primary rounded-pill"
                          role="progressbar"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, Number(item.matchScore) || 0)
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-light rounded-3 p-3 mb-3">
                      <h6 className="fw-semibold mb-2">
                        <i className="bi bi-lightbulb text-warning me-2"></i>
                        Why This Career?
                      </h6>

                      <p className="text-muted small mb-0 history-explanation">
                        {item.explanation || "No explanation available."}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="d-flex align-items-center text-muted small mb-3">
                      <i className="bi bi-calendar3 me-2"></i>
                      Generated on:{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </div>

                    {/* Delete */}
                    <div className="mt-auto pt-2">
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                      >
                        {deletingId === item._id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-trash me-2"></i>
                            Delete Recommendation
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Back Button */}
      <div className="mt-4">
        <Link
          to="/dashboard"
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </Link>
      </div>

      <style>{`
        .history-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .history-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.10) !important;
        }

        .history-explanation {
          line-height: 1.7;
        }
      `}</style>

    </div>
  );
};

export default History;
