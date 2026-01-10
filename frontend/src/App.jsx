import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

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
import Companies from "./components/admin/companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";

/* --------------------------
   Layout WITH Navbar
--------------------------- */
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

/* --------------------------
   Layout WITHOUT Navbar
--------------------------- */
const AuthLayout = () => <Outlet />;

/* --------------------------
   Fallback 404 Page
--------------------------- */
const NotFound = () => (
  <div className="flex items-center justify-center h-screen text-center">
    <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-gray-600">
      Oops! The page you are looking for does not exist.
    </p>
    <a
      href="/"
      className="mt-4 inline-block text-blue-600 underline hover:text-blue-800"
    >
      Go back home
    </a>
  </div>
);

/* --------------------------
   Router
--------------------------- */
const router = createBrowserRouter([
  /* Main app pages with Navbar */
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },        // /
      { path: "home", element: <Home /> },       // /home
      { path: "jobs", element: <Jobs /> },
      { path: "browse", element: <Browse /> },
      { path: "profile", element: <Profile /> },
      { path: "description/:id", element: <JobDescription /> },

      // Admin pages
      { path: "admin/companies", element: <Companies /> },
      { path: "admin/companies/create", element: <CompanyCreate /> },
      { path: "admin/companies/:id", element: <CompanySetup /> },

      // Catch-all 404 inside main layout
      { path: "*", element: <NotFound /> },
    ],
  },

  /* Auth pages WITHOUT Navbar */
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },

  // Global fallback for any unmatched route
  { path: "*", element: <Navigate to="/" replace /> },
]);

/* --------------------------
   App Component
--------------------------- */
export default function App() {
  return <RouterProvider router={router} />;
}
