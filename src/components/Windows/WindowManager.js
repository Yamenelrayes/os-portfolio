import React from 'react';
import Window from './Window';
import ProjectsWindow from './ProjectsWindow';
import SkillsWindow from './SkillsWindow';
import AboutWindow from './AboutWindow';
import AchievementsWindow from './AchievementsWindow';
import ContactWindow from './ContactWindow';
import CVWindow from './CVWindow';
import TerminalWindow from './TerminalWindow';

const WindowManager = ({
  windows,
  activeWindow,
  onClose,
  onMinimize,
  onFocus,
  onResize,
  onMove
}) => {
  // Function to render the appropriate content for each window type
  const renderWindowContent = (windowId) => {
    switch (windowId) {
      case 'projects':
        return <ProjectsWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'about':
        return <AboutWindow />;
      case 'achievements':
        return <AchievementsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'cv':
        return <CVWindow />;
      case 'terminal':
        return <TerminalWindow />;
      default:
        return <div>Window content not found</div>;
    }
  };

  return (
    <>
      {windows.map(window => (
        !window.minimized && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            zIndex={window.zIndex}
            position={window.position}
            size={window.size}
            isActive={activeWindow === window.id}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onFocus={() => onFocus(window.id)}
            onResize={(newSize) => onResize(window.id, newSize)}
            onMove={(newPosition) => onMove(window.id, newPosition)}
          >
            {renderWindowContent(window.id)}
          </Window>
        )
      ))}
    </>
  );
};

export default WindowManager; 