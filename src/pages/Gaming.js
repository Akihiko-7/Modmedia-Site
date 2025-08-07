import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';

// Particle system component
const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 150;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
        this.alpha = Math.random() * 0.6 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Connect particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance/100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }
      
      requestAnimationFrame(animate);
    }

    init();
    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <ParticlesCanvas ref={canvasRef} />;
};

const ParticlesCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

// Keyframe animations
const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
  }
  50% {
    text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
  }
`;

const scanline = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100vh;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(0, 212, 255, 0.8); }
  100% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
`;

const twinkle = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.3; }
  100% { opacity: 0.1; }
`;

const glitchEffect = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-5px, 5px); }
  40% { transform: translate(-5px, -5px); }
  60% { transform: translate(5px, 5px); }
  80% { transform: translate(5px, -5px); }
  100% { transform: translate(0); }
`;

// Styled components
const GamingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a2a, #1a1a4a, #2a2a6a);
  overflow-x: hidden;
  position: relative;
  color: white;
  font-family: 'Rajdhani', 'Arial', sans-serif;
  padding: 20px;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(rgba(18, 16, 16, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(18, 16, 16, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(10, 10, 42, 0.1) 30%,
      rgba(10, 10, 42, 0.7) 100%
    );
    pointer-events: none;
    z-index: -1;
  }
`;

const Scanlines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 100% 8px;
  animation: ${scanline} 4s linear infinite;
  pointer-events: none;
  z-index: 0;
`;

const Header = styled.div`
  text-align: center;
  padding: 30px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  margin-bottom: 40px;
  animation: ${pulse} 2s infinite, ${glitchEffect} 5s infinite;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, 
      #ff00ff, #00d4ff, #ff00ff, #00d4ff, #ff00ff);
    background-size: 400%;
    z-index: -1;
    filter: blur(20px);
    opacity: 0.5;
    animation: gradientBG 15s ease infinite;
  }
  
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  h1 {
    font-size: 4rem;
    color: #ff00ff;
    text-shadow: 0 0 15px #ff00ff, 0 0 30px #00d4ff;
    margin: 0;
    letter-spacing: 3px;
    font-weight: 700;
    animation: ${neonGlow} 1.5s ease-in-out infinite alternate;
    position: relative;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.8rem;
    color: #ffffff;
    text-shadow: 0 0 10px #ffffff;
    margin-top: 15px;
    letter-spacing: 1px;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const GameCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  animation: ${float} 6s infinite ease-in-out;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
    
    &::before {
      opacity: 0.8;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      rgba(255, 0, 255, 0.1), 
      rgba(0, 212, 255, 0.1));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  h3 {
    font-size: 1.8rem;
    color: #00ff88;
    text-shadow: 0 0 10px #00ff88;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.3);
    padding-bottom: 10px;
  }
  
  p {
    font-size: 1.1rem;
    color: #e0e7ff;
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

const GameLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background: linear-gradient(45deg, #ff00ff, #00d4ff);
  color: #000;
  text-decoration: none;
  font-size: 1.5rem;
  border-radius: 25px;
  box-shadow: 0 0 15px #00d4ff;
  transition: all 0.3s ease;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #00d4ff, #ff00ff);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 25px #ff00ff;
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 12px 25px;
  }
`;

const ComingSoon = styled.div`
  text-align: center;
  margin-top: 60px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  h2 {
    font-size: 3rem;
    color: #00ff88;
    text-shadow: 0 0 15px #00ff88;
    margin-bottom: 20px;
    animation: ${neonGlow} 2s ease-in-out infinite alternate;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.3rem;
    color: #e0e7ff;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto 30px;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
    z-index: -1;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Gaming = () => {
  return (
    <GamingContainer>
      <Particles />
      <Scanlines />
      
      <Header>
        <h1>MODMEDIA GAMING</h1>
        <p>[Under Construction]</p>
      </Header>
      
      <GameGrid>
        <GameCard>
          <h3>Pokémon Showdown</h3>
          <p>Battle with any Pokémon in this competitive online simulator. No grinding, just pure strategy!</p>
          <GameLink href="https://play.pokemonshowdown.com/" target="_blank" rel="noopener noreferrer">
            Play Now
          </GameLink>
        </GameCard>
        
        <GameCard style={{ animationDelay: '1s' }}>
          <h3>Retro Arcade</h3>
          <p>Coming soon - a collection of classic arcade games with a modern twist!</p>
          <GameLink as="div" style={{ background: '#333', boxShadow: '0 0 15px #555', cursor: 'not-allowed' }}>
            Coming Soon
          </GameLink>
        </GameCard>
        
        <GameCard style={{ animationDelay: '2s' }}>
          <h3>Cryptographer's Exile</h3>
          <p>Our debut indie game - an epic adventure through cyberpunk landscapes!</p>
          <GameLink as="div" style={{ background: '#333', boxShadow: '0 0 15px #555', cursor: 'not-allowed' }}>
            In Development
          </GameLink>
        </GameCard>
      </GameGrid>
      
      <ComingSoon>
        <h2>EXCITING UPDATES COMING!</h2>
        <p>
          ModMedia Labs is working on our debut Indie video game that will revolutionize 
          the gaming experience. Expect cutting-edge graphics, immersive storytelling, 
          and gameplay that pushes boundaries. Join our newsletter to stay updated!
        </p>
        <GameLink as="button" style={{ background: 'linear-gradient(45deg, #ff9900, #ff3399)' }}>
          Join Waitlist
        </GameLink>
      </ComingSoon>
      
      <Footer />
    </GamingContainer>
  );
};

export default Gaming;