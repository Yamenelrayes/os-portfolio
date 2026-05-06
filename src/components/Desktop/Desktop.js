import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import WindowManager from '../Windows/WindowManager';
import Taskbar from './Taskbar';

// Import icons
import { 
  FaFolder, FaBrain, FaUser, FaTrophy, FaEnvelope, 
  FaFileAlt, FaTerminal, FaGithub, FaLinkedin, 
  FaCloudSun, FaCode, FaClock
} from 'react-icons/fa';

const DesktopContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(135deg, #0d1a31 0%, #1e2942 50%, #252b4a 100%);
`;

const DynamicBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, 
    rgba(30, 40, 80, 0) 0%, 
    rgba(20, 30, 60, 0.4) 70%, 
    rgba(15, 20, 50, 0.8) 100%);
  z-index: -1;
  mix-blend-mode: multiply;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: #fff;
  border-radius: 50%;
  opacity: ${props => props.opacity};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: twinkle ${props => props.duration}s ease-in-out infinite;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size / 2}px rgba(255, 255, 255, 0.5);
  filter: blur(${props => props.blur || 0}px);
  transform: translateZ(0);

  @keyframes twinkle {
    0%, 100% {
      opacity: ${props => props.opacity};
      transform: scale(1);
    }
    50% {
      opacity: ${props => props.opacity * 0.3};
      transform: scale(0.8);
    }
  }
`;

const ShootingStar = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: ${props => props.size * 3}px;
  height: ${props => props.size / 2}px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50px;
  transform: rotate(${props => props.angle}deg);
  animation: shooting ${props => props.duration}s linear ${props => props.delay}s infinite;
  opacity: 0;
  z-index: -1;
  
  @keyframes shooting {
    0% {
      opacity: 0;
      transform: translateX(0) rotate(${props => props.angle}deg);
    }
    5% {
      opacity: 1;
    }
    20% {
      transform: translateX(${props => props.distance}px) rotate(${props => props.angle}deg);
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translateX(${props => props.distance}px) rotate(${props => props.angle}deg);
    }
  }
`;

const Nebula = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    ${props => props.color1} 0%,
    ${props => props.color2} 30%,
    transparent 70%
  );
  opacity: 0.15;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  filter: blur(${props => props.blur}px);
  transform: scale(${props => props.scale});
  animation: pulse ${props => props.duration}s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(${props => props.scale});
    }
    50% {
      transform: scale(${props => props.scale * 1.1});
    }
  }
`;

const IconsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  grid-gap: 20px;
  margin-top: 10px;
  z-index: 1;
  padding: 20px;
`;

const WidgetsContainer = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 5;
`;

const Widget = styled(motion.div)`
  width: 200px;
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 15px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
`;

const WidgetTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClockWidget = styled.div`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const WeatherWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Temperature = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const WeatherIcon = styled.div`
  font-size: 30px;
  color: #ffc107;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const QuickLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

// Floating animation for desktop icons
const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  })
};

const widgetVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: i => ({ 
    opacity: 1, 
    x: 0,
    transition: {
      delay: 0.3 + (i * 0.1),
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  })
};

const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      blur: Math.random() < 0.3 ? Math.random() * 2 : 0
    });
  }
  return stars;
};

const generateNebulae = (count) => {
  const colors = [
    ['rgba(100, 0, 255, 0.3)', 'rgba(50, 0, 100, 0.1)'],
    ['rgba(0, 100, 200, 0.25)', 'rgba(0, 50, 150, 0.1)'],
    ['rgba(200, 50, 100, 0.2)', 'rgba(150, 0, 50, 0.1)'],
    ['rgba(0, 200, 150, 0.2)', 'rgba(0, 100, 80, 0.1)'],
    ['rgba(255, 100, 0, 0.2)', 'rgba(200, 50, 0, 0.1)']
  ];
  
  const nebulae = [];
  for (let i = 0; i < count; i++) {
    const colorPair = colors[Math.floor(Math.random() * colors.length)];
    nebulae.push({
      id: i,
      size: Math.random() * 400 + 300,
      top: Math.random() * 100,
      left: Math.random() * 100,
      color1: colorPair[0],
      color2: colorPair[1],
      blur: Math.random() * 60 + 40,
      scale: Math.random() * 1.5 + 1,
      duration: Math.random() * 30 + 20
    });
  }
  return nebulae;
};

