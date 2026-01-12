import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/ui/shared/Navbar";

// Pages
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

// Admin Pages
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";

/* ---------- Layout ---------- */
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

/* ---------- Guards ---------- */
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  return user ? children : <Navigate to="/login" replace />;
};

const RecruiterRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "recruiter") return <Navigate to="/" replace />;

  return children;
};

/* ---------- 404 ---------- */
const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-3xl font-bold">404 | Page Not Found</h1>
  </div>
);

/* ---------- Router ---------- */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <Jobs /> },
      { path: "browse", element: <Browse /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "description/:id", element: <JobDescription /> },

      /* Recruiter */
      {
        path: "admin/companies",
        element: (
          <RecruiterRoute>
            <Companies />
          </RecruiterRoute>
        ),
      },
      {
        path: "admin/companies/create",
        element: (
          <RecruiterRoute>
            <CompanyCreate />
          </RecruiterRoute>
        ),
      },
      {
        path: "admin/companies/:id",
        element: (
          <RecruiterRoute>
            <CompanySetup />
          </RecruiterRoute>
        ),
      },
      {
        path: "admin/jobs",
        element: (
          <RecruiterRoute>
            <AdminJobs />
          </RecruiterRoute>
        ),
      },
      {
        path: "admin/jobs/create",
        element: (
          <RecruiterRoute>
            <PostJobs />
          </RecruiterRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },

  /* Auth */
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
