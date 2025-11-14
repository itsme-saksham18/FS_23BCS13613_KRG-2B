import { useState, useEffect } from "react";
import '../styles/Profile.css';

export default function Profile() {
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    setRole(savedRole);

    // Load profile from localStorage if exists
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <h2>{role === "employer" ? "Employer Profile" : "Freelancer Profile"}</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
