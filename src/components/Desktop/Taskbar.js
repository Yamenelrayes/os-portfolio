import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindows, FaWifi, FaVolumeUp, FaBatteryThreeQuarters, FaRegBell } from 'react-icons/fa';

const TaskbarContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: rgba(25, 25, 25, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  
  @media (max-width: 768px) {
    height: 42px;
    padding: 0 8px;
  }
`;

const StartButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 6px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const TaskbarItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  flex: 1;
  overflow-x: auto;
  height: 100%;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TaskbarItem = styled(motion.div)`
  height: 34px;
  padding: 0 12px;
  margin-right: 6px;
  display: flex;
  align-items: center;
  background-color: ${({ active, minimized }) => 
    active ? 'rgba(255, 255, 255, 0.2)' : 
    minimized ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 13px;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
  opacity: ${({ minimized }) => minimized ? 0.7 : 1};
  white-space: nowrap;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ active }) => active ? '#4caf50' : 'transparent'};
    transform: ${({ active }) => active ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    background-color: ${({ active }) => active ? '#4caf50' : 'rgba(255, 255, 255, 0.5)'};
  }
  
  @media (max-width: 768px) {
    height: 30px;
    padding: 0 8px;
    margin-right: 4px;
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TimeWidget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 12px;
  padding: 0 15px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 0 5px;
  }
  
  @media (max-width: 480px) {
    padding: 0 3px;
  }
`;

const StatusIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  padding: 0 15px;
  
  @media (max-width: 768px) {
    gap: 10px;
    padding: 0 5px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    padding: 0 3px;
  }
`;

const StatusIcon = styled(motion.div)`
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

// Animation variants
const taskbarVariants = {
  hidden: { y: 48 },
  visible: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.3
    }
  }
};

const taskbarItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: custom => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05 + 0.3,
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }),
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 10,
    transition: { duration: 0.2 }
  }
};

const Taskbar = ({ windows, activeWindow, onWindowSelect }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <TaskbarContainer
      variants={taskbarVariants}
      initial="hidden"
      animate="visible"
    >
      <StartButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setStartMenuOpen(!startMenuOpen)}
      >
        <FaWindows size={18} color="#4caf50" />
      </StartButton>
      
      <TaskbarItems>
        <AnimatePresence>
          {windows.map((window, index) => (
            <TaskbarItem
              key={window.id}
              active={activeWindow === window.id}
              minimized={window.minimized}
              onClick={() => onWindowSelect(window.id)}
              variants={taskbarItemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileTap={{ scale: 0.95 }}
            >
              {window.title}
            </TaskbarItem>
          ))}
        </AnimatePresence>
      </TaskbarItems>
      
      <StatusIcons>
        <StatusIcon whileHover={{ scale: 1.2 }}>
          <FaRegBell size={14} />
        </StatusIcon>
        <StatusIcon whileHover={{ scale: 1.2 }}>
          <FaWifi size={14} />
        </StatusIcon>
        <StatusIcon whileHover={{ scale: 1.2 }}>
          <FaVolumeUp size={14} />
        </StatusIcon>
        <StatusIcon whileHover={{ scale: 1.2 }}>
          <FaBatteryThreeQuarters size={14} />
        </StatusIcon>
      </StatusIcons>
      
      <TimeWidget>
        <div>{formatTime(currentTime)}</div>
        <div>{formatDate(currentTime)}</div>
      </TimeWidget>
    </TaskbarContainer>
  );
};

export default Taskbar; 