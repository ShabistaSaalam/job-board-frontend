import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobById } from "../api/jobs";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchJobById(id)
        .then((data) => {
          setJob(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load job details");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading job details...</p>;
  if (error) return <p className="text-center mt-8 text-error">{error}</p>;
  if (!job) return <p className="text-center mt-8">Job not found</p>;

  return (
    <div className="job-detail-container">
      <h1 className="job-detail-title">{job.title}</h1>
      <p className="job-detail-meta"><strong>Company:</strong> {job.company}</p>
      <p className="job-detail-meta"><strong>Location:</strong> {job.location}</p>
      <p className="job-detail-meta"><strong>Type:</strong> {job.type}</p>
      <p className="job-detail-description">{job.description}</p>

      <div className="job-detail-links">
        <Link to={`/jobs/${job._id}/apply`} className="btn-primary">Apply for this job</Link>
        <Link to="/" className="btn-secondary">Back to job listings</Link>
      </div>
    </div>
  );
}
