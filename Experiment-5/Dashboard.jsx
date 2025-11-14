import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import EmployerProjects from "./EmployerProjects";
import FreelancerProjects from "./FreelancerProjects";
import EmployerBids from "./EmployerBids";
import FreelancerBids from "./FreelancerBids";
import Profile from "./Profile";
import StatsCards from "../components/StatsCards";

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [activePage, setActivePage] = useState("projects");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("authToken");

    // If role is already saved, use it directly
    if (savedRole) {
      setRole(savedRole);
      setLoading(false);
      return;
    }

    // If no token, redirect to login
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Fetch user details from backend
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.error("❌ Failed to fetch user role:", response.status);
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        console.log("✅ Logged-in user:", data);

        if (data.role) {
          localStorage.setItem("userRole", data.role);
          setRole(data.role);
        } else {
          console.warn("⚠️ No role found in response");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("🚨 Error fetching user details:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const renderContent = () => {
    if (role === "employer") {
      if (activePage === "projects") return <EmployerProjects />;
      if (activePage === "bids") return <EmployerBids />;
      if (activePage === "profile") return <Profile />;
    } else if (role === "freelancer") {
      if (activePage === "projects") return <FreelancerProjects />;
      if (activePage === "bids") return <FreelancerBids />;
      if (activePage === "profile") return <Profile />;
    }

    return (
      <>
        <p>Welcome to your dashboard 🎉</p>
        <p>Here you will see projects, bids, and updates.</p>
      </>
    );
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading your dashboard...</p>;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard__sidebar">
        <h2 className="sidebar__logo">FBS</h2>
        <ul className="sidebar__nav">
          <li>
            <a
              href="#"
              className={activePage === "projects" ? "active" : ""}
              onClick={() => setActivePage("projects")}
            >
              Projects
            </a>
          </li>

          {role === "freelancer" && (
            <li>
              <a
                href="#"
                className={activePage === "bids" ? "active" : ""}
                onClick={() => setActivePage("bids")}
              >
                Bids
              </a>
            </li>
          )}

          <li>
            <a
              href="#"
              className={activePage === "profile" ? "active" : ""}
              onClick={() => setActivePage("profile")}
            >
              Profile
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard__main">
        <header className="dashboard__header">
          <h1>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
        </header>
        <section className="dashboard__content">{renderContent()}</section>
      </main>
    </div>
  );
}
