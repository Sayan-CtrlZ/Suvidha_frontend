import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ServicesOffered from './pages/ServicesOffered'
import ElectricityServicesPage from './pages/services/ElectricityServices'
import ElectricityBillingDashboard from './pages/services/ElectricityBillingDashboard'
import NewConnectionPage from './pages/services/NewConnection'
import GasServicesPage from './pages/services/GasServices'
import GasBillingDashboard from './pages/services/GasBillingDashboard'
import GasNewConnection from './pages/services/GasNewConnection'
import WaterServicesPage from './pages/services/WaterServices'
import WaterBillingDashboard from './pages/services/WaterBillingDashboard'
import WaterNewConnection from './pages/services/WaterNewConnection'
import WasteManagementPage from './pages/services/WasteManagement'
import WasteSchedulePage from './pages/services/WasteSchedulePage'
import MunicipalGrievancePage from './pages/services/MunicipalGrievance'
import ServiceCategoryPage from './pages/services/ServiceCategoryPage'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import AccessDenied from './pages/auth/AccessDenied'
import AdminSignIn from './pages/auth/AdminSignIn'
import AdminDashboard from './pages/admin/AdminDashboard'
import SuperAdminSignIn from './pages/auth/SuperAdminSignIn'
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard'
import Dashboard from './pages/Dashboard'
import HelpPage from './pages/Help'
import LanguageSelection from './pages/LanguageSelection'
import Account from './pages/Account'
import QuickPay from './pages/services/QuickPay'
import MyServices from './pages/services/MyServices'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import SiteMap from './pages/SiteMap'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const App = () => {
  // Check if language was already selected or skipped in this session
  const [languageSelected, setLanguageSelected] = useState(() => {
    return localStorage.getItem('suvidha-language') || sessionStorage.getItem('suvidha-language-skipped');
  });

  const handleLanguageSelect = () => {
    setLanguageSelected(true);
  };

  const handleLanguageSkip = () => {
    sessionStorage.setItem('suvidha-language-skipped', 'true');
    setLanguageSelected(true);
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          {languageSelected ? (
            <Routes>
              {/* Public Routes - No Auth Required */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesOffered />} />
              <Route path="/services/electricity" element={<ElectricityServicesPage />} />
              <Route path="/services/gas" element={<GasServicesPage />} />
              <Route path="/services/water" element={<WaterServicesPage />} />
              <Route path="/services/waste" element={<WasteManagementPage />} />
              <Route path="/services/grievance" element={<MunicipalGrievancePage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<Navigate to="/signin" replace />} /> {/* Redirect from /login to /signin */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/quick-pay" element={<QuickPay />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/access-denied" element={<AccessDenied />} />

              {/* Super Admin Routes */}
              <Route path="/super-admin/login" element={<SuperAdminSignIn />} />
              <Route path="/super-admin/dashboard" element={
                <ProtectedRoute requiredRole="super_admin">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } />

              {/* Admin (Department) Routes */}
              <Route path="/admin/login" element={<AdminSignIn />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Protected Routes - Auth Required */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/services/electricity/billing" element={<ProtectedRoute><ElectricityBillingDashboard /></ProtectedRoute>} />
              <Route path="/services/electricity/new-connection" element={<ProtectedRoute><NewConnectionPage /></ProtectedRoute>} />
              <Route path="/services/gas/billing" element={<ProtectedRoute><GasBillingDashboard /></ProtectedRoute>} />
              <Route path="/services/gas/new-connection" element={<ProtectedRoute><GasNewConnection /></ProtectedRoute>} />
              <Route path="/services/water/billing" element={<ProtectedRoute><WaterBillingDashboard /></ProtectedRoute>} />
              <Route path="/services/water/new-connection" element={<ProtectedRoute><WaterNewConnection /></ProtectedRoute>} />
              <Route path="/services/waste/schedule" element={<ProtectedRoute><WasteSchedulePage /></ProtectedRoute>} />
              <Route path="/services/gas/:categoryId" element={<ProtectedRoute><ServiceCategoryPage /></ProtectedRoute>} />
              <Route path="/services/water/:categoryId" element={<ProtectedRoute><ServiceCategoryPage /></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/my-services" element={<ProtectedRoute><MyServices /></ProtectedRoute>} />

              {/* Utility Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/sitemap" element={<SiteMap />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <LanguageSelection
              onLanguageSelect={handleLanguageSelect}
              onClose={handleLanguageSkip}
            />
          )}
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
