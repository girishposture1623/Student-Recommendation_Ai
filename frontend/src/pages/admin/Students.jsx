
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllStudents,
  deleteStudent,
} from "../../services/admin.service";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllStudents();
      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to load students");
        return;
      }

      setStudents(data.students || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load students"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student profile?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await deleteStudent(id);
      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to delete student");
        return;
      }

      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete student"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStudents = students.filter((student) => {
    const name = student.userId?.name || "";
    const email = student.userId?.email || "";
    const education = student.education || "";
    const field = student.preferredField || "";

    const searchText = search.toLowerCase();

    return (
      name.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText) ||
      education.toLowerCase().includes(searchText) ||
      field.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>
        <p className="text-muted mt-3">
          Loading student records...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">

        {/* Header */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

              <div>
                <span className="badge bg-primary mb-2">
                  ADMIN PANEL
                </span>

                <h2 className="fw-bold mb-1">
                  Student Management
                </h2>

                <p className="text-muted mb-0">
                  View, search and manage all student profiles.
                </p>
              </div>

              <Link
                to="/admin/dashboard"
                className="btn btn-outline-primary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Dashboard
              </Link>

            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="row g-3 mb-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">

                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="bi bi-people-fill fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">
                    {students.length}
                  </h3>
                  <small className="text-muted">
                    Total Students
                  </small>
                </div>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">

                <div
                  className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="bi bi-person-check-fill fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">
                    {students.filter((s) => s.userId).length}
                  </h3>
                  <small className="text-muted">
                    Linked User Accounts
                  </small>
                </div>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">

                <div
                  className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="bi bi-search fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-0">
                    {filteredStudents.length}
                  </h3>
                  <small className="text-muted">
                    Matching Records
                  </small>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {/* Student Table */}
        <div className="card border-0 shadow-sm">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

              <div>
                <h4 className="fw-bold mb-1">
                  All Students
                </h4>
                <p className="text-muted small mb-0">
                  Student academic and personal information
                </p>
              </div>

              <div className="input-group" style={{ maxWidth: 350 }}>
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search name, email, education..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

            </div>

            {filteredStudents.length === 0 ? (

              <div className="text-center py-5">
                <i className="bi bi-person-x fs-1 text-secondary"></i>

                <h5 className="fw-bold mt-3">
                  {students.length === 0
                    ? "No Student Profiles Found"
                    : "No Matching Students"}
                </h5>

                <p className="text-muted mb-0">
                  {students.length === 0
                    ? "Student profiles will appear here after registration."
                    : "Try searching with a different name or keyword."}
                </p>
              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-primary">
                    <tr>
                      <th className="py-3">#</th>
                      <th className="py-3">Student Details</th>
                      <th className="py-3">Education</th>
                      <th className="py-3">Marks</th>
                      <th className="py-3">Skills</th>
                      <th className="py-3">Interests</th>
                      <th className="py-3">Preferred Field</th>
                      <th className="py-3">Experience</th>
                      <th className="py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredStudents.map((student, index) => (

                      <tr key={student._id}>

                        {/* Serial Number */}
                        <td className="fw-semibold text-muted">
                          {index + 1}
                        </td>

                        {/* Student Details */}
                        <td style={{ minWidth: 220 }}>
                          <div className="d-flex align-items-center gap-2">

                            <div
                              className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                              style={{
                                width: 42,
                                height: 42,
                              }}
                            >
                              {(student.userId?.name || "S")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <div className="fw-bold">
                                {student.userId?.name || "Name unavailable"}
                              </div>

                              <small className="text-muted">
                                {student.userId?.email || "Email unavailable"}
                              </small>
                            </div>

                          </div>
                        </td>

                        {/* Education */}
                        <td style={{ minWidth: 130 }}>
                          {student.education || "-"}
                        </td>

                        {/* Marks */}
                        <td>
                          {student.marks != null ? (
                            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                              {student.marks}%
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>

                        {/* Skills */}
                        <td style={{ minWidth: 180 }}>
                          {student.skills?.length ? (
                            <div className="d-flex flex-wrap gap-1">
                              {student.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="badge bg-primary bg-opacity-10 text-primary"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>

                        {/* Interests */}
                        <td style={{ minWidth: 160 }}>
                          {student.interests?.length ? (
                            <div className="d-flex flex-wrap gap-1">
                              {student.interests.map((interest, i) => (
                                <span
                                  key={i}
                                  className="badge bg-info bg-opacity-10 text-info"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>

                        {/* Preferred Field */}
                        <td style={{ minWidth: 130 }}>
                          {student.preferredField || "-"}
                        </td>

                        {/* Experience */}
                        <td style={{ minWidth: 110 }}>
                          {student.experience || "-"}
                        </td>

                        {/* Delete */}
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            disabled={deletingId === student._id}
                            onClick={() => handleDelete(student._id)}
                          >
                            {deletingId === student._id ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <>
                                <i className="bi bi-trash me-1"></i>
                                Delete
                              </>
                            )}
                          </button>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <small className="text-muted">
            AI-Powered Student Career Recommendation System
            <br />
            Admin Panel | Student Management
          </small>
        </div>

      </div>
    </div>
  );
};

export default Students;
