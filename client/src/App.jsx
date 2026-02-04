import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ServicesOffered from './pages/ServicesOffered'
import ElectricityServicesPage from './pages/services/ElectricityServices'
import NewConnectionPage from './pages/services/NewConnection'
import GasServicesPage from './pages/services/GasServices'
import WaterServicesPage from './pages/services/WaterServices'
import WasteManagementPage from './pages/services/WasteManagement'
import MunicipalGrievancePage from './pages/services/MunicipalGrievance'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import HelpPage from './pages/Help'
import LanguageSelection from './pages/LanguageSelection'
import { LanguageProvider } from './context/LanguageContext.jsx'

const App = () => {
  const [languageSelected, setLanguageSelected] = useState(true); // Changed to true to see Home page directly

  return (
    <LanguageProvider>
      <Router>
        {languageSelected ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesOffered />} />
            <Route path="/services/electricity" element={<ElectricityServicesPage />} />
            <Route path="/services/electricity/new-connection" element={<NewConnectionPage />} />
            <Route path="/services/gas" element={<GasServicesPage />} />
            <Route path="/services/water" element={<WaterServicesPage />} />
            <Route path="/services/waste" element={<WasteManagementPage />} />
            <Route path="/services/grievance" element={<MunicipalGrievancePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        ) : (
          <LanguageSelection onLanguageSelect={() => setLanguageSelected(true)} />
        )}
      </Router>
    </LanguageProvider>
  )
}

export default App
