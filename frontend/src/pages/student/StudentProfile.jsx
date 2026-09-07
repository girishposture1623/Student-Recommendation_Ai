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
      const data = await getMyStudentProfile();

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
      const data = profileExists
        ? await updateStudentProfile(studentData)
        : await createStudentProfile(studentData);

      if (!data.success) {
        setError(data.message);
        return;
      }

      setProfileExists(true);
      setMessage(
        profileExists
          ? "Profile updated successfully"
          : "Profile created successfully"
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
      <div className="container mt-5">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4">Student Profile</h2>

              {message && (
                <div className="alert alert-success">
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Education
                  </label>

                  <input
                    type="text"
                    name="education"
                    className="form-control"
                    placeholder="Example: B.Sc Computer Science"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Marks
                  </label>

                  <input
                    type="number"
                    name="marks"
                    className="form-control"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.marks}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="Example: JavaScript, React, Node.js"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />

                  <small className="text-muted">
                    Separate skills with commas
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Interests
                  </label>

                  <input
                    type="text"
                    name="interests"
                    className="form-control"
                    placeholder="Example: Web Development, AI, Data Science"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                  />

                  <small className="text-muted">
                    Separate interests with commas
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Preferred Career Field
                  </label>

                  <input
                    type="text"
                    name="preferredField"
                    className="form-control"
                    placeholder="Example: Full Stack Development"
                    value={formData.preferredField}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Experience
                  </label>

                  <textarea
                    name="experience"
                    className="form-control"
                    rows="4"
                    placeholder="Describe your projects, internships or work experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : profileExists
                    ? "Update Profile"
                    : "Create Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;