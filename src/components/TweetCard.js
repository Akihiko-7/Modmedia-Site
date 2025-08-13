import React from 'react';
import styled from 'styled-components';

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

  .video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    .video-wrapper {
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    }

    .video-title {
      color: var(--primary);
      font-size: 1.4rem;
      font-weight: 600;
      text-align: center;
      margin: 12px 0;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .tweet-wrapper {
      .bluesky-embed {
        font-size: 0.85rem;
      }
    }

    .video-container {
      .video-title {
        font-size: 1.2rem;
      }
    }
  }
`;

const TweetCard = ({ videoSrc, videoTitle }) => {
  return (
    <TweetCardContainer className="tweet-card">
      <div className="tweet-wrapper">
        <blockquote
          className="bluesky-embed"
          data-bluesky-uri="at://did:plc:yjxcuolnx4n4bzjdu6aeaoq3/app.bsky.feed.post/3lwawptvkns2h"
          data-bluesky-cid="bafyreiafoo2owbfipbfupmpxyiztqnbjcv4uxxtkdthi4raonxuzo5ipoq"
          data-bluesky-embed-color-mode="system"
        >
          <p lang="en">
            Introducing the Cryptographer&#x27;s EXILE Comic Chapter One, Founder&#x27;s Edition
            O U T  N OW!💥
            Leap into a realm of perilous cryptographic villains and hashgraph-deciphering heroes set 20 years into the future.
            Download for a discounted price while server supplies last. Learn More at www.MODMEDIANOW.COM<br /><br />
            <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwawptvkns2h?ref_src=embed">[image or embed]</a>
          </p>
          &mdash; ModMedia Network™ (
          <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3?ref_src=embed">@modmedianow.com</a>
          ) <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwawptvkns2h?ref_src=embed">August 12, 2025 at 8:58 PM</a>
        </blockquote>
        <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>
      </div>
      <div className="tweet-wrapper">
        <blockquote
          className="bluesky-embed"
          data-bluesky-uri="at://did:plc:yjxcuolnx4n4bzjdu6aeaoq3/app.bsky.feed.post/3lwawfe6o722h"
          data-bluesky-cid="bafyreielvm46xwiybma2fhtldv3j2z3zkfd2vbccqg42kedka4je76qua4"
          data-bluesky-embed-color-mode="system"
        >
          <p lang="en">
            Announcing Kasparty.com
            Curious about cryptocurrencies?
            Whether you&#x27;re a seasoned Web3 pro or just dipping wetting your beak into crypto ecosystems, Kasparty is a great resource!
            100% nonprofit page to quickly learn about Crypto terms and facts, as well as a web browser &amp; more, FREE! Kasparty.com<br /><br />
            <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwawfe6o722h?ref_src=embed">[image or embed]</a>
          </p>
          &mdash; ModMedia Network™ (
          <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3?ref_src=embed">@modmedianow.com</a>
          ) <a href="https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/3lwawfe6o722h?ref_src=embed">August 12, 2025 at 8:52 PM</a>
        </blockquote>
        <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>
      </div>
      <div className="video-container">
        <h3 className="video-title">{videoTitle}</h3>
        <div className="video-wrapper">
          <iframe src={videoSrc} allowFullScreen></iframe>
        </div>
      </div>
    </TweetCardContainer>
  );
};

export default TweetCard;