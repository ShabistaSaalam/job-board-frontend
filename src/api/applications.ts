import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface ApplicationData {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_letter: string;
}

export async function submitApplication(data: ApplicationData) {
  const response = await axios.post(`${API_BASE_URL}/applications`, data);
  return response.data;
}

export async function fetchApplications() {
  const response = await axios.get(`${API_BASE_URL}/applications`);
  return response.data;
}
