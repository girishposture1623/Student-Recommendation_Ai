import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllUsers,
  deleteUser,
} from "../../services/admin.service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setUsers(data.users || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const data = await deleteUser(id);

      if (!data.success) {
        setError(data.message);
        return;
      }

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete user"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users</h2>

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

      {users.length === 0 ? (
        <div className="alert alert-info">
          No users found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Provider</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.provider}</td>
                  <td>
                    {user.lastLogin
                      ? new Date(
                          user.lastLogin
                        ).toLocaleString()
                      : "Never"}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(user._id)
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

export default Users;