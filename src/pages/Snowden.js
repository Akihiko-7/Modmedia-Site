import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import MintSection from '../components/MintSection';
import Tokenomics from '../components/Tokenomics';
import Team from '../components/Team';
import ComicGallery from '../components/ComicGallery';
import ImageGallery from '../components/ImageGallery';
import Footer from '../components/Footer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 212, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
`;

const glitch = keyframes`
  0% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  25% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  50% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  75% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  100% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
`;

const SnowdenContainer = styled.div`
  background: linear-gradient(135deg, #0a0a1a 0%, #121228 100%);
  color: #fff;
  font-family: 'Courier New', monospace;
  position: relative;
  overflow-x: hidden;
`;

const DataStream = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
`;

const TerminalEffect = styled.div`
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
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 0;
  animation: ${fadeIn} 2s ease-in;
`;

const ContentSection = styled.section`
  padding: 80px 5%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 992px) {
    padding: 60px 5%;
  }
`;

const MissionStatement = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 40px;
  margin: 60px auto;
  max-width: 900px;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1s ease-out;

  p {
    font-size: 1.3rem;
    line-height: 1.8;
    text-align: center;
    margin-bottom: 20px;
    color: #e0e7ff;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #00d4ff;
      font-weight: normal;
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    
    p {
      font-size: 1.1rem;
    }
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin: 80px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ImageCard = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 212, 255, 0.2);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 212, 255, 0.3);
    border-color: rgba(255, 0, 255, 0.4);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  }

  .card-content {
    padding: 20px;

    h3 {
      color: #00d4ff;
      margin-bottom: 10px;
      font-size: 1.4rem;
    }

    p {
      color: #b8c2d8;
      line-height: 1.6;
      font-size: 1rem;
    }

    .social-link {
      display: inline-block;
      margin-top: 15px;
      color: #ff00ff;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;

      &:hover {
        color: #00d4ff;
        text-decoration: underline;
      }
    }
  }
