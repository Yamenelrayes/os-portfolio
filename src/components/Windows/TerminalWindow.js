import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import aboutMe from '../../data/aboutMe';

const Container = styled.div`
  height: 100%;
  background-color: #0c0c0c;
  font-family: 'Consolas', 'Monaco', monospace;
  color: #ddd;
  display: flex;
  flex-direction: column;
`;

const TerminalHeader = styled.div`
  background-color: #333;
  padding: 5px 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #444;
`;

const TerminalTitle = styled.div`
  color: #fff;
`;

const TerminalInfo = styled.div`
  color: #888;
`;

const TerminalBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  font-size: 14px;
`;

const InputLine = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
`;

const Prompt = styled.div`
  color: #4caf50;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  flex: 1;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  
  &:focus {
    outline: none;
  }
`;

const CommandOutput = styled.div`
  margin-top: 5px;
  color: ${props => props.error ? '#f44336' : '#bbb'};
  padding-left: 20px;
`;

// Snake game styled components
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-family: monospace;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(10, 1fr);
  border: 1px solid #444;
  background-color: #222;
  width: 80%;
  max-width: 400px;
  aspect-ratio: 2 / 1;
`;

const Cell = styled.div`
  background-color: ${props => {
    if (props.isSnake) return '#4caf50';
    if (props.isFood) return '#f44336';
    return 'transparent';
  }};
  border: 1px solid #333;
`;

const GameControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const GameButton = styled.button`
  background-color: #333;
  color: white;
  border: 1px solid #555;
  padding: 5px 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #444;
  }
`;

const GameScore = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #4caf50;
`;

const GameOver = styled.div`
  color: #f44336;
  font-size: 18px;
  margin-top: 10px;
`;

const TerminalWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const [playingSnake, setPlayingSnake] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 5 }]);
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const gameLoopRef = useRef(null);
  
  // Command output configurations
  const commands = {
    help: `Available commands:
  help         - Show this help message
  about        - Display information about me
  skills       - List my technical skills
  projects     - View my projects
  get cv       - Download my CV
  clear        - Clear the terminal
  play snake   - Play a simple snake game
  contact      - Show contact information`,
    
    about: `${aboutMe.name} - ${aboutMe.title}
${aboutMe.summary}

Education:
${aboutMe.education.map(edu => `  - ${edu.degree} at ${edu.institution} (${edu.year})`).join('\n')}`,
    
    skills: `Technical Skills:
  - Languages: Dart, JavaScript, Python, C++, R
  - Frameworks: Flutter, React, Node.js, Express, MongoDB
  - Tools: ML Kit, Supabase, Firebase, Azure DevOps
  - Concepts: CI/CD, Agile, TTS, REST APIs
  - Design: Figma, Photoshop, Video Editing`,
    
    projects: `My Projects:
  1. FitPose (2023) - ML-powered fitness app
  2. SpendWise (2022) - Financial management application
  3. Battleships (2021) - Online multiplayer game
  4. Blue Snake (2020) - Reimagined Snake game
  5. Sahl (2022) - AI chatbot
  6. Chill n Drink (2019) - STEM project`,
    
    contact: `Contact Information:
  Email: ${aboutMe.contact.email}
  Phone: 🇬🇧 ${aboutMe.contact.phone}
         🇪🇬 ${aboutMe.contact.phone2}
  LinkedIn: ${aboutMe.contact.linkedin}
  GitHub: ${aboutMe.contact.github}`,
    
    'get cv': `Downloading CV... 
CV saved to Downloads folder.`,
    
    'play snake': `
🎮 Snake Game
Use arrow keys to control the snake.
Collect food to grow and avoid hitting walls or yourself.

Sorry, the game can't be played directly in this terminal.
Try clicking on the Projects icon to check out my actual games!`
  };
  
  // Run-specific command outputs
  // eslint-disable-next-line no-unused-vars
  const runCommands = {
    fitpose: `Project: FitPose (2023)
=====================
A mobile application that uses ML Kit to analyze pose during workouts, 
providing real-time feedback on form and technique. 
The app tracks progress and provides personalized recommendations.

Technologies: Flutter, Dart, ML Kit, Firebase, TensorFlow Lite`,
    
    spendwise: `Project: SpendWise (2022)
=====================
A financial management application that helps users track expenses, 
create budgets, and gain insights into their spending habits. 
Features include bill reminders, spending analytics, and goal tracking.

Technologies: React Native, Node.js, MongoDB, Express, Supabase`,
    
    battleships: `Project: Battleships (2021)
=====================
A modern implementation of the classic Battleships game with online 
multiplayer capabilities, custom game modes, and a sophisticated 
AI opponent that uses machine learning techniques.

Technologies: JavaScript, HTML5, CSS3, Socket.io, Node.js`
  };
  
  // Set focus to input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    window.addEventListener('click', handleClick);
    
    return () => window.removeEventListener('click', handleClick);
  }, []);
  
  // Scroll to bottom when command history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      navigateHistory(-1);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      navigateHistory(1);
      e.preventDefault();
    }
  };
  
  const navigateHistory = (direction) => {
    if (commandHistory.length === 0) return;
    
    const filteredHistory = commandHistory.filter(item => item.type === 'input');
    
    if (filteredHistory.length === 0) return;
    
    const newIndex = historyIndex + direction;
    
    if (newIndex >= 0 && newIndex < filteredHistory.length) {
      setHistoryIndex(newIndex);
      setInputValue(filteredHistory[filteredHistory.length - 1 - newIndex].content);
    } else if (newIndex < 0) {
      setHistoryIndex(-1);
      setInputValue('');
    }
  };
  
  // Handle keyboard input for snake game
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!playingSnake) return;

      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playingSnake, direction]);

  // Generate food at a position not occupied by snake - wrapped in useCallback to avoid dependency changes
  const generateFood = useCallback((currentSnake = snake) => {
    // Function to check if position is occupied by snake
    const isPositionOccupied = (posX, posY, snakeArray) => {
      return snakeArray.some(segment => segment.x === posX && segment.y === posY);
    };
    
    // Generate random position
    let posX, posY;
    let occupied = true;
    
    // Keep trying until we find an unoccupied position
    while (occupied) {
      posX = Math.floor(Math.random() * 20);
      posY = Math.floor(Math.random() * 10);
      occupied = isPositionOccupied(posX, posY, currentSnake);
    }

    setFood({ x: posX, y: posY });
  }, [snake]);

  // Snake game loop
  useEffect(() => {
    if (!playingSnake || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
          default: break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 10) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        // Add new head to the beginning
        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 1);
          setSpeed(prev => Math.max(50, prev - 5)); // Increase speed
          generateFood(newSnake);
        } else {
          // Remove tail if we didn't eat
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoopRef.current);
  }, [playingSnake, direction, food, gameOver, speed, generateFood]);

  // Reset game state
  const resetGame = () => {
    setSnake([{ x: 10, y: 5 }]);
    setDirection('RIGHT');
    setScore(0);
    setSpeed(200);
    setGameOver(false);
    generateFood([{ x: 10, y: 5 }]);
  };

  // Start snake game
  const startSnakeGame = () => {
    setPlayingSnake(true);
    resetGame();
  };

  // Exit snake game
  const exitSnakeGame = () => {
    setPlayingSnake(false);
    clearInterval(gameLoopRef.current);
  };

  const handleCommand = () => {
    if (inputValue.trim() === '') return;
    
    const command = inputValue.trim().toLowerCase();
    setCommandHistory(prev => [...prev, { type: 'input', content: command }]);
    
    // Process command
    if (command === 'clear') {
      setCommandHistory([]);
    } else if (command === 'get cv') {
      // Trigger CV download
      const link = document.createElement('a');
      link.href = '/yamen-cv.pdf';
      link.download = 'yamen-cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setCommandHistory(prev => [...prev, { type: 'output', content: commands[command] }]);
    } else if (command === 'play snake') {
      startSnakeGame();
      setCommandHistory(prev => [...prev, { type: 'output', content: '🐍 Starting Snake Game...' }]);
    } else if (commands[command]) {
      setCommandHistory(prev => [...prev, { type: 'output', content: commands[command] }]);
    } else {
      setCommandHistory(prev => [...prev, { 
        type: 'output',
        error: true,
        content: `Command not found: ${command}. Type 'help' to see available commands.`
      }]);
    }
    
    setInputValue('');
    setHistoryIndex(-1);
  };
  
  return (
    <Container>
      <TerminalHeader>
        <TerminalTitle>yamen@os: ~/terminal</TerminalTitle>
        <TerminalInfo>YamenOS v1.0</TerminalInfo>
      </TerminalHeader>
      
      <TerminalBody ref={terminalBodyRef}>
        <CommandOutput>
          Welcome to YamenOS Terminal!
          Type 'help' to see available commands.
        </CommandOutput>
        
        {commandHistory.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === 'input' ? (
              <InputLine>
                <Prompt>
                  yamen@os:~$ 
                </Prompt>
                {item.content}
              </InputLine>
            ) : (
              <CommandOutput error={item.error}>
                {item.content}
              </CommandOutput>
            )}
          </React.Fragment>
        ))}
        
        {playingSnake ? (
          <GameContainer>
            <GameScore>Score: {score}</GameScore>
            <GameBoard>
              {Array.from({ length: 10 }, (_, y) =>
                Array.from({ length: 20 }, (_, x) => (
                  <Cell 
                    key={`${x}-${y}`} 
                    isSnake={snake.some(segment => segment.x === x && segment.y === y)}
                    isFood={food.x === x && food.y === y}
                  />
                ))
              ).flat()}
            </GameBoard>
            <GameControls>
              <GameButton onClick={resetGame} disabled={!gameOver}>New Game</GameButton>
              <GameButton onClick={exitSnakeGame}>Exit</GameButton>
            </GameControls>
            {gameOver && <GameOver>Game Over! Final Score: {score}</GameOver>}
            <div style={{ marginTop: '10px', color: '#bbb' }}>
              Use arrow keys to control the snake.
            </div>
          </GameContainer>
        ) : (
          <InputLine>
            <Prompt>
              yamen@os:~$ 
            </Prompt>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck="false"
            />
          </InputLine>
        )}
      </TerminalBody>
    </Container>
  );
};

export default TerminalWindow; 