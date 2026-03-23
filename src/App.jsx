import React from 'react';
import { Navigation } from './components/Navigation';
import { MapSection } from './components/MapSection';
import { PropertyGrid } from './components/PropertyGrid';
import { ChatBubble } from './components/ChatBubble';
import { Footer } from './components/Footer';

function App() {
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

export default App;