`;

const PriceTicker = styled.div`
  background: linear-gradient(90deg, #121228 0%, #1a1a4a 100%);
  border-radius: 8px;
  padding: 20px;
  margin: 50px auto;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
  animation: ${pulse} 2s infinite, ${fadeIn} 1s ease-out;

  .price-item {
    flex: 1;
    min-width: 200px;
    text-align: center;

    .label {
      color: #b8c2d8;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .value {
      color: #00ff88;
      font-size: 1.5rem;
      font-weight: bold;
      font-family: 'Courier New', monospace;
    }

    .change {
      font-size: 0.9rem;
      margin-top: 5px;

      &.positive {
        color: #00ff88;
      }

      &.negative {
        color: #ff5555;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;

    .price-item {
      min-width: 100%;
    }
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin: 80px 0 50px;
  color: #00d4ff;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  animation: ${glitch} 2s infinite alternate;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #ff00ff, #00d4ff);
    margin: 20px auto 0;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 60px 0 40px;
  }
`;

const SwapContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 40px;
  margin: 60px auto;
  max-width: 600px;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1s ease-out;

  h3 {
    color: #00d4ff;
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.8rem;
  }

  .swap-form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 10px;

      label {
        color: #b8c2d8;
        font-size: 1rem;
      }

      input, select {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(0, 212, 255, 0.3);
        border-radius: 5px;
        padding: 12px 15px;
        color: #fff;
        font-family: 'Courier New', monospace;
        font-size: 1.1rem;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #ff00ff;
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
        }
      }
    }

    .swap-button {
      background: linear-gradient(45deg, #ff00ff, #00d4ff);
      color: #000;
      border: none;
      padding: 15px;
      border-radius: 5px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Snowden = () => {
  const [kaspaPrice, setKaspaPrice] = useState(0.09657);
  const [snowdnPrice, setSnowdnPrice] = useState(0);
  const [mmediaPrice, setMmediaPrice] = useState(0);
  const [change24h, setChange24h] = useState({ kaspa: '0.0%', snowdn: '0.0%', mmedia: '0.0%' });
  const [swapFrom, setSwapFrom] = useState('KAS');
  const [swapTo, setSwapTo] = useState('SNOWDN');
  const [swapAmount, setSwapAmount] = useState('');

  useEffect(() => {
    const fetchKaspaPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd&include_24hr_change=true'
        );
        const kasPrice = response.data.kaspa.usd;
        const kasChange = response.data.kaspa.usd_24h_change.toFixed(1);
        setKaspaPrice(kasPrice);
        setSnowdnPrice(kasPrice * 0.021069);
        setMmediaPrice(kasPrice * 5.490645);
        setChange24h({
          kaspa: `${kasChange >= 0 ? '+' : ''}${kasChange}%`,
          snowdn: `${kasChange >= 0 ? '+' : ''}${kasChange}%`,
          mmedia: `${kasChange >= 0 ? '+' : ''}${kasChange}%`
        });
      } catch (error) {
        console.error('Error fetching Kaspa price:', error);
      }
    };

    fetchKaspaPrice();
    const interval = setInterval(fetchKaspaPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateSwap = () => {
    if (!swapAmount) return '';
    const amount = parseFloat(swapAmount);
    if (isNaN(amount)) return '';

    const rates = {
      KAS: { SNOWDN: 0.021069, MMEDIA: 5.490645 },
      SNOWDN: { KAS: 1 / 0.021069, MMEDIA: 5.490645 / 0.021069 },
      MMEDIA: { KAS: 1 / 5.490645, SNOWDN: 0.021069 / 5.490645 }
    };

    return (amount / rates[swapFrom][swapTo]).toFixed(6);
  };

  const handleSwap = (e) => {
    e.preventDefault();
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScyYmn2NeZkdPk-gf3rRDxWiYUUCSlpbIH9PbdzKb-1z2vFOg/viewform?usp=dialog', '_blank');
  };

  return (
    <SnowdenContainer>
      <DataStream />
      <TerminalEffect />
      
      <HeroSection
        title="RESCUE SNOWDEN ON KASPA"
        subtitle="The Most Decentralized Cryptocurrency Collectible Built on Proof-of-Work"
        bgImage="/assets/Kassnow.jpg"
        darkOverlay
      />
      
      <ContentSection>
        <MissionStatement>
          <p>
            <strong>Edward Snowden risked everything to expose mass surveillance.</strong> Now, we're leveraging blockchain technology to continue his fight for privacy and freedom.
          </p>
          <p>
            The $SNOWDN token isn't just a cryptocurrency—it's a statement. Built on Kaspa's revolutionary blockDAG technology, it represents the future of decentralized, private, and censorship-resistant value transfer.
          </p>
        </MissionStatement>

        <PriceTicker>
          <div className="price-item">
            <div className="label">Kaspa Price</div>
            <div className="value">${kaspaPrice.toFixed(6)}</div>
            <div className={`change ${change24h.kaspa.startsWith('+') ? 'positive' : 'negative'}`}>
              {change24h.kaspa} (24h)
            </div>
          </div>
          <div className="price-item">
            <div className="label">$SNOWDN Price</div>
            <div className="value">${snowdnPrice.toFixed(6)}</div>
            <div className={`change ${change24h.snowdn.startsWith('+') ? 'positive' : 'negative'}`}>
              {change24h.snowdn} (24h)
            </div>
          </div>
          <div className="price-item">
            <div className="label">$MMEDIA Price</div>
            <div className="value">${mmediaPrice.toFixed(6)}</div>
            <div className={`change ${change24h.mmedia.startsWith('+') ? 'positive' : 'negative'}`}>
              {change24h.mmedia} (24h)
            </div>
          </div>
        </PriceTicker>

        <ImageGrid>
          <ImageCard delay="0.2s">
            <img src="/assets/snowden-update1.png" alt="Snowden Update" />
            <div className="card-content">
              <h3>Follow Snowden</h3>
              <p>Stay updated with the latest $SNOWDN project updates.</p>
              <a href="https://x.com/RescueSnowden/status/1836319095651995655" target="_blank" rel="noopener noreferrer" className="social-link">
                @RescueSnowden on X
              </a>
            </div>
          </ImageCard>

          <ImageCard delay="0.4s">
            <img src="/assets/snowdn-update2.png" alt="ModMedia Update" />
            <div className="card-content">
              <h3>Project Updates</h3>
              <p>Get the latest news about the $SNOWDN project and its development roadmap.</p>
              <a href="https://x.com/RescueSnowden/status/1858585449394208903" target="_blank" rel="noopener noreferrer" className="social-link">
                @RescueSnowden on X
              </a>
            </div>
          </ImageCard>

          <ImageCard delay="0.6s">
            <img src="/assets/snowden_update3.png" alt="Snowden in Exile" />
            <div className="card-content">
              <h3>In His Own Words</h3>
              <p>"In many ways, 2013 wasn't about surveillance at all. What it was about was a violation of the Constitution."</p>
              <a href="https://x.com/Snowden" target="_blank" rel="noopener noreferrer" className="social-link">
                @Snowden on X
              </a>
            </div>
          </ImageCard>
        </ImageGrid>

        <SectionHeader>Token Swap</SectionHeader>
        
        <SwapContainer>
          <h3>Swap Tokens</h3>
          <form className="swap-form" onSubmit={handleSwap}>
            <div className="form-group">
              <label htmlFor="from">From</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="number" 
                  id="amount" 
                  placeholder="0.0"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                />
                <select 
                  id="from" 
                  value={swapFrom}
                  onChange={(e) => setSwapFrom(e.target.value)}
                >
                  <option value="KAS">KAS</option>
                  <option value="SNOWDN">SNOWDN</option>
                  <option value="MMEDIA">MMEDIA</option>
                </select>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              <button 
                type="button" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#00d4ff', 
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ↓
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="to">To</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  id="to-amount" 
                  placeholder="0.0"
                  readOnly
                  value={calculateSwap()}
                />
                <select 
                  id="to" 
                  value={swapTo}
                  onChange={(e) => setSwapTo(e.target.value)}
                >
                  <option value="KAS">KAS</option>
                  <option value="SNOWDN">SNOWDN</option>
                  <option value="MMEDIA">MMEDIA</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="swap-button">Swap Now</button>
          </form>
        </SwapContainer>

        <MintSection />
        
        <SectionHeader>Tokenomics</SectionHeader>
        <Tokenomics />
        
        <SectionHeader>Our Team</SectionHeader>
        <Team />
        
        <SectionHeader>Comic Series</SectionHeader>
        <ComicGallery />
        
        <SectionHeader>Gallery</SectionHeader>
        <ImageGallery />
      </ContentSection>
      
      <Footer />
    </SnowdenContainer>
  );
};

export default Snowden;