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

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getRecommendationHistory();

      if (!data.success) {
        setError(data.message);
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

    if (!confirmDelete) {
      return;
    }

    try {
      const data = await deleteRecommendation(id);

      if (!data.success) {
        setError(data.message);
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
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Recommendation History</h2>

        <Link
          to="/recommendation"
          className="btn btn-primary"
        >
          New Recommendation
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <div className="card shadow">
          <div className="card-body text-center p-5">
            <h5>No Recommendations Found</h5>
            <p className="text-muted">
              Generate your first AI career recommendation.
            </p>

            <Link
              to="/recommendation"
              className="btn btn-primary"
            >
              Generate Recommendation
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {history.map((item) => (
            <div
              className="col-md-6"
              key={item._id}
            >
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>{item.career}</h5>

                  <p className="mb-2">
                    <strong>Match Score:</strong>{" "}
                    {item.matchScore}%
                  </p>

                  <p className="mb-2">
                    <strong>Explanation:</strong>{" "}
                    {item.explanation}
                  </p>

                  <p className="text-muted">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link
          to="/dashboard"
          className="btn btn-outline-secondary"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default History;