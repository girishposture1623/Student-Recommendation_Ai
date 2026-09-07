import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <section className="bg-primary text-white py-5">
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bold mb-3">
            Contact Us
          </h1>

          <p className="lead mb-0">
            Have a question or feedback? Get in touch with us.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            <div className="col-lg-5">
              <h2 className="fw-bold mb-3">
                Get In Touch
              </h2>

              <p className="text-muted mb-4">
                If you have questions about the AI-powered student
                recommendation system, feel free to contact us.
              </p>

              <div className="mb-4">
                <h6 className="fw-bold">
                  AI Career Guidance
                </h6>

                <p className="text-muted mb-0">
                  Get personalized career recommendations based on
                  your profile.
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">
                  Student Support
                </h6>

                <p className="text-muted mb-0">
                  We aim to make career exploration simple and
                  accessible for students.
                </p>
              </div>

              <div>
                <h6 className="fw-bold">
                  Feedback
                </h6>

                <p className="text-muted mb-0">
                  Your feedback can help us improve the system and
                  provide a better experience.
                </p>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    Send Us a Message
                  </h4>

                  {submitted && (
                    <div className="alert alert-success">
                      Thank you! Your message has been submitted
                      successfully.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">
                        Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Message
                      </label>

                      <textarea
                        name="message"
                        className="form-control"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;