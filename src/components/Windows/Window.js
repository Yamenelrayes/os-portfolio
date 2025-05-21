import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { FaRegWindowMaximize, FaRegWindowMinimize, FaTimes, FaWindowRestore } from 'react-icons/fa';

const WindowContainer = styled(motion.div)`
  background-color: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: ${({ isActive }) => 
    isActive 
      ? '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 10px rgba(80, 80, 80, 0.3), inset 0 0 0 1px rgba(140, 140, 140, 0.4)'
      : '0 5px 20px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(90, 90, 90, 0.2)'
  };
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  transition: all 0.2s ease;
  transform-origin: center center;
  border: ${({ isActive }) => isActive ? '1px solid rgba(100, 100, 100, 0.3)' : '1px solid rgba(60, 60, 60, 0.2)'};
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
  will-change: transform, opacity;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
`;

const TitleBar = styled.div`
  background: ${({ isActive }) => 
    isActive 
      ? 'linear-gradient(to right, rgba(60, 60, 60, 0.9), rgba(40, 40, 40, 0.9))'
      : 'linear-gradient(to right, rgba(50, 50, 50, 0.7), rgba(35, 35, 35, 0.7))'
  };
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: ${({ isActive }) => isActive ? '#ffffff' : '#bbbbbb'};
  font-size: 14px;
  justify-content: space-between;
  cursor: move;
  border-bottom: 1px solid rgba(20, 20, 20, 0.3);
  user-select: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.div`
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #aaaaaa;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: ${({ close }) => close ? 'rgba(232, 17, 35, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
    color: ${({ close }) => close ? 'white' : '#ffffff'};
    transform: ${({ close }) => close ? 'scale(1.1)' : 'none'};
  }
  
  &:focus {
    outline: none;
  }
`;

const ContentArea = styled(motion.div)`
  flex: 1;
  overflow: auto;
  position: relative;
  height: calc(100% - 38px);
  background-color: rgba(38, 38, 38, 0.7);
  will-change: opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(40, 40, 40, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(120, 120, 120, 0.6);
  }
`;

const WindowResizeHandles = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  display: ${({ isActive }) => isActive ? 'block' : 'none'};
  opacity: 0.4;
  
  &::before, &::after {
    content: '';
    position: absolute;
    right: 4px;
    bottom: 4px;
    background-color: #aaa;
  }
  
  &::before {
    width: 10px;
    height: 1px;
    bottom: 6px;
  }
  
  &::after {
    width: 1px;
    height: 10px;
    right: 6px;
  }
`;

// Animation variants - simplified for Safari compatibility
const windowVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "tween", // Using tween instead of spring for Safari
      duration: 0.3,
      ease: "easeOut",
      delay: 0.1, // Increased delay for Safari
      when: "beforeChildren" // Ensure parent animation completes first
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.9,
    transition: {
      ease: "easeInOut",
      duration: 0.2
    }
  }
};

const Window = ({
  id,
  title,
  zIndex,
  position,
  size,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  onResize,
  onMove,
  children
}) => {
  const windowRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size });
  
  const handleDragStop = (e, d) => {
    onMove({ x: d.x, y: d.y });
  };
  
  const handleResizeStop = (e, direction, ref, delta, position) => {
    onResize({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height)
    });
    onMove(position);
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPreMaximizeState({ position, size });
      const desktop = document.getElementById('desktop-container');
      
      if (desktop) {
        const desktopRect = desktop.getBoundingClientRect();
        
        // Full screen with just minimal padding
        onResize({
          width: desktopRect.width - 10,
          height: desktopRect.height - 60
        });
        onMove({ x: 5, y: 5 });
      } else {
        // Fallback if desktop element is not found
        onResize({
          width: window.innerWidth - 10,
          height: window.innerHeight - 60
        });
        onMove({ x: 5, y: 5 });
      }
    } else {
      onResize(preMaximizeState.size);
      onMove(preMaximizeState.position);
    }
    
    setIsMaximized(!isMaximized);
  };
  
  return (
    <Rnd
      style={{ 
        zIndex: isMaximized ? 100 : zIndex,
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)', // Add Safari-specific transform
      }}
      default={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height
      }}
      position={{ x: position.x, y: position.y }}
      size={{ width: size.width, height: size.height }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      onDragStart={onFocus}
      onDragStop={handleDragStop}
      onResizeStart={onFocus}
      onResizeStop={handleResizeStop}
      dragHandleClassName="dragHandle"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      ref={windowRef}
    >
      <WindowContainer 
        isActive={isActive} 
        onClick={onFocus}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={windowVariants}
      >
        <TitleBar isActive={isActive} className="dragHandle">
          <Title>{title}</Title>
          <Controls>
            <ControlButton onClick={onMinimize}>
              <FaRegWindowMinimize size={11} />
            </ControlButton>
            <ControlButton onClick={toggleMaximize}>
              {isMaximized ? <FaWindowRestore size={11} /> : <FaRegWindowMaximize size={11} />}
            </ControlButton>
            <ControlButton close onClick={onClose}>
              <FaTimes size={11} />
            </ControlButton>
          </Controls>
        </TitleBar>
        <ContentArea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2, ease: "easeOut" }}
        >
          {children}
          <WindowResizeHandles isActive={isActive && !isMaximized} />
        </ContentArea>
      </WindowContainer>
    </Rnd>
  );
};

export default Window; 