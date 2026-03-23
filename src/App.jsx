import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { MapSection } from './components/MapSection';
import { PropertyGrid } from './components/PropertyGrid';
import { ChatBubble } from './components/ChatBubble';
import { Footer } from './components/Footer';
import Dashboard from './pages/Dashboard';

function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navigation />
      <div className="flex-grow">
        <MapSection />
        <PropertyGrid />
      </div>
      <ChatBubble />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
