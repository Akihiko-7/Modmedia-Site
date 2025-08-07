import React, { useState } from 'react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease;
`;

const TeamHeader = styled.h2`
  font-size: 1.875rem;
  color: #e0e7ff;
  margin-bottom: 1.75rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
`;

const TeamMember = styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
    max-width: 200px;
    max-height: 200px;
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
      max-width: 32rem;
      max-height: 32rem;
      z-index: 2000;
      border-radius: 0;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }
  }

  h3 {
    font-size: 1.125rem;
    color: #e0e7ff;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: #b8c2d8;
    font-size: 0.875rem;
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

const Team = () => {
  const [expanded, setExpanded] = useState(null);

  const team = [
    { img: '/assets/team1.png', name: 'Charles Sprain', role: 'Technical Systems Admin & Main DEV' },
    { img: '/assets/team3.png', name: 'Afolabi Idris', role: 'Co-Directors of Development' },
    { img: '/assets/aki.png', name: 'Samuel Ameh', role: 'ModMedia Labs Chief Partner of Operations' },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <TeamContainer>
      <TeamHeader>Team</TeamHeader>
      <TeamGrid>
        {team.map((member, index) => (
          <TeamMember key={index}>
            <img
              src={member.img}
              alt={member.name}
              className={expanded === index ? 'expanded' : ''}
              onClick={() => toggleExpand(index)}
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            {expanded === index && (
              <>
                <CloseButton onClick={() => setExpanded(null)}>×</CloseButton>
                <Overlay onClick={() => setExpanded(null)} />
              </>
            )}
          </TeamMember>
        ))}
      </TeamGrid>
    </TeamContainer>
  );
};

export default Team;