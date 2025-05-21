import React, { useState } from 'react';
import styled from 'styled-components';
import skills from '../../data/skills';
import * as Si from 'react-icons/si';
import { FaMicrophone, FaPencilRuler, FaVideo, FaPaintBrush, FaSitemap, FaCode, FaProjectDiagram } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #444;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  color: ${props => props.active ? '#fff' : '#aaa'};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? '#4caf50' : 'transparent'};
    transition: background-color 0.2s;
  }
  
  &:hover {
    color: white;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const SkillCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: default;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 24px;
  color: ${props => props.color || '#fff'};
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const ProgressBackground = styled.div`
  height: 6px;
  width: 100%;
  background-color: #444;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${props => {
    if (props.level > 80) return '#4caf50';
    if (props.level > 60) return '#8bc34a';
    if (props.level > 40) return '#ffc107';
    return '#ff5722';
  }};
  width: ${props => props.level}%;
  border-radius: 3px;
`;

const NoSkillsMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 18px;
`;

// Dynamic icon resolver
const getIcon = (iconName, size = 24) => {
  // FontAwesome icons
  if (iconName === 'FaMicrophone') return <FaMicrophone size={size} />;
  if (iconName === 'FaPencilRuler') return <FaPencilRuler size={size} />;
  if (iconName === 'FaVideo') return <FaVideo size={size} />;
  if (iconName === 'FaPaintBrush') return <FaPaintBrush size={size} />;
  if (iconName === 'FaSitemap') return <FaSitemap size={size} />;
  if (iconName === 'FaCode') return <FaCode size={size} />;
  if (iconName === 'FaProjectDiagram') return <FaProjectDiagram size={size} />;
  
  // Simple icons
  const SiIcon = Si[iconName];
  if (SiIcon) return <SiIcon size={size} />;
  
  // Fallback
  return null;
};

// Get color based on skill category
const getCategoryColor = (category) => {
  switch (category) {
    case 'languages':
      return '#2196f3';
    case 'frameworks':
      return '#9c27b0';
    case 'tools':
      return '#ff9800';
    case 'concepts':
      return '#e91e63';
    case 'design':
      return '#00bcd4';
    default:
      return '#ffffff';
  }
};

const SkillsWindow = () => {
  const [activeTab, setActiveTab] = useState('languages');
  
  const categories = [
    { id: 'languages', name: 'Languages' },
    { id: 'frameworks', name: 'Frameworks' },
    { id: 'tools', name: 'Tools' },
    { id: 'concepts', name: 'Concepts' },
    { id: 'design', name: 'Design' }
  ];
  
  const activeSkills = skills[activeTab] || [];
  
  return (
    <Container>
      <TabsContainer>
        {categories.map(category => (
          <Tab 
            key={category.id}
            active={activeTab === category.id}
            onClick={() => setActiveTab(category.id)}
          >
            {category.name}
          </Tab>
        ))}
      </TabsContainer>
      
      {activeSkills.length > 0 ? (
        <SkillsGrid>
          {activeSkills.map((skill, index) => (
            <SkillCard key={index}>
              <IconWrapper color={getCategoryColor(activeTab)}>
                {getIcon(skill.icon)}
              </IconWrapper>
              <SkillInfo>
                <SkillName>{skill.name}</SkillName>
                <ProgressBackground>
                  <ProgressBar level={skill.level} />
                </ProgressBackground>
              </SkillInfo>
            </SkillCard>
          ))}
        </SkillsGrid>
      ) : (
        <NoSkillsMessage>No skills found in this category</NoSkillsMessage>
      )}
    </Container>
  );
};

export default SkillsWindow; 