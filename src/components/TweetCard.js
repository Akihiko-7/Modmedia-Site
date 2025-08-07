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

const TweetCard = ({ uri, cid, content, author, timestamp, videoSrc, videoTitle }) => {
  return (
    <TweetCardContainer className="tweet-card">
      <div className="tweet-wrapper">
        <blockquote
          className="bluesky-embed"
          data-bluesky-uri={uri}
          data-bluesky-cid={cid}
          data-bluesky-embed-color-mode="system"
        >
          <p lang="en">
            {content}
            <br />
            <a
              href={`https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/${uri
                .split('/')
                .pop()}?ref_src=embed`}
            >
              [image or embed]
            </a>
          </p>
          &mdash; {author} (
          <a
            href={`https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3?ref_src=embed`}
          >
            @modmedianow.com
          </a>
          ){' '}
          <a
            href={`https://bsky.app/profile/did:plc:yjxcuolnx4n4bzjdu6aeaoq3/post/${uri
              .split('/')
              .pop()}?ref_src=embed`}
          >
            {timestamp}
          </a>
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