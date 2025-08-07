import React from 'react';
import styled from 'styled-components';

const HamburgerButton = styled.button`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1100;
  background: var(--primary);
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    width: 24px;
    height: 3px;
    background: var(--dark);
    margin: 5px 0;
    transition: all 0.3s ease;

    ${({ isOpen }) =>
      isOpen &&
      `
      &:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
      }
    `}
  }
`;

const Hamburger = ({ toggleSidebar, isOpen }) => {
  return (
    <HamburgerButton onClick={toggleSidebar} isOpen={isOpen}>
      <span></span>
      <span></span>
      <span></span>
    </HamburgerButton>
  );
};

export default Hamburger;