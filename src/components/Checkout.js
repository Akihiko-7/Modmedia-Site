import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';

const CheckoutContainer = styled.div`
  background: #1a1a3d;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #e0e7ff;
  margin-bottom: 20px;
`;

const CryptoAddresses = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #28a745;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-top: 20px;
  color: ${(props) => (props.error ? '#dc3545' : '#28a745')};
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Checkout = () => {
  const [cryptoType, setCryptoType] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
  const { serviceName = 'Unknown', amount = 0, method = 'crypto' } = paymentDetails;

  const supabase = createClient(
    'https://idtajnzyikcrqqyeephb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdGFqbnp5aWtjcnFxeWVlcGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzExODEsImV4cCI6MjA1NjY0NzE4MX0.dmdooctqxdRcA3DkKXHo8T2jE69AFUpccrgpm7V73lI'
  );

  const cryptoAddresses = {
    ethereum: '0x3636ddB48C5b4B924638c9173764Ad84DaDEC234',
    solana: 'CG9shmbqgZKHTGJdPm25rQ2BQUgR6VKfCuALzAdTgxto',
    kaspa: 'kaspa:qyp60g7z60kk77vrjm2muz5knlex9uxlp88r2sznwsl30mxzrxwp2cglt7f5czn',
  };

  const handleCryptoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('services').insert({
        transaction_hash: transactionHash,
        platform,
        username,
        crypto_address: cryptoAddresses[cryptoType],
        crypto_type: cryptoType,
        service_name: serviceName,
        amount: parseFloat(amount),
        payment_method: 'crypto',
      });

      if (error) throw error;
      setSuccessMessage(true);
      setErrorMessage(false);
      setCryptoType('');
      setTransactionHash('');
      setPlatform('');
      setUsername('');
      localStorage.removeItem('paymentDetails');
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      setErrorMessage(true);
      setSuccessMessage(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://modmedia-site-m5ax.onrender.com/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName,
          amount,
          method: 'stripe',
        }),
      });

      const { id } = await response.json();
      const stripe = await loadStripe('pk_live_51RudSmAJeVnXEtRF8Bqnq8ZTGOJGyKOnBdDRDOkXzGJ1JirezuAFQWA2Z4ZBmMSGOxDaV977qhgKrXa8dCKUNCdg00qv531Sov');
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Stripe payment error:', error);
      setErrorMessage(true);
      setSuccessMessage(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <Title>ModMedia Payment</Title>

      {method === 'crypto' ? (
        <>
          <p>Please send your payment to one of the following cryptocurrency addresses:</p>
          <CryptoAddresses>
            <p><strong>Ethereum:</strong> {cryptoAddresses.ethereum}</p>
            <p><strong>Solana:</strong> {cryptoAddresses.solana}</p>
            <p><strong>Kaspa:</strong> {cryptoAddresses.kaspa}</p>
          </CryptoAddresses>
          <form onSubmit={handleCryptoSubmit}>
            <FormGroup>
              <Label htmlFor="cryptoType">Cryptocurrency Used</Label>
              <Select
                id="cryptoType"
                value={cryptoType}
                onChange={(e) => setCryptoType(e.target.value)}
                required
              >
                <option value="" disabled>Select Cryptocurrency</option>
                <option value="ethereum">Ethereum</option>
                <option value="solana">Solana</option>
                <option value="kaspa">Kaspa</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="transactionHash">Transaction Hash</Label>
              <Input
                id="transactionHash"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="Enter transaction hash"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="platform">Contact Platform</Label>
              <Select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="" disabled>Select Platform</option>
                <option value="X">X</option>
                <option value="Telegram">Telegram</option>
                <option value="Email">Email</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="username">Username/Handle</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit Payment Details'}
            </Button>
          </form>
        </>
      ) : (
        <Button onClick={handleStripePayment} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay with Card (Stripe)'}
        </Button>
      )}

      <Message show={successMessage}>
        Record saved successfully. The team will reach out to you in less than 24 hours. Message the team for urgent needs.
      </Message>
      <Message show={errorMessage} error>
        Error processing payment. Please try again.
      </Message>
    </CheckoutContainer>
  );
};

export default Checkout;