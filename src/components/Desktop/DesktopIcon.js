import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const IconContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  cursor: pointer;
  padding: 15px;
  border-radius: 16px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(0px);
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  
  &:active::before {
    background-color: rgba(255, 255, 255, 0.15);
    transform: scale(0.95);
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  margin-bottom: 12px;
  border-radius: 14px;
  background: ${props => props.bgGradient || 'rgba(255, 255, 255, 0.1)'};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  ${IconContainer}:hover &::after {
    left: 100%;
  }
`;

const IconTitle = styled(motion.span)`
  color: white;
  font-size: 14px;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 110px;
  background: linear-gradient(to right, #fff, #ccc, #fff);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const Notification = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #f44336;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const iconVariants = {
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 10
    }
  }
};

const titleVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const notificationVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 10
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const getIconGradient = (iconName) => {
  const gradients = {
    'Projects': 'linear-gradient(135deg, #ffc107, #ff9800)',
    'Skills': 'linear-gradient(135deg, #4caf50, #2e7d32)',
    'About Me': 'linear-gradient(135deg, #2196f3, #1565c0)',
    'Achievements': 'linear-gradient(135deg, #ff9800, #f57c00)',
    'Contact': 'linear-gradient(135deg, #e91e63, #c2185b)',
    'CV': 'linear-gradient(135deg, #9c27b0, #7b1fa2)',
    'Terminal': 'linear-gradient(135deg, #424242, #212121)'
  };
  
  return gradients[iconName] || 'linear-gradient(135deg, #757575, #424242)';
};

const DesktopIcon = ({ icon, title, onClick, hasNotification }) => {
  const [isHovered, setIsHovered] = useState(false);
  const bgGradient = getIconGradient(title);
  
  // Scale up the icon size
  const IconComponent = React.cloneElement(icon, { 
    size: icon.props.size * 1.5, 
    color: icon.props.color 
  });
  
  return (
    <IconContainer
      className="desktop-icon"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover="hover"
      whileTap="tap"
      variants={iconVariants}
    >
      <IconWrapper 
        bgGradient={bgGradient}
        animate={{
          boxShadow: isHovered 
            ? '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)' 
            : '0 5px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        {IconComponent}
        {hasNotification && (
          <Notification 
            variants={notificationVariants}
            initial="initial"
            animate="animate"
            whileHover="pulse"
          >
            !
          </Notification>
        )}
      </IconWrapper>
      <IconTitle variants={titleVariants}>
        {title}
      </IconTitle>
    </IconContainer>
  );
};

export default DesktopIcon; 