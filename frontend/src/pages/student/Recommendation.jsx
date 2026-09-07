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
        const data = await getMyStudentProfile();

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
      const data = await generateRecommendation();

      if (!data.success) {
        setError(data.message);
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
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-3">
                AI Career Recommendation
              </h2>

              <p className="text-muted">
                Generate an AI-powered career recommendation based
                on your student profile.
              </p>

              {checkingProfile ? (
                <div className="alert alert-info">
                  Checking your student profile...
                </div>
              ) : !profileExists ? (
                <div className="alert alert-warning">
                  <h5 className="alert-heading">
                    Student Profile Required
                  </h5>

                  <p className="mb-3">
                    Please create your student profile first to get
                    an AI career recommendation.
                  </p>

                  <Link
                    to="/student-profile"
                    className="btn btn-primary"
                  >
                    Create Student Profile
                  </Link>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  <button
                    className="btn btn-primary mb-4"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading
                      ? "Analyzing Profile..."
                      : "Generate Recommendation"}
                  </button>

                  {recommendation && (
                    <div>
                      <div className="card mb-3">
                        <div className="card-body">
                          <h4>Recommended Career</h4>

                          <h3>
                            {recommendation.career}
                          </h3>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <h4>Match Score</h4>

                          <div className="progress mb-2">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${recommendation.matchScore}%`,
                              }}
                            >
                              {recommendation.matchScore}%
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <h4>Recommended Skills</h4>

                          <ul>
                            {recommendation.recommendedSkills?.map(
                              (skill, index) => (
                                <li key={index}>
                                  {skill}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <h4>Why This Career?</h4>

                          <p>
                            {recommendation.explanation}
                          </p>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <h4>Learning Path</h4>

                          <ol>
                            {recommendation.learningPath?.map(
                              (step, index) => (
                                <li key={index}>
                                  {step}
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <Link
                to="/dashboard"
                className="btn btn-outline-secondary"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;