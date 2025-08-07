import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  opacity: 1;
  transform: translateX(0);
  transition: all 0.7s ease;
`;

const GalleryHeader = styled.h2`
  font-size: 1.875rem;
  color: #e0e7ff;
  margin-bottom: 1.75rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.75rem;
`;

const GalleryItem = styled.div`
  background: #2a2a2a;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.375rem 0.75rem rgba(0, 212, 255, 0.3);
  }

  a {
    display: block;
  }

  img {
    width: 100%;
    max-width: 250px;
    height: auto;
    object-fit: contain;
    border-radius: 0.25rem;
  }

  p {
    padding: 1rem 0;
    margin: 0;
    color: #b8c2d8;
    font-size: 0.875rem;
    text-align: center;
  }
`;

const ImageGallery = () => {
  const images = [
    { src: '/assets/snowden-update1.png', caption: 'Follow Snowden on X', link: 'https://x.com/RescueSnowden/status/1836319095651995655' },
    { src: '/assets/snowdn-update2.png', caption: 'ModMedia Updates on X', link: 'https://x.com/RescueSnowden/status/1858585449394208903' },
    { src: '/assets/snowden_update3.png', caption: 'Edward Snowden on his Exile:', info: '"People look at me now and they think I\'m this crazy guy, I\'m this extremist or whatever. Some people have a misconception that [I] set out to burn down the NSA," he says. "But that\'s not what this was about. In many ways, 2013 wasn\'t about surveillance at all. What it was about was a violation of the Constitution.' },
  ];

  return (
    <GalleryContainer>
      <GalleryHeader>Explore More</GalleryHeader>
      <GalleryGrid>
        {images.map((image, index) => (
          <GalleryItem key={index}>
            {image.link ? (
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <img src={image.src} alt={image.caption} />
              </a>
            ) : (
              <img src={image.src} alt={image.caption} />
            )}
            <p>{image.caption}</p>
            {image.info && <p>{image.info}</p>}
          </GalleryItem>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default ImageGallery;