import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobs";
import { Link, useNavigate } from "react-router-dom";
const Email = import.meta.env.VITE_API_ADMIN_EMAIL;
const Password = import.meta.env.VITE_API_ADMIN_PASSWORD;

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // Admin login state
  const [showLogin, setShowLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((job) => job.type.toLowerCase() === filter.toLowerCase());

  const handleLogin = () => {
    if (
      adminEmail === Email &&
      adminPassword === Password
    ) {
      setShowLogin(false);
      navigate("/applications");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  if (loading)
    return <p className="text-center text-lg mt-12 text-pearl">Loading jobs...</p>;
  if (error)
    return <p className="text-center text-lg mt-12 text-red-400">{error}</p>;

  return (
    <>
      <div className="container">
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.5rem" }}>
          {/* Filter */}
          <div className="filter-container">
            <label htmlFor="job-filter" style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
              Filter by Job Type:
            </label>
            <select
              id="job-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: "0.3rem 0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
            >
              <option value="all">All</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          {/* Admin Button */}
          <button onClick={() => setShowLogin(true)} className="admin-nav-button">
            Admin
          </button>
        </div>

        {/* Login Prompt */}
        {showLogin && (
          <div
            style={{
              background: "#ffffffdd",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              maxWidth: "350px",
              marginBottom: "1.5rem",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Admin Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
            />
            {loginError && <p style={{ color: "red", marginBottom: "0.5rem" }}>{loginError}</p>}
            <button
              onClick={handleLogin}
              style={{ padding: "0.5rem 1rem", marginRight: "0.5rem", background: "#326ba8", color: "#fff", border: "none", borderRadius: "6px" }}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              style={{ padding: "0.5rem 1rem", background: "#ccc", border: "none", borderRadius: "6px" }}
            >
              Cancel
            </button>
          </div>
        )}

        {filteredJobs.length === 0 ? (
          <p className="text-center text-lg mt-12 text-pearl">No jobs found for this filter.</p>
        ) : (
          filteredJobs.map((job) => (
            <Link to={`/jobs/${job._id}`} key={job._id} className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
