import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ArticleContainer = styled.div`
  background: var(--dark);
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArticleContent = styled.div`
  max-width: 800px;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 32px;
  box-shadow: var(--shadow);
  color: var(--light);

  h2 {
    font-size: 2.2rem;
    color: var(--primary);
    margin-bottom: 24px;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 16px;
    color: #e0e0e0;
  }

  strong {
    color: var(--light);
  }
`;

const BackButton = styled.button`
  background: var(--primary);
  color: var(--dark);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 24px;
  transition: background 0.3s ease;

  &:hover {
    background: var(--accent);
  }
`;

const articles = {
  'free-speech': {
    title: 'Free Thought in the Big Tech World',
    content: (
      <>
        <p>How many things have you read lately that are utterly full of corporate agendas?

Or bureaucratic agendas?</p>
        <p>How many in the last week, the last few days?
Is it even possible for you to figure this out accurately with how Big Tech operates to manipulate you?

Why has free speech and free press been dying? Why do supposedly free citizens allow corrupt bullies to run things while we outnumber them Ten Million to one?

How many times has a work boss personally put you down, making you feel like crap..? Or dumped you, fired you, laid you off because of their own incompetence to save their face?
To write a selfish narrative in their head of their own superiority while the hardworking man suffers unnecessarily.</p>
        <p>This has happened to me, with little to no fault of my own. In fact, it happened to all of America in 2008 when politicians (bribed with stock options) colluded with the banks to give banks billions in the USA's citizens hard earned income while the economy crashed, destroying citizens' livelihoods. Why?
The Banks' slimy tactic of issuing immoral usury, high risk mortgage loans to millions of people imploded, and the banks then failed when those mortgages failed, ruining the economy.

Why then, when the banks fail, do they get millions of USA taxpayer dollars delivered from our Government while years later rural Americans die with no substantial aid from natural disasters or opiate crisis?

Why would self respecting citizens in the free world, or any country for that matter, put up with this?

The good news is: We have new tools to push back.

 Self-custodying cryptocurrencies so the government can't seize our hard earnings... Phones to communicate and organize against corrupt practices and to coordinate building local, fair cryptocurrency economies in our neighborhoods.

ModMedia Network is here to stay. We will fight the good, common man and woman's fight, even when they may be too scared at first to begin doing so themselves. We will be that spark for them to think free and start standing up for themselves against tyranny of all kinds.

Perhaps one day, ModMedia will progress to be a massive, most decentralized journalism and entertainment platform in the world.
This is our dream, and from there we will leave a legacy of healthy change and hard conversations that lead to more liberty and freedom increasing tools for people both in the USA and worldwide.

Thanks for reading. We emphasize quality over quantity here at ModMedia, and we're just getting started.

Charles Sprain
Founder of ModMedia Enterprises</p>
      </>
    ),
  },
  'bear-market-2026': {
    title: 'Timing the Top: Knowing When to Sell Before the 2026 Bear Market - By Mike Reyes, @USBlockchainCap on X',
    content: (
      <>
        <p><strong>As speculation about a potential cryptocurrency bear market in 2026 intensifies, prudent investors are taking steps to protect their gains. Timing the market top is a complex but essential skill to avoid losses during a downturn. By adopting disciplined strategies and staying informed, you can safeguard your portfolio and position yourself for long-term success.</strong></p>
        <p>The M2 money supply, a measure of money circulating in an economy, often leads Bitcoin's price movements by approximately three months. With signs pointing to a potential market peak, you have a narrow window—roughly three months—to adjust your portfolio. Monitor M2 data through reliable economic sources, such as central bank reports or financial platforms, to anticipate shifts and make informed decisions.</p>
        <p>The Fear and Greed Index is a valuable tool for assessing market sentiment. When it surges above 90, indicating extreme greed, the market may be overheated and poised for a correction. At this point, consider dollar-cost averaging (DCA) out of your positions to lock in profits gradually, reducing the risk of holding through a sudden crash when euphoria turns to panic.</p>
        <p>A cornerstone of smart investing is protecting your initial capital. If you invest $1,000 in a project and its value doubles, withdraw your original $1,000 to eliminate risk on your starting stake. This approach allows you to let profits ride while ensuring you never lose your initial investment, providing peace of mind in volatile markets.</p>
        <p>While tales of turning $100 into $1 million fuel crypto dreams, such outcomes are rare. Instead, aim for achievable gains—$100 can realistically grow to $5,000, or with favorable conditions, $10,000 over a market cycle. Staying grounded helps you avoid chasing unrealistic goals that lead to poor decisions.</p>
        <p>Never invest money you cannot afford to lose. Ensure your bills, rent, and essential expenses are covered before allocating funds to crypto. Avoid FOMO-driven decisions when the market is surging, as these often lead to losses. Financial security should always come first.</p>
        <p>Staring at trading screens for hours can take a toll. Prioritize sufficient sleep, nutritious food, and regular exercise to stay sharp. A healthy mind and body enhance your decision-making, helping you navigate markets more effectively.</p>
        <p>Building significant wealth in crypto typically takes two market cycles (4–6 years), not one. Millionaires are rarely made in a single cycle. Patience and discipline outweigh get-rich-quick schemes, so focus on consistent, long-term strategies.</p>
        <p>If a project's fundamentals deteriorate, cut your losses. Pivot to assets with stronger prospects, such as those with robust technology or strategic partnerships. Clinging to failing investments out of loyalty rarely pays off.</p>
        <p>While technology is important, marketing and partnerships often drive crypto prices. Projects like Ripple thrive due to strategic alliances. Even novelty tokens, like those tied to gimmicks such as Unicorn Fart Dust, gain traction through partnerships with platforms like Ledger or MoonPay.</p>
        <p>Follow Warren Buffett's advice: be fearful when others are greedy, and greedy when others are fearful. When you're tempted to buy at the market peak, consider selling. When panic sets in, look for buying opportunities. This contrarian approach can help you stay ahead of the crowd.</p>
        <p>If timing the market feels overwhelming, remember that time in the market often outperforms trying to predict tops and bottoms. Consistent, long-term investment typically yields better results than sporadic attempts to outsmart the market.</p>
        <p>Navigating crypto is tough alone. Join online communities to share insights and strategies. As the saying goes, "If you want to go fast, go alone; if you want to go far, go together." A strong community can help you stay informed and resilient.</p>
        <p>By staying disciplined, realistic, and strategic, you can position yourself to weather the 2026 bear market and come out stronger. Take Action Now: Join Stand with Crypto to support policies that empower digital wealth creation. Visit America's Future for economic trends shaping tomorrow. Subscribe to Modmedia for exclusive market updates.</p>
      </>
    ),
  },
};

const ArticlePage = ({ articleId }) => {
  const navigate = useNavigate();
  const article = articles[articleId] || { title: 'Article Not Found', content: <p>Article not found.</p> };

  return (
    <ArticleContainer>
      <BackButton onClick={() => navigate('/')}>Back to Home</BackButton>
      <ArticleContent>
        <h2>{article.title}</h2>
        {article.content}
      </ArticleContent>
    </ArticleContainer>
  );
};

export default ArticlePage;