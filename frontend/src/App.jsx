import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "../src/Route/ProtectedRoute";
import AdminRoute from "../src/Route/AdminRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import Contact from "./pages/Contact";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Recommendation from "./pages/student/Recommendation";
import History from "./pages/student/History";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Students from "./pages/admin/Students";
import Recommendations from "./pages/admin/Recommendations";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/how-it-works"
            element={<HowItWorks />}
          />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/student-profile"
              element={<StudentProfile />}
            />
            <Route
              path="/recommendation"
              element={<Recommendation />}
            />
            <Route
              path="/history"
              element={<History />}
            />
          </Route>

          <Route element={<AdminRoute />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/users"
              element={<Users />}
            />
            <Route
              path="/admin/students"
              element={<Students />}
            />
            <Route
              path="/admin/recommendations"
              element={<Recommendations />}
            />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;