import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

const SupportSection = styled.section`
  padding: 40px 5%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SupportTitle = styled.h2`
  font-size: 2.5rem;
  color: #00d4ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
`;

const SupportText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CryptoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 600px;
`;

const CryptoItem = styled.li`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 15px 0;
  word-break: break-all;

  strong {
    color: #00d4ff;
    margin-right: 10px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  font-size: 1rem;
  color: #00d4ff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff00ff;
  }
`;

const Support = () => {
  return (
    <>
      <SupportSection>
        <SupportTitle>Support Our Work</SupportTitle>
        <SupportText>
          Thank you for considering supporting this truly independent media network! Contributions will fund our research, publishing & SNOWDN Crypto project.
        </SupportText>
        <CryptoList>
          <CryptoItem>
            <strong>kaspa:</strong> qyp60g7z60kk77vrjm2muz5knlex9uxlp88r2sznws130mxxrxwp2cglt
          </CryptoItem>
          <CryptoItem>
            <strong>eth:</strong> 0x6cA49D6A735fF9C297d2DB614B2fB1218aC66F80
          </CryptoItem>
          <CryptoItem>
            <strong>sol:</strong> 7S3vZYYF3f3Y6YTVv6p3v2W7e4VKV9L6x7W3xM3G6B9k
          </CryptoItem>
          <CryptoItem>
            <strong>doge:</strong> D8z7Y8y8Z7Y8Z7Y8Z7Y8Z7Y8Z7Y8Z7Y8Z7Y8Z
          </CryptoItem>
        </CryptoList>
      </SupportSection>
      <Footer>
        <div>
          <p>Copyright 2025 ModMedia™ / ModMedia Network™ / MMEDIA™ ALL Rights Reserved</p>
          <SocialLinks>
            <SocialLink href="https://x.com/ModMediaNow" target="_blank">
              X
            </SocialLink>
            <SocialLink href="https://rumble.com/user/ModMediaNow" target="_blank">
              Rumble
            </SocialLink>
            <SocialLink href="https://bsky.app/profile/modmedianow.com" target="_blank">
              BlueSky
            </SocialLink>
          </SocialLinks>
        </div>
      </Footer>
    </>
  );
};

export default Support;