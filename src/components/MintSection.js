import React, { useState } from 'react';
import styled from 'styled-components';

const MintContainer = styled.div`
  padding: 1.25rem;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.7s ease;
`;

const MintHeader = styled.h2`
  font-size: 1.875rem;
  color: #e0e7ff;
  margin-bottom: 1.75rem;
  position: relative;
  padding-bottom: 1rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 6rem;
    height: 0.125rem;
    background: #00d4ff;
  }
`;

const MintInput = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  background: #2a2a2a;
  color: #e0e7ff;
  width: 100%;
  border: none;
  font-family: 'Courier New', monospace;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid #ff00ff;
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
  }
`;

const MintButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00d4ff);
  color: #000;
  border: none;
  padding: 0.9375rem;
  border-radius: 0.3125rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  font-family: 'Courier New', monospace;

  &:hover {
    transform: translateY(-0.1875rem);
    box-shadow: 0 0.3125rem 0.9375rem rgba(0, 212, 255, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #2a2a2a;
  padding: 1.25rem;
  border-radius: 0.5rem;
  text-align: center;

  p {
    color: #e0e7ff;
    margin-bottom: 1.25rem;
    font-size: 1rem;
  }
`;

const ModalButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00d4ff);
  color: #000;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 0.25rem;
  margin: 0.5rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  font-weight: bold;

  &.cancel {
    background: linear-gradient(45deg, #ff6f61, #ff3b3b);
  }
`;

const MintSection = () => {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleMint = () => {
    if (!amount || amount <= 0) {
      setModalMessage('Please enter a valid amount.');
      setShowModal(true);
      return;
    }
    setModalMessage(`Minting ${amount} $SNOWDN... Proceed?`);
    setShowModal(true);
  };

  const handleProceed = () => {
    setModalMessage('Minting successful!');
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <MintContainer>
      <MintHeader>Mint $SNOWDN</MintHeader>
      <MintInput
        type="number"
        min="1"
        placeholder="Enter $SNOWDN amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <MintButton onClick={handleMint}>Mint $SNOWDN Now</MintButton>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>{modalMessage}</p>
            <ModalButton onClick={handleProceed}>Proceed</ModalButton>
            <ModalButton className="cancel" onClick={() => setShowModal(false)}>Cancel</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </MintContainer>
  );
};

export default MintSection;