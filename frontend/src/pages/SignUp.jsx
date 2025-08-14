import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import CardWrapper from "../components/Card.jsx"; // import reusable card
import Typography from "@mui/material/Typography";

const SignUp = () => {
  const { signup, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    alert(res.message || "Signed up successfully");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <CardWrapper>
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
          Sign Up
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </CardWrapper>
    </div>
  );
};

export default SignUp;
