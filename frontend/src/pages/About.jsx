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
                AI-Powered Student Recommendation System helps
                students discover suitable career paths based on
                their education, skills, interests, and experience.
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
                students because there are many career options and
                skill requirements available today.
              </p>

              <p className="text-muted">
                Our system uses Artificial Intelligence to analyze
                student information and provide personalized career
                recommendations.
              </p>

              <p className="text-muted mb-0">
                The system is designed to help students understand
                suitable career options, identify required skills,
                and follow a structured learning path.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    What We Analyze
                  </h4>

                  <div className="mb-3">
                    <h6 className="fw-bold mb-1">
                      Education
                    </h6>
                    <p className="text-muted mb-0">
                      Academic background and educational
                      qualifications.
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold mb-1">
                      Skills
                    </h6>
                    <p className="text-muted mb-0">
                      Existing technical and professional skills.
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold mb-1">
                      Interests
                    </h6>
                    <p className="text-muted mb-0">
                      Areas and subjects that interest the student.
                    </p>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">
                      Experience
                    </h6>
                    <p className="text-muted mb-0">
                      Previous experience and preferred career
                      fields.
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
              Why This System?
            </h2>

            <p className="text-muted">
              Making career exploration easier, smarter, and more
              personalized.
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
                    Recommendations are generated according to
                    individual student information and preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold mb-3">
                    AI Powered
                  </h4>

                  <p className="text-muted mb-0">
                    Artificial Intelligence helps analyze student
                    profiles and generate relevant career guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <h4 className="fw-bold mb-3">
                    Easy To Use
                  </h4>

                  <p className="text-muted mb-0">
                    Students can create their profile and receive
                    recommendations through a simple interface.
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