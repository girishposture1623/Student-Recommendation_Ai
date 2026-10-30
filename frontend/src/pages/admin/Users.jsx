
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllUsers,
  deleteUser,
} from "../../services/admin.service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setError("");

      const response = await getAllUsers();
      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to load users");
        return;
      }

      setUsers(data.users || []);
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await deleteUser(id);
      const data = response?.data ?? response;

      if (!data.success) {
        setError(data.message || "Unable to delete user");
        return;
      }

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to delete user"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return users;

    return users.filter((user) =>
      [
        user.name,
        user.email,
        user.role,
        user.provider,
      ]
        .filter(Boolean)
        .some((item) =>
          String(item).toLowerCase().includes(value)
        )
    );
  }, [users, search]);

  const adminCount = users.filter(
    (user) => user.role?.toLowerCase() === "admin"
  ).length;

  const studentCount = users.filter(
    (user) => user.role?.toLowerCase() === "student"
  ).length;

  const googleCount = users.filter(
    (user) => user.provider?.toLowerCase() === "google"
  ).length;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5 mb-4">

      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold small mb-1">
            ADMIN PANEL
          </p>
          <h2 className="fw-bold mb-1">User Management</h2>
          <p className="text-muted mb-0">
            View and manage all registered users.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="btn btn-outline-secondary px-3"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {/* Statistics */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-2">Total Users</p>
                  <h3 className="fw-bold mb-0">{users.length}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                  <i className="bi bi-people fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-2">Students</p>
                  <h3 className="fw-bold mb-0">{studentCount}</h3>
                </div>
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                  <i className="bi bi-mortarboard fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-2">Admins</p>
                  <h3 className="fw-bold mb-0">{adminCount}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3">
                  <i className="bi bi-shield-check fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-2">Google Users</p>
                  <h3 className="fw-bold mb-0">{googleCount}</h3>
                </div>
                <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                  <i className="bi bi-google fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Users Table Card */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-3 p-md-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h5 className="fw-bold mb-1">All Users</h5>
              <p className="text-muted small mb-0">
                {filteredUsers.length} users found
              </p>
            </div>

            <div className="input-group" style={{ maxWidth: "350px" }}>
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search name, email, role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-people text-muted display-4"></i>
              <h6 className="fw-semibold mt-3">
                {search ? "No matching users found" : "No users found"}
              </h6>
              <p className="text-muted small mb-0">
                {search
                  ? "Try searching with a different keyword."
                  : "Registered users will appear here."}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">
                  <tr>
                    <th className="py-3">User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Provider</th>
                    <th>Last Login</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>

                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: "40px",
                              height: "40px",
                              minWidth: "40px",
                            }}
                          >
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <span className="fw-semibold">
                            {user.name || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="text-muted">
                        {user.email || "N/A"}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            user.role?.toLowerCase() === "admin"
                              ? "bg-warning text-dark"
                              : "bg-success bg-opacity-10 text-success"
                          }`}
                        >
                          {user.role || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {user.provider || "Local"}
                        </span>
                      </td>

                      <td className="text-muted small">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "Never"}
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingId === user._id}
                        >
                          {deletingId === user._id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1"></span>
                              Deleting
                            </>
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
      <div className="text-center mt-4">
        <p className="text-muted small mb-0">
          <i className="bi bi-shield-lock me-1"></i>
          User management is restricted to administrators.
        </p>
      </div>

    </div>
  );
};

export default Users;
