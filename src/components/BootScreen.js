import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-3px, 3px);
  }
  40% {
    transform: translate(-3px, -3px);
  }
  60% {
    transform: translate(3px, 3px);
  }
  80% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0);
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const matrixRain = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const BootScreenContainer = styled.div`
  background-color: #000;
  color: #0f0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', monospace;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease;
  overflow: hidden;
`;

const MatrixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const MatrixColumn = styled.div`
  position: absolute;
  top: -100%;
  color: rgba(0, 255, 0, 0.4);
  font-size: ${props => props.size || '14px'};
  animation: ${matrixRain} ${props => props.duration || '10'}s linear infinite;
  animation-delay: ${props => props.delay || '0'}s;
  left: ${props => props.position || '0'}%;
  transform: translateY(0);
  white-space: nowrap;
  user-select: none;
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(
    to bottom,
    rgba(15, 255, 15, 0),
    rgba(15, 255, 15, 0.3),
    rgba(15, 255, 15, 0)
  );
  z-index: 1001;
  opacity: 0.5;
  animation: ${scanline} 4s linear infinite;
  pointer-events: none;
`;

const Glitch = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
  position: relative;
  letter-spacing: 5px;

  &:after {
    content: 'YAMEN OS';
    position: absolute;
    top: 0;
    left: 0;
    color: rgba(255, 0, 100, 0.4);
    z-index: -1;
  }

  &:before {
    content: 'YAMEN OS';
    position: absolute;
    top: 0;
    left: 0;
    color: rgba(0, 200, 255, 0.4);
    z-index: -2;
  }
`;

const BootMessage = styled.div`
  font-size: 1.2rem;
  text-align: left;
  width: 80%;
  max-width: 600px;
  border: 1px solid rgba(15, 255, 15, 0.3);
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 15px rgba(15, 255, 15, 0.3);
`;

const Line = styled(motion.div)`
  margin: 0.5rem 0;
  display: flex;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.6rem;
  height: 1.2rem;
  background-color: #0f0;
  margin-left: 4px;
  animation: ${blink} 1s infinite;
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  max-width: 600px;
  height: 10px;
  background-color: #111;
  border-radius: 5px;
  margin-top: 20px;
  overflow: hidden;
  border: 1px solid rgba(15, 255, 15, 0.5);
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #0f0;
  box-shadow: 0 0 10px #0f0;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

// Generate a string of random matrix-like characters
const generateMatrixString = (length) => {
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const BootScreen = () => {
  const [bootSteps, setBootSteps] = useState([]);
  const [progress, setProgress] = useState(0);
  const [matrixColumns, setMatrixColumns] = useState([]);
  
  // Generate matrix columns
  useEffect(() => {
    const columns = [];
    for (let i = 0; i < 20; i++) {
      columns.push({
        id: i,
        content: generateMatrixString(100),
        position: Math.random() * 100,
        size: `${Math.random() * 10 + 10}px`,
        duration: Math.random() * 15 + 5,
        delay: Math.random() * 5
      });
    }
    setMatrixColumns(columns);
  }, []);
  
  const bootMessages = useMemo(() => [
    'Yamen OS v1.0 - Advanced Portfolio System',
    'Initializing system kernel...',
    'Loading hardware drivers...',
    'Mounting file systems...',
    'Initializing UI components...',
    'Loading user profile...',
    'Establishing network connections...',
    'Checking system integrity...',
    'Running security protocols...',
    'Preparing desktop environment...',
    'System ready'
  ], []);

  useEffect(() => {
    const timeouts = [];
    const totalSteps = bootMessages.length;
    
    bootMessages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setBootSteps(prev => [...prev, message]);
        setProgress(((index + 1) / totalSteps) * 100);
      }, index * 400);
      
      timeouts.push(timeout);
    });
    
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [bootMessages]);
  
  const glitchVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100
      }
    }
  };

  return (
    <BootScreenContainer>
      <MatrixBackground>
        {matrixColumns.map(column => (
          <MatrixColumn 
            key={column.id}
            position={column.position} 
            size={column.size}
            duration={column.duration}
            delay={column.delay}
          >
            {column.content}
          </MatrixColumn>
        ))}
      </MatrixBackground>
      <ScanLine />
      <Glitch 
        initial="hidden"
        animate="visible"
        variants={glitchVariants}
        onAnimationComplete={() => {
          const glitchInterval = setInterval(() => {
            const element = document.querySelector("h1");
            if (element) {
              element.style.animation = `${glitch} 0.2s linear`;
              setTimeout(() => {
                element.style.animation = "none";
              }, 200);
            }
          }, 3000);
          return () => clearInterval(glitchInterval);
        }}
      >
        YAMEN OS
      </Glitch>
      <BootMessage>
        {bootSteps.map((step, index) => (
          <Line 
            key={index}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            custom={index}
          >
            {step}
            {index === bootSteps.length - 1 && bootSteps.length === bootMessages.length && <Cursor />}
          </Line>
        ))}
      </BootMessage>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
    </BootScreenContainer>
  );
};

export default BootScreen; 