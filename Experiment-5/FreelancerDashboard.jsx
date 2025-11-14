import { useEffect, useState } from "react";

export default function FreelancerProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Data fetched:", data);
        setProjects(data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Debug Project Viewer</h2>

      <pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
        {JSON.stringify(projects, null, 2)}
      </pre>
    </div>
  );
}
