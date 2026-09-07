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

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setStudents(data.students || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load students"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const data = await deleteStudent(id);

      if (!data.success) {
        setError(data.message);
        return;
      }

      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete student"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students</h2>

        <Link
          to="/admin/dashboard"
          className="btn btn-outline-secondary"
        >
          Back to Dashboard
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {students.length === 0 ? (
        <div className="alert alert-info">
          No student profiles found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Education</th>
                <th>Marks</th>
                <th>Skills</th>
                <th>Interests</th>
                <th>Preferred Field</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.education}</td>

                  <td>{student.marks}%</td>

                  <td>
                    {student.skills?.join(", ") || "-"}
                  </td>

                  <td>
                    {student.interests?.join(", ") || "-"}
                  </td>

                  <td>{student.preferredField}</td>

                  <td>
                    {student.experience || "-"}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(student._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;