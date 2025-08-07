import React from 'react';
import styled from 'styled-components';

const TokenomicsContainer = styled.div`
  .tokenomics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .tokenomics-item {
    background: var(--gray);
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    h3 {
      font-size: 1.3rem;
      color: var(--light);
      margin: 0 0 10px;
    }

    p {
      color: #ccc;
      font-size: 0.9rem;
    }
  }
`;

const Tokenomics = () => {
  const items = [
    { title: 'Fair Launch', description: '89.3% Community Mintable, The Rest Reinvested into Project' },
    { title: 'Decentralized', description: 'No VC – DAO & Treasury are #1 & #2 Holders & will eventually total only ~1% total supply; Never Dump, Do Supply Burns' },
    { title: 'Token Details', description: '357,350,420 Coins – Seconds from Snowden Exile to KRC-20 Network Release! Ticker: $SNOWDN | 42 Tokens per 1 KAS Mint (Snowden’s Age in 2025)' },
    { title: 'Allocation', description: '0.5% (1.5M) to Treasury/DAO, 0.5M to Airdrops/Listings, Rest Burned Monthly or Given to T1 Exchange' },
    { title: 'Launch Team', description: 'One-Time Mint Per Team Member Post-Launch Only. Never changes unless documentable majority community demand and vote alters this.' },
  ];

  return (
    <TokenomicsContainer>
      <h2>Tokenomics</h2>
      <div className="tokenomics-grid">
        {items.map(item => (
          <div className="tokenomics-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </TokenomicsContainer>
  );
};

export default Tokenomics;