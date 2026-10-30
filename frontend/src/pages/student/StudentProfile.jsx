
import { useEffect, useState } from "react";

import {
  createStudentProfile,
  getMyStudentProfile,
  updateStudentProfile,
} from "../../services/student.service";

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    education: "",
    marks: "",
    skills: "",
    interests: "",
    preferredField: "",
    experience: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getMyStudentProfile();
      const data = response?.data ?? response;

      if (data.success && data.student) {
        const student = data.student;

        setFormData({
          education: student.education || "",
          marks: student.marks ?? "",
          skills: student.skills?.join(", ") || "",
          interests: student.interests?.join(", ") || "",
          preferredField: student.preferredField || "",
          experience: student.experience || "",
        });

        setProfileExists(true);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        setError(
          error.response?.data?.message ||
            "Unable to load profile"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    const studentData = {
      education: formData.education.trim(),
      marks: Number(formData.marks),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      interests: formData.interests
        .split(",")
        .map((interest) => interest.trim())
        .filter(Boolean),
      preferredField: formData.preferredField.trim(),
      experience: formData.experience.trim(),
    };

    try {
      const response = profileExists
        ? await updateStudentProfile(studentData)
        : await createStudentProfile(studentData);

      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to save profile");
        return;
      }

      setProfileExists(true);

      setMessage(
        profileExists
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5 mb-4">

      {/* Header */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="card-body bg-primary text-white p-4 p-md-5">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-3 bg-white bg-opacity-25 d-flex align-items-center justify-content-center"
              style={{ width: "65px", height: "65px", minWidth: "65px" }}
            >
              <i className="bi bi-person-vcard fs-1"></i>
            </div>

            <div>
              <span className="small fw-semibold opacity-75">
                STUDENT PORTAL
              </span>
              <h2 className="fw-bold mb-1">Student Profile</h2>
              <p className="mb-0 opacity-75">
                Complete your profile to get personalized AI career recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Status */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            {profileExists ? "Update Your Profile" : "Create Your Profile"}
          </h4>
          <p className="text-muted small mb-0">
            Enter your academic details, skills and career interests.
          </p>
        </div>

        
      </div>

      {/* Alerts */}
      {message && (
        <div className="alert alert-success alert-dismissible fade show rounded-3">
          <i className="bi bi-check-circle-fill me-2"></i>
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      )}

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

      {/* Form */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-3 p-md-5">

          <form onSubmit={handleSubmit}>

            {/* Academic Information */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-mortarboard-fill text-primary fs-5"></i>
                <h5 className="fw-bold mb-0">Academic Information</h5>
              </div>

              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">
                    Education <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    name="education"
                    className="form-control form-control-lg"
                    placeholder="Example: B.Sc Computer Science"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Marks (%) <span className="text-danger">*</span>
                  </label>

                  <div className="input-group input-group-lg">
                    <input
                      type="number"
                      name="marks"
                      className="form-control"
                      placeholder="85.50"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.marks}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Skills and Interests */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-lightbulb-fill text-warning fs-5"></i>
                <h5 className="fw-bold mb-0">Skills & Interests</h5>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Skills <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  name="skills"
                  className="form-control form-control-lg"
                  placeholder="JavaScript, React, Node.js, Python"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />

                <div className="form-text">
                  <i className="bi bi-info-circle me-1"></i>
                  Enter multiple skills separated by commas.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Interests <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  name="interests"
                  className="form-control form-control-lg"
                  placeholder="Web Development, AI, Data Science"
                  value={formData.interests}
                  onChange={handleChange}
                  required
                />

                <div className="form-text">
                  <i className="bi bi-info-circle me-1"></i>
                  Enter multiple interests separated by commas.
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Career Preferences */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-bullseye text-success fs-5"></i>
                <h5 className="fw-bold mb-0">Career Preferences</h5>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Preferred Career Field{" "}
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  name="preferredField"
                  className="form-control form-control-lg"
                  placeholder="Example: Full Stack Development"
                  value={formData.preferredField}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            {/* Experience */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-briefcase-fill text-info fs-5"></i>
                <h5 className="fw-bold mb-0">Experience & Projects</h5>
              </div>

              <label className="form-label fw-semibold">
                Experience
              </label>

              <textarea
                name="experience"
                className="form-control"
                rows="5"
                placeholder="Describe your projects, internships, certifications or work experience..."
                value={formData.experience}
                onChange={handleChange}
              ></textarea>

              <div className="form-text">
                Mention your academic projects, practical experience or internships.
              </div>
            </div>

            {/* Submit */}
            <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg flex-grow-1"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving Profile...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {profileExists ? "Update Profile" : "Create Profile"}
                  </>
                )}
              </button>
            </div>

            <p className="text-muted text-center small mt-3 mb-0">
              <i className="bi bi-shield-check me-1"></i>
              Your profile information helps generate relevant career recommendations.
            </p>

          </form>
        </div>
      </div>

      <style>{`
        .form-control,
        .input-group-text {
          border-radius: 8px;
        }

        .form-control:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.12);
        }
      `}</style>

    </div>
  );
};

export default StudentProfile;
