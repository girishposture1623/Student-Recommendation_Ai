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

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const data = await getAllRecommendations();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setRecommendations(data.recommendations || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
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

    if (!confirmDelete) {
      return;
    }

    try {
      const data = await deleteRecommendation(id);

      if (!data.success) {
        setError(data.message);
        return;
      }

      setRecommendations((prev) =>
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
        <p>Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>AI Recommendations</h2>

        <Link
          to="/admin/dashboard"
          className="btn btn-outline-secondary"
        >
          Back to Dashboard
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="alert alert-info">
          No recommendations found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Career</th>
                <th>Match Score</th>
                <th>Recommended Skills</th>
                <th>Explanation</th>
                <th>Learning Path</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recommendations.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.career}</strong>
                  </td>

                  <td>{item.matchScore}%</td>

                  <td>
                    {item.recommendedSkills?.join(", ") || "-"}
                  </td>

                  <td>{item.explanation}</td>

                  <td>
                    {item.learningPath?.length ? (
                      <ol className="mb-0">
                        {item.learningPath.map(
                          (step, index) => (
                            <li key={index}>{step}</li>
                          )
                        )}
                      </ol>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recommendations;