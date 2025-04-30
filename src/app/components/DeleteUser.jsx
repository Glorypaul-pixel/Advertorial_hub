"use client";

import { useState } from "react";

const DeleteUser = () => {
  const [identifier, setIdentifier] = useState(""); // email or ID
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!identifier) {
      setMessage("Please enter a valid email or user ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/auth/user/${identifier}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to delete user.");
      }

      setMessage("✅ User deleted successfully.");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>🗑️ Admin User Deletion</h2>
      <input
        type="text"
        placeholder="Enter email or user ID"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          padding: "10px",
          width: "100%",
          backgroundColor: "#d9534f",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Deleting..." : "Delete User"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DeleteUser;
