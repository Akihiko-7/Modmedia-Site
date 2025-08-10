import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 15px rgba(0, 212, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const NFTContainer = styled.div`
  background: linear-gradient(135deg, #0a0a1a 0%, #121228 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ParticleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: 
    linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 60px 5%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
`;

const NFTItem = styled.div`
  background: rgba(34, 39, 51, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
    border-color: rgba(255, 111, 97, 0.4);

    .nft-overlay {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00d4ff, #ff6f61, #00d4ff);
    background-size: 200%;
    z-index: -1;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: ${gradientFlow} 3s linear infinite;
  }

  &:hover::before {
    opacity: 0.7;
  }
`;

const NFTImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    cursor: pointer;
  }

  img.expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 48rem;
    max-height: 48rem;
    z-index: 2000;
    border-radius: 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  &:hover img:not(.expanded) {
    transform: scale(1.05);
  }
`;

const NFTInfo = styled.div`
  padding: 20px;
  text-align: center;

  h3 {
    color: #00d4ff;
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    margin-bottom: 15px;
  }
`;

const NFTOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 2001;
  transition: background 0.3s ease;

  &:hover {
    background: #ff3b3b;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1999;
`;

const PDFLockedSection = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 40px;
  margin: 60px auto;
  max-width: 800px;
  text-align: center;
  border: 1px solid rgba(255, 111, 97, 0.3);
  box-shadow: 0 0 30px rgba(255, 111, 97, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 2;

  h2 {
    color: #ff6f61;
    margin-bottom: 20px;
    font-size: 2rem;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 30px;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 111, 97, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
    z-index: -1;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MintButton = styled.button`
  background: linear-gradient(45deg, #00d4ff, #ff6f61);
  color: #0a0a1a;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 111, 97, 0.4);
  }
`;

const SnowdenNFTs = () => {
  const [nfts] = useState([
    { src: '/assets/PG1FINAL.jpg', caption: 'Whistleblower', rarity: 'Legendary', id: 1 },
    { src: '/assets/PG2Final.png', caption: 'Exile', rarity: 'Epic', id: 2 },
    { src: '/assets/pg3Final.png', caption: 'Revelation', rarity: 'Rare', id: 3 },
    { src: '/assets/pg4Final.jpg', caption: 'Surveillance', rarity: 'Uncommon', id: 4 },
    { src: '/assets/Pg5Final.jpg', caption: 'Freedom', rarity: 'Common', id: 5 },
  ]);

  const [expanded, setExpanded] = useState(null);

  const handleUnlockPDF = () => {
    window.open('https://drive.google.com/file/d/1QfRmshk3MpmCzpZ8EKj9bUPzpOpPDUlY/view?usp=sharing', '_blank');
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <NFTContainer>
      <ParticleBackground />
      <HeroSection
        title="SNOWDEN SECRET ARCHIVES"
        subtitle="Exclusive Digital Collectibles - Preserving the Legacy of Truth"
        bgImage="/assets/snwdnfact.png"
        darkOverlay
      />
      
      <NFTGrid>
        {nfts.map((nft, index) => (
          <NFTItem key={nft.id} delay={`${index * 0.1}s`}>
            <NFTImage>
              <img
                src={nft.src}
                alt={nft.caption}
                className={expanded === nft.id ? 'expanded' : ''}
                onClick={() => toggleExpand(nft.id)}
              />
              <NFTOverlay className="nft-overlay" />
            </NFTImage>
            <NFTInfo>
              <h3>{nft.caption}</h3>
              <p>{nft.rarity} Collectible</p>
            </NFTInfo>
            {expanded === nft.id && (
              <>
                <CloseButton onClick={() => setExpanded(null)}>×</CloseButton>
                <Overlay onClick={() => setExpanded(null)} />
              </>
            )}
          </NFTItem>
        ))}
      </NFTGrid>

      <PDFLockedSection>
        <h2>CLASSIFIED ARCHIVES</h2>
        <p>
          Gain access to exclusive, never-before-seen Snowden archival content.
          This premium collection includes 5 ultra-rare digital artifacts that
          complete your Snowden NFT collection. Click below to download the full comic PDF.
        </p>
        <MintButton onClick={handleUnlockPDF}>
          Download Full Comic PDF Here
        </MintButton>
      </PDFLockedSection>

      <Footer />
    </NFTContainer>
  );
};

export default SnowdenNFTs;