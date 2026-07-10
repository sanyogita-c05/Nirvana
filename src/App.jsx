import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CustomerView from "./pages/CustomerView";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/customer-view" element={<CustomerView />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;