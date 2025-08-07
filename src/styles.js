import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #6e45e2;
    --primary-dark: #4a2dbf;
    --secondary: #88d3ce;
    --dark: #121212;
    --darker: #0a0a0a;
    --light: #f5f5f5;
    --gray: #2a2a2a;
    --light-gray: #3a3a3a;
    --accent: #ff6b6b;
  }

  body {
    background-color: var(--dark);
    color: var(--light);
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;