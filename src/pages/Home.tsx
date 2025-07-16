import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobs";
import { Link } from "react-router-dom";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string; // <-- add type here
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all"); // new state for filter

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

  // Filter jobs based on selected filter
  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((job) => job.type.toLowerCase() === filter.toLowerCase());

  if (loading) return <p className="text-center text-lg mt-12 text-pearl">Loading jobs...</p>;
  if (error) return <p className="text-center text-lg mt-12 text-red-400">{error}</p>;

  return (
    <div className="container">
      <div className="filter-container" style={{ marginBottom: "1.5rem" }}>
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

      {filteredJobs.length === 0 ? (
        <p className="text-center text-lg mt-12 text-pearl">No jobs found for this filter.</p>
      ) : (
        filteredJobs.map((job) => (
          <Link
            to={`/jobs/${job._id}`}
            key={job._id}
            className="job-card"
          >
            <h2 className="job-title">{job.title}</h2>
            <p className="job-company">{job.company}</p>
            <p className="job-location">{job.location}</p>
          </Link>
        ))
      )}
    </div>
  );
}
