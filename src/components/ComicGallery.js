import React, { useState } from 'react';
import styled from 'styled-components';

const ComicContainer = styled.div`
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease;
`;

const ComicHeader = styled.h2`
  font-size: 1.875rem;
  color: #e0e7ff;
  margin-bottom: 1.75rem;
`;

const ComicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
`;

const ComicItem = styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: opacity 0.3s ease;
    display: block;
    margin: 0 auto;

    &:hover {
      opacity: 0.8;
    }

    &.expanded {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 36rem;
      max-height: 36rem;
      z-index: 2000;
      border-radius: 0;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }
  }

  p {
    color: #b8c2d8;
    font-size: 0.875rem;
    text-align: center;
    margin-top: 0.5rem;
  }
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

const NoteText = styled.p`
  font-style: italic;
  color: #b8c2d8;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  text-align: center;
`;

const ComicGallery = () => {
  const [expanded, setExpanded] = useState(null);

  const comics = [
    { img: '/assets/comic1.png', caption: 'Snowden’s Escape – Part 1' },
    { img: '/assets/comic2.png', caption: 'Snowden’s Roadmap' },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ComicContainer>
      <ComicHeader>Comic Space</ComicHeader>
      <ComicGrid>
        {comics.map((comic, index) => (
          <ComicItem key={index}>
            <img
              src={comic.img}
              alt={comic.caption}
              className={expanded === index ? 'expanded' : ''}
              onClick={() => toggleExpand(index)}
            />
            <p>{comic.caption}</p>
            {expanded === index && (
              <>
                <CloseButton onClick={() => setExpanded(null)}>×</CloseButton>
                <Overlay onClick={() => setExpanded(null)} />
              </>
            )}
          </ComicItem>
        ))}
      </ComicGrid>
      <NoteText>Submit your $Snowdn-related artwork to be featured here!</NoteText>
      <NoteText>HODLers of Multiple Months become Stakeholders in a US Media Company- (ModMedia™), are able to join ModMedia Meetings on X.com, & Get Exclusive Comic Content Drops.</NoteText>
    </ComicContainer>
  );
};

export default ComicGallery;