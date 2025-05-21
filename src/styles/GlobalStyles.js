import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Mono', monospace;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #121212;
    color: #f1f1f1;
  }

  /* Add custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  ::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }

  button, a {
    cursor: pointer;
  }
`; 