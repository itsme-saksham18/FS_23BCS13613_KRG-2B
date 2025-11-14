import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Login and get token
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const token = await response.text();
    if (!response.ok) {
      alert(token);
      return;
    }

    // Step 2: Save token and email
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);

    // Step 3: Fetch user details (role)
    const meResponse = await fetch("http://localhost:8080/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!meResponse.ok) {
      console.error("Failed to fetch user role");
      navigate("/dashboard");
      return;
    }

    const userData = await meResponse.json();
    console.log("✅ Logged-in user:", userData);

    // Step 4: Save role in local storage
    if (userData.role) {
      localStorage.setItem("userRole", userData.role);
    }

    // Step 5: Wait briefly before navigating
    setTimeout(() => {
      navigate("/dashboard");
    }, 200); // Small delay ensures route context is ready
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again.");
  }
};


  return (
    <div className="login-page">
      <div className="login-container">
        <section className="login-hero">
          <div className="login-hero__text">
            <img src={logo} alt="Frelyn Logo" className="login-logo" />
            <h1>
              Welcome Back to <span className="highlight">Frelyn</span>
            </h1>
            <p>Login to find projects or manage your freelance tasks seamlessly.</p>
          </div>
        </section>

        <section className="login-form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p>
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </section>
      </div>
    </div>
  );
}
