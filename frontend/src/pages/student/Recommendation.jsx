
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { generateRecommendation } from "../../services/recommendation.service";
import { getMyStudentProfile } from "../../services/student.service";

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await getMyStudentProfile();
        const data = response?.data ?? response;

        if (data.success && data.student) {
          setProfileExists(true);
        } else {
          setProfileExists(false);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setProfileExists(false);
        } else {
          setError(
            error.response?.data?.message ||
              "Unable to check student profile"
          );
        }
      } finally {
        setCheckingProfile(false);
      }
    };

    checkProfile();
  }, []);

  const handleGenerate = async () => {
    setError("");
    setRecommendation(null);
    setLoading(true);

    try {
      const response = await generateRecommendation();
      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to generate recommendation");
        return;
      }

      setRecommendation(data.recommendation);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to generate recommendation"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 py-md-5 mb-4">

      {/* Header */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="card-body bg-primary text-white p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge bg-white text-primary px-3 py-2 mb-3">
                <i className="bi bi-stars me-2"></i>
                AI POWERED
              </span>

              <h2 className="fw-bold mb-2">
                AI Career Recommendation
              </h2>

              <p className="mb-0 opacity-75">
                Discover career opportunities that match your
                education, skills and interests with AI-powered analysis.
              </p>
            </div>

            <div className="col-md-4 text-md-end mt-4 mt-md-0">
              <i className="bi bi-robot" style={{ fontSize: "75px" }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Page Heading */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Your Career Insights</h4>
        <p className="text-muted mb-0">
          Generate and explore your personalized career recommendation.
        </p>
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

      {/* Profile Checking */}
      {checkingProfile ? (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3 mb-0">
              Checking your student profile...
            </p>
          </div>
        </div>
      ) : !profileExists ? (

        /* Profile Required */
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center p-4 p-md-5">
            <div
              className="rounded-circle bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: "75px", height: "75px" }}
            >
              <i className="bi bi-person-exclamation fs-1"></i>
            </div>

            <h4 className="fw-bold mb-2">
              Student Profile Required
            </h4>

            <p className="text-muted mx-auto mb-4" style={{ maxWidth: "500px" }}>
              Please create your student profile first. Your education,
              skills and interests help generate personalized career recommendations.
            </p>

            <Link
              to="/student-profile"
              className="btn btn-primary px-4"
            >
              <i className="bi bi-person-plus me-2"></i>
              Create Student Profile
            </Link>
          </div>
        </div>

      ) : (
        <>
          {/* Generate Section */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                      style={{ width: "55px", height: "55px", minWidth: "55px" }}
                    >
                      <i className="bi bi-stars fs-3"></i>
                    </div>

                    <div>
                      <h5 className="fw-bold mb-1">
                        Ready to discover your career?
                      </h5>
                      <p className="text-muted small mb-0">
                        Let AI analyze your profile and suggest a suitable career path.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <button
                    className="btn btn-primary btn-lg px-4"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-magic me-2"></i>
                        Generate Recommendation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="fw-bold">Analyzing Your Profile</h5>
                <p className="text-muted mb-0">
                  Generating your personalized career recommendation...
                </p>
              </div>
            </div>
          )}

          {/* Recommendation Result */}
          {recommendation && !loading && (
            <div className="recommendation-result">

              {/* Career Highlight */}
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="card-body bg-success bg-opacity-10 p-4 p-md-5">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-trophy-fill text-warning fs-4"></i>
                    <span className="text-success fw-semibold">
                      YOUR RECOMMENDED CAREER
                    </span>
                  </div>

                  <h2 className="fw-bold text-dark mb-2">
                    {recommendation.career}
                  </h2>

                  <p className="text-muted mb-0">
                    Based on your student profile and skills.
                  </p>
                </div>
              </div>

              {/* Match Score */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-bullseye text-primary fs-4"></i>
                      <h5 className="fw-bold mb-0">Career Match Score</h5>
                    </div>

                    <h4 className="fw-bold text-primary mb-0">
                      {recommendation.matchScore}%
                    </h4>
                  </div>

                  <div
                    className="progress rounded-pill"
                    style={{ height: "14px" }}
                  >
                    <div
                      className="progress-bar bg-primary rounded-pill"
                      role="progressbar"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, Number(recommendation.matchScore) || 0)
                        )}%`,
                      }}
                      aria-valuenow={recommendation.matchScore}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p className="text-muted small mt-2 mb-0">
                    Indicates the match score returned by the recommendation system.
                  </p>
                </div>
              </div>

              {/* Recommended Skills */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-code-slash text-success fs-4"></i>
                    <h5 className="fw-bold mb-0">Recommended Skills</h5>
                  </div>

                  <p className="text-muted small">
                    Skills suggested for your recommended career.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    {recommendation.recommendedSkills?.length > 0 ? (
                      recommendation.recommendedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill"
                        >
                          <i className="bi bi-check-circle me-1"></i>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-muted mb-0">
                        No recommended skills available.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-lightbulb-fill text-warning fs-4"></i>
                    <h5 className="fw-bold mb-0">Why This Career?</h5>
                  </div>

                  <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                    {recommendation.explanation}
                  </p>
                </div>
              </div>

              {/* Learning Path */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <i className="bi bi-signpost-split-fill text-info fs-4"></i>
                    <h5 className="fw-bold mb-0">Your Learning Path</h5>
                  </div>

                  {recommendation.learningPath?.length > 0 ? (
                    <div className="learning-path">
                      {recommendation.learningPath.map((step, index) => (
                        <div
                          className="d-flex gap-3 mb-4"
                          key={index}
                        >
                          <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                            style={{ width: "38px", height: "38px" }}
                          >
                            {index + 1}
                          </div>

                          <div className="pt-1">
                            <h6 className="fw-semibold mb-1">
                              Step {index + 1}
                            </h6>
                            <p className="text-muted mb-0">
                              {step}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">
                      No learning path available.
                    </p>
                  )}
                </div>
              </div>

              {/* Generate Again */}
              <div className="text-center mb-4">
                <button
                  className="btn btn-outline-primary px-4"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Generate Again
                </button>
              </div>

            </div>
          )}
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

    </div>
  );
};

export default Recommendation;
