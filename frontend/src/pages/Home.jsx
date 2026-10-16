
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        {/* AI Providers Highlight Section */}
        <section className="bg-light py-5">
          <div className="container py-4">
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 mb-3">
                Multi-AI Career Intelligence
              </span>

              <h2 className="fw-bold mb-3">
                Powered by 3 AI Providers
              </h2>

              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "700px" }}
              >
                Our AI-Powered Student Career Recommendation System
                analyzes student profiles using Google Gemini, Groq,
                and OpenRouter to generate consolidated career
                recommendations, relevant skills, and personalized
                learning paths.
              </p>
            </div>

            <div className="row justify-content-center g-4">
              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">✦</div>
                    <h5 className="fw-bold">Google Gemini</h5>
                    <p className="text-muted mb-0">
                      Analyzes student information and generates
                      career-related suggestions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">⚡</div>
                    <h5 className="fw-bold">Groq</h5>
                    <p className="text-muted mb-0">
                      Provides an additional AI analysis of suitable
                      career paths and relevant skills.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 mb-3">◎</div>
                    <h5 className="fw-bold">OpenRouter</h5>
                    <p className="text-muted mb-0">
                      Provides another AI-generated response for
                      comparison and recommendation generation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Student Profile → AI Analysis → Career Recommendation
              </p>
            </div>
          </div>
        </section>

        {/* Main Hero Section */}
        <section className="py-5">
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <span className="badge bg-primary mb-3">
                  AI-Powered Career Guidance
                </span>

                <h1 className="display-4 fw-bold mb-3">
                  Discover the Right Career Path with AI
                </h1>

                <p className="lead text-muted mb-4">
                  Our AI-Powered Student Career Recommendation System
                  analyzes your education, marks, skills, interests,
                  and career preferences to help you discover suitable
                  career opportunities.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-lg"
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 mt-5 mt-lg-0">
                <div className="card border-0 shadow">
                  <div className="card-body p-4">
                    <h4 className="mb-4">
                      AI Career Analysis
                    </h4>

                    <div className="mb-4">
                      <h6>Education Analysis</h6>
                      <p className="text-muted mb-0">
                        Analyze your academic background and
                        performance.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6>Skill Matching</h6>
                      <p className="text-muted mb-0">
                        Identify skills relevant to your career
                        interests.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6>Career Recommendation</h6>
                      <p className="text-muted mb-0">
                        Get personalized career recommendations
                        using AI.
                      </p>
                    </div>

                    <div>
                      <h6>Learning Path</h6>
                      <p className="text-muted mb-0">
                        Follow a recommended learning path to
                        improve your skills.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">How It Works</h2>

              <p className="text-muted">
                Get personalized career guidance in four simple
                steps.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 fw-bold text-primary mb-3">
                      01
                    </div>

                    <h5>Create Profile</h5>

                    <p className="text-muted mb-0">
                      Enter your education, marks, skills,
                      interests, and experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 fw-bold text-primary mb-3">
                      02
                    </div>

                    <h5>AI Analysis</h5>

                    <p className="text-muted mb-0">
                      Three AI providers analyze the profile to
                      identify suitable career possibilities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 fw-bold text-primary mb-3">
                      03
                    </div>

                    <h5>Get Recommendation</h5>

                    <p className="text-muted mb-0">
                      Receive a career recommendation, match score,
                      and relevant skills.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="display-6 fw-bold text-primary mb-3">
                      04
                    </div>

                    <h5>Follow Learning Path</h5>

                    <p className="text-muted mb-0">
                      Follow the suggested learning path to develop
                      skills for your recommended career.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Use Our System */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">
                Why Use Our System?
              </h2>

              <p className="text-muted">
                Smarter career exploration through personalized
                AI-based analysis.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5>Personalized Recommendations</h5>

                    <p className="text-muted mb-0">
                      Recommendations are generated according to
                      each student's individual profile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5>Skill Development</h5>

                    <p className="text-muted mb-0">
                      Discover the skills that can help you move
                      toward your recommended career.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5>Multi-AI Analysis</h5>

                    <p className="text-muted mb-0">
                      Google Gemini, Groq, and OpenRouter provide
                      responses that the system analyzes to prepare
                      a consolidated recommendation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5>Recommendation History</h5>

                    <p className="text-muted mb-0">
                      Access previous AI-generated career
                      recommendations if history is enabled
                      in your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-primary text-white py-5">
          <div className="container text-center py-4">
            <h2 className="fw-bold mb-3">
              Ready to Discover Your Career Path?
            </h2>

            <p className="mb-4">
              Create your profile and get your personalized
              AI-powered career recommendation.
            </p>

            <Link
              to="/register"
              className="btn btn-light btn-lg"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
