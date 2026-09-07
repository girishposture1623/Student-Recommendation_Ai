const HowItWorks = () => {
  return (
    <div>
      <section className="bg-primary text-white py-5">
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bold mb-3">
            How It Works
          </h1>

          <p className="lead mb-0">
            Get personalized career recommendations in a few
            simple steps.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Simple Steps to Find Your Career Path
            </h2>

            <p className="text-muted">
              Our AI-powered system analyzes your profile and
              provides personalized recommendations.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="display-6 fw-bold text-primary mb-3">
                    01
                  </div>

                  <h5 className="fw-bold mb-3">
                    Create Account
                  </h5>

                  <p className="text-muted mb-0">
                    Register using your email or Google account to
                    access the system.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="display-6 fw-bold text-primary mb-3">
                    02
                  </div>

                  <h5 className="fw-bold mb-3">
                    Complete Profile
                  </h5>

                  <p className="text-muted mb-0">
                    Enter your education, marks, skills, interests,
                    preferred field, and experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="display-6 fw-bold text-primary mb-3">
                    03
                  </div>

                  <h5 className="fw-bold mb-3">
                    AI Analysis
                  </h5>

                  <p className="text-muted mb-0">
                    Our AI analyzes your profile to identify suitable
                    career opportunities and required skills.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="display-6 fw-bold text-primary mb-3">
                    04
                  </div>

                  <h5 className="fw-bold mb-3">
                    Get Recommendation
                  </h5>

                  <p className="text-muted mb-0">
                    Receive your recommended career, match score,
                    skills, explanation, and learning path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">
                From Student Profile to Career Recommendation
              </h2>

              <p className="text-muted mb-0">
                The system combines your personal academic
                information, skills, interests, and experience with
                AI-based analysis to generate career guidance that
                matches your profile.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;