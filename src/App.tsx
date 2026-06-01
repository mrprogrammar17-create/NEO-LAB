import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CheckoutModal from "./components/CheckoutModal";
import Products from "./components/Products";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PRODUCTS } from "./data";
import { Product } from "./types";

export default function App() {
  // 1. Interactive 3D Customizer states
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [bodyColor, setBodyColor] = useState<string>(PRODUCTS[0].color);
  
  // Custom states that drive ThreeCanvas
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [engineActive, setEngineActive] = useState<boolean>(false);
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [cameraAngle, setCameraAngle] = useState<"front" | "side" | "top" | "back">("side");

  // State to track scroll spy section indicator
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Sync state parameters when a new product preset is selected
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setBodyColor(product.color);
    setWireframeMode(false);
    setEngineActive(false);
    setExplodedView(false);
    setCameraAngle("side");
  };

  // Scroll spy mechanism to highlight appropriate menu item
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["hero", "products", "about", "services", "gallery", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Smooth scroll navigate trigger
  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trigger scroll to builders
  const handleLaunchBuilder = () => {
    handleScrollToSection("hero");
    // Trigger flash core engine state to grab user focus!
    setEngineActive(true);
  };

  return (
    <div className="bg-brand-dark text-zinc-100 min-h-screen font-sans selection:bg-brand-orange selection:text-white" id="showroom-layout-root">
      {/* 1. Brand Sticky Navigation Pane */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleScrollToSection}
        onCustomiseClick={handleLaunchBuilder}
      />

      {/* Main Sections Structure */}
      <main id="showroom-main-content">
        {/* 2. Interactive 3D Showroom Hero */}
        <Hero
          selectedProduct={selectedProduct}
          bodyColor={bodyColor}
          setBodyColor={setBodyColor}
          wireframeMode={wireframeMode}
          setWireframeMode={setWireframeMode}
          engineActive={engineActive}
          setEngineActive={setEngineActive}
          explodedView={explodedView}
          setExplodedView={setExplodedView}
          cameraAngle={cameraAngle}
          setCameraAngle={setCameraAngle}
          onCustomizeClick={() => handleScrollToSection("products")}
          onCommissionClick={() => setIsCheckoutOpen(true)}
        />

        {/* 3. Products Fleet Catalog Selector */}
        <Products
          onSelectProduct={handleSelectProduct}
          selectedProductId={selectedProduct.id}
        />

        {/* 4. Specs, Milestones & About Lab specifications */}
        <About />

        {/* 5. Feature-Bento Core Services Grid */}
        <Services />

        {/* 6. Filterable Development Media Gallery & Lightbox */}
        <Gallery />

        {/* 7. Authority Client Testimonials slider */}
        <Testimonials />

        {/* 8. Detailed Commissions and contact form */}
        <Contact />
      </main>

      {/* 9. Site Footer map and newsletter subscribe */}
      <Footer onScrollToTop={() => handleScrollToSection("hero")} />

      {/* 10. Multi-choice Checkout Commission Form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedProduct={selectedProduct}
        bodyColor={bodyColor}
        engineActive={engineActive}
        wireframeMode={wireframeMode}
      />
    </div>
  );
}
