import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--dark);
  padding: 16px 0;
  text-align: center;
  border-top: 1px solid #333;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;

    p {
      margin: 0 0 12px 0;
      color: #bdbdbd;
      font-size: 0.85rem;
      font-weight: 400;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 16px;

      a {
        display: inline-block;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 12px 0;

    .footer-content {
      p {
        font-size: 0.75rem;
      }

      .social-links {
        gap: 12px;

        img {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        <p>Copyright 2025 ModMedia™ / ModMedia Enterprises™ / ModMedia Network™ / ModMedia Labs™ / MMEDIA™ ALL Rights Reserved</p>
        <div className="social-links">
          <a href="https://rumble.com/user/ModMediaNow" target="_blank" rel="noopener noreferrer">
            <img src="/assets/rumble.png" alt="Rumble Logo" />
          </a>
          <a href="https://bsky.app/profile/modmedianow.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/bluesky.jpeg" alt="Blue Sky" />
          </a>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;