
const About = () => {
  return (
    <div>
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-5 fw-bold mb-3">
                About Our System
              </h1>

              <p className="lead mb-0">
                AI-Powered Student Career Recommendation System
                helps students discover suitable career paths
                by analyzing their education, skills, interests,
                and preferred career fields using three AI providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">
                What Is Our System?
              </h2>

              <p className="text-muted">
                Choosing the right career can be difficult for
                students because of the wide range of career
                opportunities and skill requirements.
              </p>

              <p className="text-muted">
                Our system uses Artificial Intelligence to analyze
                student information and generate personalized
                career recommendations.
              </p>

              <p className="text-muted">
                It integrates Google Gemini, Groq, and OpenRouter
                to analyze student profiles and generate AI-based
                career suggestions. The system compares successful
                AI responses to prepare a consolidated recommendation.
              </p>

              <p className="text-muted mb-0">
                Students receive a recommended career path,
                relevant skills, and a structured learning roadmap
                to help them plan their future careers.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    What We Analyze
                  </h4>

                  <div className="mb-3">
                    <h6 className="fw-bold mb-1">Education</h6>
                    <p className="text-muted mb-0">
                      Academic background and qualifications.
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold mb-1">Skills</h6>
                    <p className="text-muted mb-0">
                      Existing technical and professional skills.
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold mb-1">Interests</h6>
                    <p className="text-muted mb-0">
                      Subjects, activities, and areas of interest.
                    </p>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">
                      Preferred Career
                    </h6>
                    <p className="text-muted mb-0">
                      The student's preferred field and career goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              AI Analysis Using Three Providers
            </h2>

            <p className="text-muted">
              Multiple AI services help analyze student profiles
              and prepare a consolidated career recommendation.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h5 className="fw-bold mb-3">
                    Google Gemini
                  </h5>
                  <p className="text-muted mb-0">
                    Analyzes the student profile and generates
                    career-related recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h5 className="fw-bold mb-3">Groq</h5>
                  <p className="text-muted mb-0">
                    Provides an additional AI-generated analysis
                    of suitable career paths and skills.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h5 className="fw-bold mb-3">OpenRouter</h5>
                  <p className="text-muted mb-0">
                    Supplies another AI response for comparison
                    and consolidated recommendation generation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              The backend compares successful AI responses and
              generates the final recommendation using the
              project's scoring logic.
            </p>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why This System?</h2>
            <p className="text-muted">
              Making career exploration easier, smarter,
              and more personalized.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold mb-3">
                    Personalized
                  </h4>
                  <p className="text-muted mb-0">
                    Recommendations are based on individual
                    student information and preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold mb-3">
                    Multi-AI Analysis
                  </h4>
                  <p className="text-muted mb-0">
                    Gemini, Groq, and OpenRouter responses
                    are compared to support the final
                    career recommendation.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold mb-3">
                    Career Roadmap
                  </h4>
                  <p className="text-muted mb-0">
                    Students receive recommended skills and
                    learning steps for their suggested career.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
