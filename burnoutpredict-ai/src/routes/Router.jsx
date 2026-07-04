import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Product from "../pages/Product";
import Solutions from "../pages/Solutions";
import FeaturesPage from "../pages/FeaturesPage";
import Pricing from "../pages/Pricing";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Demo from "../pages/Demo";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product" element={<Product />} />

        <Route path="/solutions" element={<Solutions />} />

        <Route path="/features" element={<FeaturesPage />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/about" element={<About />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/demo" element={<Demo />} />

      </Routes>
    </BrowserRouter>
  );
}