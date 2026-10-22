import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import InventoryPage from "./pages/dashboard/InventoryPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import Analytics from "./pages/Analytics";
import CustomerView from "./pages/CustomerView";
import ProductDetails from "./pages/ProductDetails";
import SettingsPage from "./pages/SettingsPage";
import Profile from "./pages/Profile";

import Notifications from "./pages/notifications/Notifications";
import License from "./pages/License";

import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/layout/ProtectedRoute";

function LicenseRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const onBlocked = () => {
      if (window.location.pathname !== "/license") {
        navigate("/license", { replace: true });
      }
    };

    window.addEventListener("license:blocked", onBlocked);

    return () => {
      window.removeEventListener("license:blocked", onBlocked);
    };
  }, [navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>

      <LicenseRedirector />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "'Inter', sans-serif",
          },
          success: {
            iconTheme: {
              primary: "#34a853",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e0576b",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />


        {/* ================= PROTECTED PAGES ================= */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/license"
          element={
            <ProtectedRoute>
              <License />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer-view"
          element={
            <ProtectedRoute>
              <CustomerView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;