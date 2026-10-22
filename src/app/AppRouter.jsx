import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import AwarenessPage from "../pages/AwarenessPage.jsx";
import StudyPlannerPage from "../pages/StudyPlannerPage.jsx";
import DiscussionPage from "../pages/DiscussionPage.jsx";
import AssistantPage from "../pages/AssistantPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage.jsx";
import EngineeringAccessPage from "../pages/EngineeringAccessPage.jsx";
import EngineeringDashboardPage from "../pages/EngineeringDashboardPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="awareness" element={<AwarenessPage />} />
        <Route path="planner" element={<StudyPlannerPage />} />
        <Route path="discussion" element={<DiscussionPage />} />
        <Route path="assistant" element={<AssistantPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="engineering-access" element={<EngineeringAccessPage />} />
        <Route path="engineering" element={<EngineeringDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
