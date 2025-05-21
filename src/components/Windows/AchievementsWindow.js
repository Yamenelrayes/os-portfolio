import React from 'react';
import styled from 'styled-components';
import achievements from '../../data/achievements';
import { FaTrophy, FaCode, FaCertificate, FaMedal, FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AchievementCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  background-image: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Year = styled.span`
  font-size: 14px;
  color: #aaa;
  font-weight: normal;
`;

const Organization = styled.div`
  font-size: 14px;
  color: #4caf50;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #ddd;
  line-height: 1.5;
`;

// Function to get the appropriate icon
const getAchievementIcon = (iconType) => {
  switch (iconType) {
    case 'trophy':
      return <FaTrophy />;
    case 'code':
      return <FaCode />;
    case 'certificate':
      return <FaCertificate />;
    case 'medal':
      return <FaMedal />;
    case 'star':
      return <FaStar />;
    default:
      return <FaTrophy />;
  }
};

const AchievementsWindow = () => {
  return (
    <Container>
      <AchievementsList>
        {achievements.map(achievement => (
          <AchievementCard key={achievement.id}>
            <IconContainer>
              {getAchievementIcon(achievement.icon)}
            </IconContainer>
            <Content>
              <Title>
                {achievement.title}
                <Year>{achievement.year}</Year>
              </Title>
              <Organization>{achievement.organization}</Organization>
              <Description>{achievement.description}</Description>
            </Content>
          </AchievementCard>
        ))}
      </AchievementsList>
    </Container>
  );
};

export default AchievementsWindow; 