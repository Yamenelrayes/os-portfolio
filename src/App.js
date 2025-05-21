import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop/Desktop';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #121212;
  position: relative;
`;

function App() {
  const [isBooting, setIsBooting] = useState(true);
  
  useEffect(() => {
    // Simulate boot sequence for 3 seconds
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 3000);
    
    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <AppContainer>
      <GlobalStyles />
      {isBooting ? <BootScreen /> : <Desktop />}
    </AppContainer>
  );
}

export default App;
