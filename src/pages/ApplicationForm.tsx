import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { submitApplication } from "../api/applications";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function ApplicationForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_letter: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    resume_link: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      let errorMsg = "";

      if (name === "name" && !value.trim()) errorMsg = "Name is required";
      else if (name === "email" && !validateEmail(value))
        errorMsg = "Invalid email address";
      else if (name === "resume_link" && !validateURL(value))
        errorMsg = "Invalid resume URL";

      return { ...prev, [name]: errorMsg };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name.trim()) return setError("Name is required");
    if (!validateEmail(form.email)) return setError("Invalid email address");
    if (!validateURL(form.resume_link)) return setError("Invalid resume URL");
    if (Object.values(errors).some((msg) => msg !== ""))
      return setError("Please fix form errors before submitting");

    setSubmitting(true);
    try {
      await submitApplication({ job_id: id!, ...form });
      setSuccess("🎉 Application submitted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setError("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <h2 className="form-heading">Apply for This Job</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <label>
          Name*:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </label>

        <label>
          Email*:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </label>

        <label>
          Resume URL*:
          <input
            type="url"
            name="resume_link"
            value={form.resume_link}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.resume_link && (
            <div className="form-error">{errors.resume_link}</div>
          )}
        </label>

        <label>
          Cover Letter:
          <textarea
            name="cover_letter"
            value={form.cover_letter}
            onChange={handleInputChange}
            rows={5}
            className="form-input"
          />
        </label>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <div className="form-buttons">
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
          <Link to={`/jobs/${id}`} className="back-button">
            ← Back to Job Details
          </Link>
        </div>
      </form>
    </div>
  );
}
