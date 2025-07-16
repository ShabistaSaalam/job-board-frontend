import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

export async function fetchJobs() {
  const response = await axios.get(`${API_BASE_URL}/jobs`);
  return response.data;
}
export async function fetchJobById(id: string) {
  const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
  return response.data;
}
