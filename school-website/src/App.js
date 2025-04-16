import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import OpenWeekSection from './components/OpenWeekSection';
import BirthdaySection from './components/BirthdaySection';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FollowUsSection from './components/FollowUsSection';
import EnquirySection from './components/EnquirySection';
import Footer from './components/Footer';
import Admissions from './pages/Admissions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <OpenWeekSection />
              <BirthdaySection />
              <HorizontalScrollSection />
              <AnnouncementsSection />
              <TestimonialsSection />
              <FollowUsSection />
              <EnquirySection />
              <Footer />
            </>
          } />
          <Route path="/admissions" element={<Admissions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
