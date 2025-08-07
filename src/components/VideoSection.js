import React from 'react';
import styled from 'styled-components';

const VideoSectionContainer = styled.section`
  padding: 40px 20px;
  background: var(--gray);
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: var(--light);
  }
`;

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }
`;

const VideoSection = ({ src, title }) => {
  return (
    <VideoSectionContainer>
      <h2>Featured Video</h2>
      <VideoContainer>
        <iframe title={title} src={src} allowFullScreen />
      </VideoContainer>
    </VideoSectionContainer>
  );
};

export default VideoSection;