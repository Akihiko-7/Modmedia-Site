import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card';
import Footer from '../components/Footer';
import ContentGrid from '../components/ContentGrid';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(0, 212, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const scanline = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const KaspaPortal = styled.div`
  background: linear-gradient(135deg, #0a0a1a 0%, #121228 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ParticleGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 0;
`;

const ScanlineOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 212, 255, 0.03) 0%,
    rgba(0, 212, 255, 0.01) 50%,
    rgba(0, 212, 255, 0.03) 100%
  );
  background-size: 100% 6px;
  animation: ${scanline} 4s linear infinite;
  pointer-events: none;
  z-index: 1;
`;

const KaspaFutureContainer = styled.div`
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const StatsPanel = styled.div`
  background: rgba(34, 39, 51, 0.8);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      rgba(0, 212, 255, 0.1) 0%, 
      transparent 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
  animation: ${float} 6s ease-in-out infinite;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: 2.8rem;
  margin: 60px 0 40px;
  color: #00d4ff;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #ff00ff);
    margin: 20px auto 0;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 40px 0 30px;
  }
`;

const EnhancedCard = styled(Card)`
  transition: all 0.4s ease;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay};

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
  }
`;

const KaspaFuture = () => {
  const [stats, setStats] = useState({
    price: '$0.00',
    marketCap: '$1.4B',
    tps: '3000+',
    blocks: '2.1M',
    nodes: '5,000+'
  });

  useEffect(() => {
    const fetchKaspaPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd&include_market_cap=true'
        );
        const data = await response.json();
        setStats(prev => ({
          ...prev,
          price: `$${data.kaspa.usd.toFixed(6)}`,
          marketCap: `$${(data.kaspa.usd_market_cap / 1e9).toFixed(1)}B`
        }));
      } catch (error) {
        console.error('Error fetching Kaspa price:', error);
      }
    };

    fetchKaspaPrice();
    const interval = setInterval(fetchKaspaPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <KaspaPortal>
      <ParticleGrid />
      <ScanlineOverlay />
      
      <HeroSection
        title="KASPA: THE FUTURE OF ECONOMY"
        subtitle="Revolutionizing Blockchain with GHOSTDAG Technology"
        darkOverlay
        neon
      />
      
      <KaspaFutureContainer>
        <StatsPanel>
          <StatItem>
            <StatValue>{stats.price}</StatValue>
            <StatLabel>Current Price</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.marketCap}</StatValue>
            <StatLabel>Market Cap</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.tps}</StatValue>
            <StatLabel>Transactions/sec</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.blocks}</StatValue>
            <StatLabel>Blocks Mined</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.nodes}</StatValue>
            <StatLabel>Active Nodes</StatLabel>
          </StatItem>
        </StatsPanel>

        <SectionHeader>Why Kaspa Matters</SectionHeader>
        
        <ContentGrid>
          <EnhancedCard
            cardId="kaspa-economy"
            title="The Kaspa Revolution"
            previewContent="Kaspa's blockDAG technology enables unprecedented transaction speeds..."
            fullContent="Kaspa's blockDAG technology enables unprecedented transaction speeds and scalability, making it a strong contender for the future of decentralized finance. Unlike traditional blockchains, Kaspa processes multiple blocks simultaneously, achieving high throughput without sacrificing security. This article explores Kaspa's technical advantages, its potential to disrupt global economies, and why it's gaining traction among developers and investors."
            delay="0s"
          />
          <EnhancedCard
            cardId="kaspa-mining"
            title="Mining Kaspa"
            previewContent="Kaspa's fair launch and proof-of-work model ensure true decentralization..."
            fullContent="Kaspa's fair launch and proof-of-work model ensure true decentralization, with no pre-mined coins or centralized control. This article dives into how to mine Kaspa, the hardware requirements, and the economic incentives for miners. Learn why Kaspa's mining ecosystem is accessible to both large and small-scale miners and how it supports the network's long-term stability."
            delay="0.2s"
          />
          <EnhancedCard
            cardId="kaspa-use-cases"
            title="Kaspa Use Cases"
            previewContent="From microtransactions to global payments, Kaspa's versatility is unmatched..."
            fullContent="From microtransactions to global payments, Kaspa's versatility is unmatched. Its high-speed, low-cost transactions make it ideal for real-world applications like remittances, supply chain tracking, and DeFi platforms. This article explores Kaspa's potential use cases and how its technology could reshape industries from finance to logistics."
            delay="0.4s"
          />
        </ContentGrid>

        <SectionHeader>Technical Advantages</SectionHeader>
        
        <ContentGrid>
          <EnhancedCard
            cardId="kaspa-speed"
            title="Instant Confirmations"
            previewContent="Kaspa achieves near-instant transaction confirmations..."
            fullContent="Kaspa achieves near-instant transaction confirmations thanks to its blockDAG structure that allows for parallel block processing. This section explains how Kaspa's 1-second block times compare to traditional blockchains and what this means for real-world usability."
            delay="0.6s"
          />
          <EnhancedCard
            cardId="kaspa-scalability"
            title="Unlimited Scalability"
            previewContent="Kaspa's architecture scales with network growth..."
            fullContent="Kaspa's architecture scales with network growth, avoiding the congestion issues plaguing other blockchains. Learn about Kaspa's unique approach to scalability and how it maintains performance as adoption increases."
            delay="0.8s"
          />
          <EnhancedCard
            cardId="kaspa-security"
            title="Military-Grade Security"
            previewContent="Kaspa combines PoW security with novel consensus mechanisms..."
            fullContent="Kaspa combines PoW security with novel consensus mechanisms to create an extremely resilient network. This article examines Kaspa's security model and why it's considered one of the most attack-resistant protocols in crypto."
            delay="1s"
          />
        </ContentGrid>
      </KaspaFutureContainer>
      
      <Footer />
    </KaspaPortal>
  );
};

export default KaspaFuture;