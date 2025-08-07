import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow);
    border-color: rgba(0, 212, 255, 0.2);
  }

  &.enlarged {
    position: fixed;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    z-index: 1000;
    overflow-y: auto;
    background: var(--darker);
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(0, 212, 255, 0.3);

    @media (min-width: 768px) {
      width: 80%;
      height: 80%;
      left: 10%;
      top: 10%;
    }
  }
`;

const MinimizeBar = styled.div`
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  color: var(--darker);
  padding: 12px;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center;
  transition: var(--transition);

  .enlarged & {
    height: 300px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  padding: 16px;
  color: var(--light);
  line-height: 1.4;

  .enlarged & {
    font-size: 1.5rem;
    padding: 20px 16px;
  }
`;

const PreviewContent = styled.p`
  font-size: 0.95rem;
  padding: 0 16px 16px;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const FullContent = styled.div`
  padding: 0 16px 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;

  p {
    margin-bottom: 1.2em;
  }

  strong {
    color: var(--light);
    font-weight: 700;
  }
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--darker);
  border: none;
  padding: 12px;
  margin: 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Card = ({ cardId, imgSrc, title, previewContent, fullContent, link }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleCard = () => {
    setIsEnlarged(!isEnlarged);
    if (!isEnlarged) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const cardContent = (
    <>
      {imgSrc && <CardImage src={imgSrc} alt={title} />}
      <CardTitle>{title}</CardTitle>
      {!isEnlarged && <PreviewContent>{previewContent}</PreviewContent>}
      {isEnlarged && <FullContent>{fullContent}</FullContent>}
      {!isEnlarged && !link && (
        <ReadMoreButton onClick={toggleCard}>Read More</ReadMoreButton>
      )}
    </>
  );

  return (
    <CardContainer className={isEnlarged ? 'enlarged' : ''}>
      {isEnlarged && (
        <MinimizeBar onClick={toggleCard}>Tap to Minimize</MinimizeBar>
      )}
      {link ? (
        <CardLink to={link}>{cardContent}</CardLink>
      ) : (
        cardContent
      )}
    </CardContainer>
  );
};

export default Card;