const generateShootingStars = (count) => {
  const shootingStars = [];
  for (let i = 0; i < count; i++) {
    shootingStars.push({
      id: i,
      size: Math.random() * 4 + 2,
      top: Math.random() * 50,
      left: Math.random() * 30,
      angle: Math.random() * 60 - 30,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 15,
      distance: Math.random() * 500 + 300
    });
  }
  return shootingStars;
};

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars] = useState(() => generateStars(150));
  const [nebulae] = useState(() => generateNebulae(5));
  const [shootingStars] = useState(() => generateShootingStars(5));
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const ripplesRef = useRef([]);

  const desktopIcons = [
    { id: 'projects', title: 'Projects', icon: <FaFolder size={32} color="#ffc107" /> },
    { id: 'skills', title: 'Skills', icon: <FaBrain size={32} color="#4caf50" /> },
    { id: 'about', title: 'About Me', icon: <FaUser size={32} color="#2196f3" /> },
    { id: 'achievements', title: 'Achievements', icon: <FaTrophy size={32} color="#ff9800" /> },
    { id: 'contact', title: 'Contact', icon: <FaEnvelope size={32} color="#e91e63" /> },
    { id: 'cv', title: 'CV', icon: <FaFileAlt size={32} color="#9c27b0" /> },
    { id: 'terminal', title: 'Terminal', icon: <FaTerminal size={32} color="#ffffff" /> }
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize and animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const particleCount = 100;
    particlesRef.current = [];
    ripplesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        proximity: [],
        parallaxFactor: Math.random() * 0.08 + 0.02 // Different parallax factor for each particle
      });
    }

    // Handle mouse clicks to create ripples
    const handleClick = (e) => {
      // Don't create ripples if clicking on widgets or icons
      if (e.target.closest('.widget') || e.target.closest('.desktop-icon')) {
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add a new ripple
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 100 + 50,
        lineWidth: Math.random() * 2 + 1,
        opacity: 0.8,
        speed: Math.random() * 2 + 2,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, 0.8)`
      });
    };

    canvas.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Apply parallax effect based on mouse position
        const parallaxX = mousePosition.x * p.parallaxFactor;
        const parallaxY = mousePosition.y * p.parallaxFactor;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw particle with parallax offset
        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Reset proximity array
        p.proximity = [];
      }
      
      // Check proximity and draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        const p1ParallaxX = mousePosition.x * p1.parallaxFactor;
        const p1ParallaxY = mousePosition.y * p1.parallaxFactor;
        
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const p2ParallaxX = mousePosition.x * p2.parallaxFactor;
          const p2ParallaxY = mousePosition.y * p2.parallaxFactor;
          
          const dx = (p1.x + p1ParallaxX) - (p2.x + p2ParallaxX);
          const dy = (p1.y + p1ParallaxY) - (p2.y + p2ParallaxY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            p1.proximity.push(j);
            
            // Draw line with parallax
            ctx.beginPath();
            ctx.moveTo(p1.x + p1ParallaxX, p1.y + p1ParallaxY);
            ctx.lineTo(p2.x + p2ParallaxX, p2.y + p2ParallaxY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Update and draw ripples
      for (let i = 0; i < ripplesRef.current.length; i++) {
        const ripple = ripplesRef.current[i];
        
        // Update ripple
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.01;
        
        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color.replace('0.8', ripple.opacity);
        ctx.lineWidth = ripple.lineWidth;
        ctx.stroke();
        
        // Remove ripple if it's too big or faded
        if (ripple.radius > ripple.maxRadius || ripple.opacity <= 0) {
          ripplesRef.current.splice(i, 1);
          i--;
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
    };
  }, [mousePosition]);

  const handleIconClick = (iconId) => {
    // Check if window is already open
    const windowExists = openWindows.find(window => window.id === iconId);
    
    if (!windowExists) {
      const newWindow = {
        id: iconId,
        title: desktopIcons.find(icon => icon.id === iconId).title,
        minimized: false,
        zIndex: openWindows.length + 1,
        position: {
          x: 100 + (openWindows.length * 30),
          y: 100 + (openWindows.length * 30)
        },
        size: {
          width: 1000,
          height: 650
        }
      };
      
      setOpenWindows(prev => [...prev, newWindow]);
      setActiveWindow(iconId);
    } else {
      // If minimized, restore it
      if (windowExists.minimized) {
        setOpenWindows(prev => 
          prev.map(window => 
            window.id === iconId ? { ...window, minimized: false } : window
          )
        );
      }
      // Set as active window
      setActiveWindow(iconId);
      // Bring to front
      const maxZ = Math.max(...openWindows.map(w => w.zIndex));
      setOpenWindows(prev =>
        prev.map(window =>
          window.id === iconId 
            ? { ...window, minimized: false, zIndex: maxZ + 1 } 
            : window
        )
      );
    }
  };

  const handleWindowClose = (windowId) => {
    setOpenWindows(prev => prev.filter(window => window.id !== windowId));
    
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(window => window.id !== windowId);
      // Set the most recently interacted window as active, or null if none left
      setActiveWindow(remainingWindows.length > 0 
        ? remainingWindows.sort((a, b) => b.zIndex - a.zIndex)[0].id 
        : null
      );
    }
  };

  const handleWindowMinimize = (windowId) => {
    setOpenWindows(prev => 
      prev.map(window => 
        window.id === windowId ? { ...window, minimized: true } : window
      )
    );
    
    if (activeWindow === windowId) {
      const visibleWindows = openWindows
        .filter(window => window.id !== windowId && !window.minimized)
        .sort((a, b) => b.zIndex - a.zIndex);
      
      setActiveWindow(visibleWindows.length > 0 ? visibleWindows[0].id : null);
    }
  };

  const handleWindowFocus = (windowId) => {
    if (activeWindow !== windowId) {
      setActiveWindow(windowId);
      // Update z-indices to bring the clicked window to the front
      const maxZ = Math.max(...openWindows.map(w => w.zIndex));
      setOpenWindows(prev =>
        prev.map(window =>
          window.id === windowId ? { ...window, zIndex: maxZ + 1 } : window
        )
      );
    }
  };

  const handleWindowResize = (windowId, newSize) => {
    setOpenWindows(prev =>
      prev.map(window =>
        window.id === windowId ? { ...window, size: newSize } : window
      )
    );
  };

  const handleWindowMove = (windowId, newPosition) => {
    setOpenWindows(prev =>
      prev.map(window =>
        window.id === windowId ? { ...window, position: newPosition } : window
      )
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <DesktopContainer id="desktop-container">
      <DynamicBackground>
        <BackgroundCanvas ref={canvasRef} />
        <GradientOverlay />
        {nebulae.map(nebula => (
          <Nebula
            key={`nebula-${nebula.id}`}
            size={nebula.size}
            top={nebula.top}
            left={nebula.left}
            color1={nebula.color1}
            color2={nebula.color2}
            blur={nebula.blur}
            scale={nebula.scale}
            duration={nebula.duration}
          />
        ))}
        {stars.map(star => (
          <Star
            key={`star-${star.id}`}
            size={star.size}
            opacity={star.opacity}
            top={star.top}
            left={star.left}
            duration={star.duration}
            blur={star.blur}
          />
        ))}
        {shootingStars.map(star => (
          <ShootingStar
            key={`shooting-${star.id}`}
            size={star.size}
            top={star.top}
            left={star.left}
            angle={star.angle}
            duration={star.duration}
            delay={star.delay}
            distance={star.distance}
          />
        ))}
      </DynamicBackground>
      
      <IconsContainer
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
        }}
        initial="hidden"
        animate="visible"
      >
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={icon.id}
            custom={index}
            variants={iconVariants}
          >
            <DesktopIcon
              title={icon.title}
              icon={icon.icon}
              onClick={() => handleIconClick(icon.id)}
            />
          </motion.div>
        ))}
      </IconsContainer>
      
      <WidgetsContainer>
        <Widget
          className="widget"
          variants={widgetVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          whileHover={{ scale: 1.03 }}
        >
          <WidgetTitle><FaClock /> Time & Date</WidgetTitle>
          <ClockWidget>
            {formatTime(currentTime)}
            <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>
              {formatDate(currentTime)}
            </div>
          </ClockWidget>
        </Widget>
        
        <Widget
          className="widget"
          variants={widgetVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          whileHover={{ scale: 1.03 }}
        >
          <WidgetTitle><FaCloudSun /> Weather</WidgetTitle>
          <WeatherWidget>
            <Temperature>24°C</Temperature>
            <WeatherIcon>
              <FaCloudSun />
            </WeatherIcon>
          </WeatherWidget>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
            Sunny with clouds
          </div>
        </Widget>
        
        <Widget
          className="widget"
          variants={widgetVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          whileHover={{ scale: 1.03 }}
        >
          <WidgetTitle><FaCode /> Quick Links</WidgetTitle>
          <QuickLinks>
            <QuickLink 
              href="https://github.com/Yamenelrayes" 
              target="_blank"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </QuickLink>
            <QuickLink 
              href="https://www.linkedin.com/in/yamenelrayes" 
              target="_blank"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </QuickLink>
          </QuickLinks>
        </Widget>
      </WidgetsContainer>
      
      <AnimatePresence>
        <WindowManager
          windows={openWindows}
          activeWindow={activeWindow}
          onClose={handleWindowClose}
          onMinimize={handleWindowMinimize}
          onFocus={handleWindowFocus}
          onResize={handleWindowResize}
          onMove={handleWindowMove}
        />
      </AnimatePresence>
      
      <Taskbar
        windows={openWindows}
        activeWindow={activeWindow}
        onWindowSelect={handleIconClick}
      />
    </DesktopContainer>
  );
};

export default Desktop; 