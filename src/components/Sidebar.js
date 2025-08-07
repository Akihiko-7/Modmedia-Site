import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background: var(--dark);
  width: 180px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: left 0.3s ease;
  overflow-y: auto;

  @media (max-width: 768px) {
    left: ${({ isOpen }) => (isOpen ? '0' : '-180px')};
  }
`;

const Logo = styled.div`
  h2 {
    color: var(--light);
    font-size: 1.5rem;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gray);
    text-align: center;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 8px 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -15px;
      top: 0;
      height: 100%;
      width: 3px;
      background: var(--primary);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  a {
    color: #bdbdbd;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    display: block;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      color: var(--light);
      background: var(--card-hover);
      transform: translateX(5px);
    }

    &.active {
      color: var(--dark);
      background: var(--primary);
    }

    i {
      margin-right: 8px;
      width: 20px;
      text-align: center;
    }
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <SidebarContainer isOpen={isOpen} className="sidebar">
      <Logo>
        <h2>ModMedia Network™</h2>
      </Logo>
      <Nav>
        <ul>
          <li><NavLink to="/" onClick={toggleSidebar} end>Home</NavLink></li>
          <li><NavLink to="/gaming" onClick={toggleSidebar}>Gaming</NavLink></li>
          <li><NavLink to="/snowden" onClick={toggleSidebar}>Snowden Crypto</NavLink></li>
          <li><NavLink to="/videos" onClick={toggleSidebar}>Crypto Cross Fire</NavLink></li>
          <li><NavLink to="/kaspa-future-economy" onClick={toggleSidebar}>Kaspa Future</NavLink></li>
          <li><NavLink to="/snowden-nfts" onClick={toggleSidebar}>Snowden NFTs</NavLink></li>
          <li><NavLink to="/free-speech" onClick={toggleSidebar}>Free Speech</NavLink></li>
          <li><NavLink to="/bear-market-2026" onClick={toggleSidebar}>Bear Market 2026</NavLink></li>
          <li><NavLink to="/support" onClick={toggleSidebar}>Support</NavLink></li>
          <li><NavLink to="/analytics" onClick={toggleSidebar}><i className="fas fa-chart-pie"></i>Analytics</NavLink></li>
          <li><a href="https://www.kasparty.com" target="_blank" rel="noopener noreferrer">Kasparty Resources</a></li>
        </ul>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;