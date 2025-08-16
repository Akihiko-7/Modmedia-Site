import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import PaymentSection from '../components/PaymentSection';
import Card from '../components/Card';
import VideoSection from '../components/VideoSection';
import Footer from '../components/Footer';
import ContentGrid from '../components/ContentGrid';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const neonGlow = keyframes`
  0% { text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
  50% { text-shadow: 0 0 15px #ff6f61, 0 0 25px #ff6f61; }
  100% { text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(0, 212, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
`;

const scanline = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #0a0a1a 0%, #121228 100%);
    font-family: 'Rajdhani', 'Inter', sans-serif;
    color: #f3f3f3;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    letter-spacing: 0.01em;
    overflow-x: hidden;
  }
  
  :root {
    --primary: #00d4ff;
    --accent: #ff6f61;
    --dark: #0a0a1a;
    --gray: #1a1a3a;
    --light: #f3f3f3;
    --card-bg: rgba(34, 39, 51, 0.8);
    --card-hover: rgba(42, 49, 66, 0.9);
    --shadow: 0 8px 32px 0 rgba(0,0,0,0.36);
    --border-radius: 16px;
  }

  ::selection {
    background: var(--primary);
    color: var(--dark);
  }
`;

const ParticleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: 
    linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
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
  pointer-events: none;
  z-index: 0;
  animation: ${scanline} 4s linear infinite;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
  }

  &::before {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
    top: 20%;
    left: 10%;
    animation: ${float} 8s ease-in-out infinite;
  }

  &::after {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
    bottom: 15%;
    right: 10%;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
`;

const TopSection = styled.section`
  background: linear-gradient(135deg, #121228 0%, #0a0a1a 100%);
  padding: 120px 0 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
  margin-bottom: -5%;

  h1 {
    font-size: 5rem;
    font-weight: 900;
    margin-bottom: 24px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.04em;
    position: relative;
    z-index: 2;
    text-shadow: 0 5px 30px rgba(0, 212, 255, 0.3);
    animation: ${neonGlow} 3s infinite alternate;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 48px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  }

  @media (max-width: 767px) {
    padding: 80px 0 60px 0;
    clip-path: polygon(0 0, 100% 0, 100% 97%, 0 100%);
    
    h1 {
      font-size: 3rem;
    }
    
    p {
      font-size: 1.1rem;
      padding: 0 20px;
    }
  }
`;

const Submissions = styled.section`
  padding: 100px 5% 60px;
  position: relative;
  z-index: 2;
  background: transparent;

  h2 {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 24px;
    color: var(--primary);
    font-weight: 800;
    letter-spacing: 0.03em;
    text-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 3px;
    }
  }

  p.subtitle {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 60px;
    font-size: 1.3rem;
    font-weight: 500;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 767px) {
    padding: 60px 5% 40px;
    
    h2 {
      font-size: 2.2rem;
    }
    
    p.subtitle {
      font-size: 1rem;
      padding: 0 20px;
    }
  }
`;

const FeaturedVideoSection = styled.section`
  padding: 100px 5%;
  background: linear-gradient(to bottom, #121228 0%, #0a0a1a 100%);
  position: relative;
  z-index: 2;
  clip-path: polygon(0 5%, 100% 0, 100% 100%, 0% 100%);
  margin-top: -5%;

  h2 {
    color: var(--accent);
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
    text-align: center;
    letter-spacing: 0.02em;
    text-shadow: 0 5px 20px rgba(255, 111, 97, 0.3);
  }

  @media (max-width: 767px) {
    padding: 60px 5%;
    clip-path: polygon(0 3%, 100% 0, 100% 100%, 0% 100%);
    
    h2 {
      font-size: 2rem;
    }
  }
`;

const GradientDivider = styled.div`
  width: 80%;
  max-width: 1000px;
  height: 4px;
  margin: 80px auto;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  border-radius: 2px;
  opacity: 0.5;
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
    border-radius: 4px;
    opacity: 0.2;
    z-index: -1;
  }

  @media (max-width: 767px) {
    margin: 50px auto;
    width: 70%;
  }
`;

const AnimatedGrid = styled(ContentGrid)`
  & > * {
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    }
  }
`;

