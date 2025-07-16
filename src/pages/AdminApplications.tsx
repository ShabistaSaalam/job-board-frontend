import { useEffect, useState } from "react";
import { fetchApplications } from "../api/applications";
import "./AdminApplications.css";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

interface Application {
  _id: string;
  job_id: Job | null;
  name: string;
  email: string;
  resume_link: string;
  cover_letter: string;
}
export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications()
      .then((data) => {
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          setApplications([]);
          setError("Unexpected data format received");
        }
      })
      .catch((err) => {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="admin-loading" aria-live="polite">
        Loading applications...
      </p>
    );
  if (error)
    return (
      <p className="admin-error" aria-live="polite">
        {error}
      </p>
    );

  return (
    <div className="admin-app-page">
      <div className="admin-app-table-wrapper">
        <h1 className="admin-title">Applications</h1>
        {applications.length === 0 ? (
          <p className="admin-empty">No applications found.</p>
        ) : (
          <div className="admin-table-scroll">
            <table className="admin-app-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Resume</th>
                  <th>Cover Letter</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.job_id?.title ?? "N/A"}</td>
                    <td>{app.job_id?.company ?? "N/A"}</td>
                    <td>{app.job_id?.location ?? "N/A"}</td>
                    <td>{app.job_id?.type ?? "N/A"}</td>
                    <td>
                      {app.resume_link ? (
                        <a
                          href={app.resume_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="cover-letter-cell">{app.cover_letter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
