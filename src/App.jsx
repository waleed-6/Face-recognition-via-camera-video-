import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import GenerateExamPage from "./pages/GenerateExamPage";
import ExamViewPage from "./pages/ExamViewPage";
import SubscribePage from "./pages/SubscribePage";
import SubscribeSuccessPage from "./pages/SubscribeSuccessPage";
import SubscribeFailPage from "./pages/SubscribeFailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { PaywallGuard } from "./components/common/PaywallGuard";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

const wrap = (node) => <ErrorBoundary>{node}</ErrorBoundary>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={wrap(<LandingPage />)} />
        <Route path="/register" element={wrap(<RegisterPage />)} />
        <Route path="/login" element={wrap(<LoginPage />)} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={wrap(<PaywallGuard><DashboardPage /></PaywallGuard>)} />
          <Route path="/generate" element={wrap(<PaywallGuard><GenerateExamPage /></PaywallGuard>)} />
          <Route path="/exam/:id" element={wrap(<PaywallGuard><ExamViewPage /></PaywallGuard>)} />
          <Route path="/subscribe" element={wrap(<SubscribePage />)} />
          <Route path="/subscribe/success" element={wrap(<SubscribeSuccessPage />)} />
          <Route path="/subscribe/fail" element={wrap(<SubscribeFailPage />)} />
          <Route path="/settings" element={wrap(<SettingsPage />)} />
        </Route>

        <Route path="*" element={wrap(<NotFoundPage />)} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
