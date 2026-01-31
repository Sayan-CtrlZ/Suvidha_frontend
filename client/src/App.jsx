import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ServicesOffered from './pages/ServicesOffered'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        ) : (
          <LanguageSelection onLanguageSelect={() => setLanguageSelected(true)} />
        )}
      </Router>
    </LanguageProvider>
  )
}

export default App
