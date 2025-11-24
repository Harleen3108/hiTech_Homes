import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import { EnquiryProvider } from "./context/EnquiryContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AddProperty from "./pages/AddProperty";
import AdminEnquiries from "./pages/AdminEnquiries";
import ChatBot from "./components/ChatBot";
import { UserAuthProvider } from "./context/UserAuthContext";
import "./styles/index.css";
import AdminAnalytics from "./pages/AdminAnalytics";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
      case "listings":
        return (
          <Listings
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
      case "property-details":
        return (
          <PropertyDetails
            property={selectedProperty}
            setCurrentPage={setCurrentPage}
          />
        );
      case "admin-analytics":
        return (
          <AdminAnalytics
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
      case "about":
        return <About setCurrentPage={setCurrentPage} />;
      case "contact":
        return <Contact />;
      case "privacy-policy":
        return <PrivacyPolicy setCurrentPage={setCurrentPage} />;
      case "terms-conditions":
        return <TermsConditions setCurrentPage={setCurrentPage} />;
      case "admin-login":
      case "add-property":
        return <AddProperty setCurrentPage={setCurrentPage} />;
      case "admin-enquiries":
        return <AdminEnquiries setCurrentPage={setCurrentPage} />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
    }
  };

  const showNavbar = ![
    "admin-login",
    "admin-dashboard",
    "add-property",
    "admin-enquiries",
  ].includes(currentPage);
  const showFooter = ![
    "admin-login",
    "admin-dashboard",
    "add-property",
    "admin-enquiries",
  ].includes(currentPage);

  return (
    <AuthProvider>
      <UserAuthProvider>
        <PropertyProvider>
          <EnquiryProvider>
            <div className="min-h-screen bg-gray-50">
              {showNavbar && (
                <Navbar
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
              {renderPage()}
              {showFooter && <Footer setCurrentPage={setCurrentPage} />}
              <ChatBot />
            </div>
          </EnquiryProvider>
        </PropertyProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
}

export default App;
