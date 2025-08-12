import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyles } from './styles';
import Sidebar from './components/Sidebar';
import Hamburger from './components/Hamburger';
import Home from './pages/Home';
import Gaming from './pages/Gaming';
import Snowden from './pages/Snowden';
import Videos from './pages/Videos';
import ArticlePage from './pages/ArticlePage';
import Analytics from './pages/Analytics';
import Support from './pages/Support';
import KaspaFuture from './pages/KaspaFuture';
import Checkout from './components/Checkout';
import SnowdenNFTs from './pages/SnowdenNFTs';
import styled from 'styled-components';
import { trackPageView } from './analytics';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  margin-left: 180px;
  flex: 1;
  transition: all 0.3s ease;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TrackPageViews = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <GlobalStyles />
      <TrackPageViews />
      <AppContainer>
        <Hamburger toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/snowden" element={<Snowden />} />
            <Route path="/snowden-nfts" element={<SnowdenNFTs />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/kaspa-future-economy" element={<KaspaFuture />} />
            <Route path="/free-speech" element={<ArticlePage articleId="free-speech" />} />
            <Route path="/bear-market-2026" element={<ArticlePage articleId="bear-market-2026" />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/support" element={<Support />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;