import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const neonGlow = keyframes`
  0% { text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
  50% { text-shadow: 0 0 15px #ff00ff, 0 0 25px #ff00ff; }
  100% { text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
`;

const scanline = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const glitch = keyframes`
  0% { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%); }
  10% { clip-path: polygon(0 5%, 100% 15%, 100% 95%, 0 85%); }
  20% { clip-path: polygon(0 10%, 100% 5%, 100% 85%, 0 95%); }
  30% { clip-path: polygon(0 15%, 100% 10%, 100% 75%, 0 80%); }
  40% { clip-path: polygon(0 20%, 100% 25%, 100% 65%, 0 70%); }
  50% { clip-path: polygon(0 25%, 100% 30%, 100% 55%, 0 60%); }
  60% { clip-path: polygon(0 30%, 100% 35%, 100% 45%, 0 50%); }
  70% { clip-path: polygon(0 35%, 100% 40%, 100% 35%, 0 40%); }
  80% { clip-path: polygon(0 40%, 100% 45%, 100% 25%, 0 30%); }
  90% { clip-path: polygon(0 45%, 100% 50%, 100% 15%, 0 20%); }
  100% { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%); }
`;

const VideoPortal = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 100px);
  position: relative;
  z-index: 2;
  padding-top: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 60px;
  }
`;

const CyberSidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
  background: rgba(10, 10, 26, 0.7);
  border-right: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
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
      rgba(255, 0, 255, 0.1) 100%);
    z-index: -1;
    opacity: 0.3;
  }

  h3 {
    color: #00d4ff;
    font-size: 1.5rem;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #00d4ff, #ff00ff);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
    padding: 20px;
  }
`;

const PlaylistItem = styled.div`
  color: rgba(255, 255, 255, 0.8);
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: ${props => props.active ? 'rgba(0, 212, 255, 0.15)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? '#00d4ff' : 'transparent'};

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    transform: translateX(5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(0, 212, 255, 0.1) 0%, 
      transparent 100%);
    z-index: -1;
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const VideoHub = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
  padding: 30px;
  position: relative;

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }
`;

const VideoPod = styled.div`
  background: rgba(34, 39, 51, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay};

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
    border-color: rgba(255, 0, 255, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00d4ff, #ff00ff, #00d4ff);
    background-size: 200%;
    z-index: -1;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.7;
  }
`;

const VideoDisplay = styled.div`
  width: 100%;
  height: 225px;
  position: relative;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const VideoInfo = styled.div`
  padding: 20px;
  position: relative;
  overflow: hidden;

  h3 {
    color: #00d4ff;
    margin-bottom: 10px;
    font-size: 1.3rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #00d4ff, transparent);
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const GlitchBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, #00d4ff, #ff00ff);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  animation: ${glitch} 5s infinite alternate;

  span {
    color: #0a0a1a;
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

const Videos = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [showGlitch, setShowGlitch] = useState(true);
  const iframeRefs = useRef([]);

  const videos = [
    {
      id: 1,
      title: "Crypto Cross Fire™ Episode 4",
      embedUrl: "https://rumble.com/embed/v6ovqqq/?pub=4",
      description: "Latest crypto market analysis and heated debates",
      date: "May 15, 2025",
      rumbleUrl: "https://rumble.com/v6ovqqq"
    },
    {
      id: 2,
      title: "Crypto Cross Fire™ Episode 3",
      embedUrl: "https://rumble.com/embed/v6jwhg9/?pub=4",
      description: "Deep dive into Kaspa's revolutionary technology",
      date: "April 28, 2025",
      rumbleUrl: "https://rumble.com/v6jwhg9"
    },
    {
      id: 3,
      title: "Crypto Cross Fire™ Episode 2",
      embedUrl: "https://rumble.com/embed/v6ok14o/?pub=4",
      description: "Bitcoin halving special with expert predictions",
      date: "April 10, 2025",
      rumbleUrl: "https://rumble.com/v6ok14o"
    },
    {
      id: 4,
      title: "Crypto Cross Fire™ Episode 1",
      embedUrl: "https://rumble.com/embed/v6q6atj/?pub=4",
      description: "Regulation showdown - SEC vs Crypto",
      date: "March 22, 2025",
      rumbleUrl: "https://rumble.com/v6q6atj"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGlitch(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (index) => {
    const iframe = iframeRefs.current[index];
    if (iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setTimeout(() => {
        const currentIframe = iframeRefs.current[index];
        if (currentIframe) {
          currentIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      }, 100);
    }
  };

  const handleVideoDoubleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <VideoPortal>
      {showGlitch && <GlitchBanner><span>New Episode Live Now!</span></GlitchBanner>}
      <ParticleGrid />
      <ScanlineOverlay />
      
      <HeroSection
        title="CRYPTO CROSS FIRE™"
        subtitle="The Most Explosive Crypto Debate Show in the Metaverse"
        bgImage="/assets/kaspa.jpg"
        darkOverlay
        neon
      />
      
      <ContentWrapper>
        <CyberSidebar>
          <h3>Episode Playlist</h3>
          {videos.map((video, index) => (
            <PlaylistItem 
              key={video.id}
              active={activeVideo === index}
              onClick={() => setActiveVideo(index)}
            >
              <strong>Episode {video.id}</strong> - {video.title}
            </PlaylistItem>
          ))}
        </CyberSidebar>

        <VideoHub>
          {videos.map((video, index) => (
            <VideoPod key={video.id} delay={`${index * 0.1}s`}>
              <VideoDisplay
                onClick={() => handleVideoClick(index)}
                onDoubleClick={() => handleVideoDoubleClick(video.rumbleUrl)}
              >
                <iframe
                  ref={el => iframeRefs.current[index] = el}
                  src={video.embedUrl}
                  frameBorder="0"
                  allowFullScreen
                  title={video.title}
                />
              </VideoDisplay>
              <VideoInfo>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <p><small>Aired: {video.date}</small></p>
              </VideoInfo>
            </VideoPod>
          ))}
        </VideoHub>
      </ContentWrapper>
      
      <Footer />
    </VideoPortal>
  );
};

export default Videos;