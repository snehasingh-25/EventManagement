import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../components/Card.jsx"; // import your reusable card
import Typography from "@mui/material/Typography";

const SignIn = () => {
  const { signin, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signin(form);
    if (res.token) {
      navigate("/events");
    } else {
      alert(res.message || "Login failed");
    }
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
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </CardWrapper>
    </div>
  );
};

export default SignIn;