const TweetCardContainer = styled.div`
  background: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .tweet-wrapper {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    padding: 16px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    .bluesky-embed {
      width: 100%;
      margin: 0;
      border: none;
      font-size: 0.9rem;
      color: #333;
    }

    p {
      margin: 0 0 12px 0;
      line-height: 1.5;
    }

    a {
      color: var(--primary);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .tweet-wrapper {
      .bluesky-embed {
        font-size: 0.85rem;
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <ParticleBackground />
      <ScanlineOverlay />
      
      <TopSection>
        <FloatingOrbs />
        <h1>MODMEDIA</h1>
        <p>TRUTH IN MEDIA • DECENTRALIZED JOURNALISM • UNFILTERED CONTENT</p>
        <PaymentSection />
      </TopSection>
      
      <Submissions>
        <h2>Latest Submissions</h2>
        <p className="subtitle">Click content to view full submission free of charge</p>
        <AnimatedGrid>
          <TweetCardContainer>
            <div className="tweet-wrapper">
              <blockquote
                className="bluesky-embed"
                data-bluesky-uri="at://did:plc:yjxcuolnx4n4bzjdu6aeaoq3/app.bsky.feed.post/3lwjzven3gk2n"
                data-bluesky-cid="bafyreig2mh6cxvdefchdwvlx3jpva5q6gq7ycn3jgnwqwwvd6stkj76jwi"
                data-bluesky-embed-color-mode="system"
              >
                <p lang="en">
                  NEW ARTICLE OUT NOW!<br/><br/>&quot;Free Thought in the Big Tech World&quot;<br/><br/>Liberate your mind and spirit today from thought-manipulating tendrils of Big Tech.<br/><br/>Our content is human, fresh thought &amp; opinions, not recycled AI junk.<br/><br/>Why wait? Read Free today in the &#x27;Featured Articles&#x27; Section of www.MODMEDIANOW.com!<br/><br/><a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwjzven3gk2n?ref_src=embed">[image or embed]</a>
                </p>
                &mdash; ModMedia Network™ (
                <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3?ref_src=embed">@modmedianow.com</a>
                ) <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwjzven3gk2n?ref_src=embed">August 16, 2025 at 11:49 AM</a>
              </blockquote>
              <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>
            </div>
          </TweetCardContainer>
          <TweetCardContainer>
            <div className="tweet-wrapper">
              <blockquote
                className="bluesky-embed"
                data-bluesky-uri="at://did:plc:yjxcuolnx4n4bzjdu6aeaoq3/app.bsky.feed.post/3lwawptvkns2h"
                data-bluesky-cid="bafyreiafoo2owbfipbfupmpxyiztqnbjcv4uxxtkdthi4raonxuzo5ipoq"
                data-bluesky-embed-color-mode="system"
              >
                <p lang="en">
                  Introducing the Cryptographer&#x27;s EXILE Comic Chapter One, Founder&#x27;s Edition O U T  N OW!💥<br/><br/>Leap into a realm of perilous cryptographic villains and hashgraph-deciphering heroes set 20 years into the future.<br/><br/>Download for a discounted price while server supplies last. Learn More at www.MODMEDIANOW.COM<br/><br/><a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwawptvkns2h?ref_src=embed">[image or embed]</a>
                </p>
                &mdash; ModMedia Network™ (
                <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3?ref_src=embed">@modmedianow.com</a>
                ) <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwawptvkns2h?ref_src=embed">August 12, 2025 at 8:58 PM</a>
              </blockquote>
              <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>
            </div>
          </TweetCardContainer>
        </AnimatedGrid>
      </Submissions>
      
      <GradientDivider />
      
      <Submissions>
        <h2>Featured Articles</h2>
        <p className="subtitle">Click an article to read the full content</p>
        <AnimatedGrid>
          <Card
            cardId="free-speech"
            imgSrc="/assets/Free-speech.jpg"
            title="Free Thought in the Big Tech World."
            previewContent="How many things have you read lately that are utterly full of corporate agendas?"
            link="/free-speech"
          />
          <Card
            cardId="bear-market-2026"
            title="Timing the Top: Knowing When to Sell Before the 2026 Bear Market - By Mike Reyes, @USBlockchainCap on X"
            previewContent="As speculation about a potential cryptocurrency bear market in 2026 grows, savvy investors are taking proactive steps to protect their gains."
            link="/bear-market-2026"
          />
          <Card
            cardId="kaspa"
            imgSrc="/assets/kaspa.jpg"
            title="Kaspa - The Future of Economy?"
            previewContent="What would you do with $650 million in gold?"
            link="/kaspa-future-economy"
          />
        </AnimatedGrid>
      </Submissions>
      
      <GradientDivider />
      
      <FeaturedVideoSection>
        <VideoSection
          src="https://player.vimeo.com/video/1044232074?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          title="Snowden 12 Yr. Exile- �️Snowden Crypto in Sidebar"
        />
      </FeaturedVideoSection>
      
      <Footer />
    </>
  );
};

export default Home;