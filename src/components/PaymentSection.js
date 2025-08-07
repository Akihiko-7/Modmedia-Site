import React, { useState } from 'react';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  background: linear-gradient(145deg, #161a21 0%, #1e242e 100%);
  border-radius: var(--border-radius);
  padding: 32px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
    z-index: -1;
  }
`;

const Title = styled.h3`
  color: var(--lighter);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  text-align: center;
  letter-spacing: -0.01em;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border-radius: var(--border-radius);
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  appearance: none;
  transition: var(--transition);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  option {
    background: #000000;
    color: #ffffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: var(--border-radius);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--darker);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 212, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);

  &:hover {
    box-shadow: 0 6px 16px rgba(255, 111, 97, 0.4);
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 8px;
  text-align: center;
`;

const PaymentSection = () => {
  const [service, setService] = useState({
    value: 'subscribe-card',
    price: 5,
    name: 'Advertiser or Fan Subscribe - $5',
  });
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { value: 'website', price: 200, name: 'Website Building - Basic Package - $200' },
    { value: 'ad-design', price: 10, name: 'ModMedia Designs Your Ad & Publishes - $10' },
    { value: 'subscribe-card', price: 5, name: 'Advertiser or Fan Subscribe - $5' },
  ];

  const handleServiceChange = (e) => {
    const selected = services.find((s) => s.value === e.target.value);
    setService(selected);
    setPaymentMethod('crypto');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setError('');
  };

  const handleProceed = async () => {
    setIsLoading(true);
    setError('');

    localStorage.setItem(
      'paymentDetails',
      JSON.stringify({
        service: service.value,
        serviceName: service.name,
        amount: service.price,
        method: paymentMethod,
      })
    );
    window.location.href = '/checkout';
    setIsLoading(false);
  };

  return (
    <PaymentContainer>
      <Title>Join ModMedia Premium</Title>

      <Select
        onChange={handleServiceChange}
        value={service.value}
      >
        {services.map((s) => (
          <option key={s.value} value={s.value}>
            {s.name}
          </option>
        ))}
      </Select>

      <Select
        onChange={handlePaymentMethodChange}
        value={paymentMethod}
      >
        <option value="crypto">Crypto Payment</option>
        <option value="stripe">Credit/Debit Card</option>
      </Select>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button onClick={handleProceed} disabled={isLoading}>
        {isLoading
          ? 'Processing...'
          : paymentMethod === 'crypto'
          ? 'Proceed with Crypto'
          : `Pay with Card`}
      </Button>

      <SecondaryButton onClick={() => (window.location.href = 'https://sub.modmedianow.com')}>
        Premium Subscriber Portal
      </SecondaryButton>
    </PaymentContainer>
  );
};

export default PaymentSection;