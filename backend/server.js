const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51QFZOuGwmgelXEBYRwZiLscg2503JsPD88bcYGusLpz7zgyJvuZxgLxe5bq23pX493eQmOSpQU1EUgSPB2r8AH2t00070dR4Jd');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { serviceName, amount, method } = req.body;

  if (method === 'stripe') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: serviceName,
              },
              unit_amount: amount * 100, // Stripe expects amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://modmedia-site-eight.vercel.app/success', 
        cancel_url: 'https://modmedia-site-eight.vercel.app/cancel', 
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  } else if (method === 'paypal') {
    // Handle PayPal if needed
    res.status(400).json({ error: 'PayPal not implemented' });
  } else {
    res.status(400).json({ error: 'Invalid payment method' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));