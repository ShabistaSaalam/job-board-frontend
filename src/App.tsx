import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import ApplicationForm from "./pages/ApplicationForm";
import AdminApplications from "./pages/AdminApplications";
export default function App() {
  return (
    <div>
      <header>
        <h1 >   🌊 CareerBoost</h1>
        <p>Find your dream job across the ocean of possibilities</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/apply" element={<ApplicationForm />} />
          <Route path="/applications" element={<AdminApplications />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
