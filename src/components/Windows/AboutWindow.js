import React from 'react';
import styled from 'styled-components';
import aboutMe from '../../data/aboutMe';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Container = styled.div`
  padding: 25px;
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #fff;
  background-image: linear-gradient(135deg, #4caf50, #2196f3);
`;

const Name = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
`;

const Title = styled.p`
  color: #aaa;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #444;
  margin: 15px 0;
`;

const InterestsList = styled.div`
  margin-top: 20px;
`;

const InterestItem = styled.div`
  background-color: #2a2a2a;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: #4caf50;
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #444;
    margin-left: 15px;
  }
`;

const SummaryText = styled.p`
  line-height: 1.6;
  color: #ddd;
  font-size: 16px;
`;

const EducationTimeline = styled.div`
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #444;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 50px;
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #4caf50;
  }
`;

const Institution = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Degree = styled.p`
  color: #ddd;
  margin-bottom: 5px;
`;

const EducationMeta = styled.div`
  display: flex;
  gap: 15px;
  color: #aaa;
  font-size: 14px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AboutWindow = () => {
  // Get the first letter of first and last name for avatar
  const getInitials = (name) => {
    return name.split(' ')
      .filter(n => n)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Container>
      <ProfileSection>
        <Avatar>{getInitials(aboutMe.name)}</Avatar>
        <Name>{aboutMe.name}</Name>
        <Title>{aboutMe.title}</Title>
        
        <SectionDivider />
        
        <SectionTitle>Interests</SectionTitle>
        <InterestsList>
          {aboutMe.interests.map((interest, index) => (
            <InterestItem key={index}>{interest}</InterestItem>
          ))}
        </InterestsList>
      </ProfileSection>
      
      <ContentSection>
        <div>
          <SectionTitle>About Me</SectionTitle>
          <SummaryText>{aboutMe.summary}</SummaryText>
        </div>
        
        <div>
          <SectionTitle>Education</SectionTitle>
          <EducationTimeline>
            {aboutMe.education.map((edu, index) => (
              <TimelineItem key={index}>
                <Institution>{edu.institution}</Institution>
                <Degree>{edu.degree}</Degree>
                <EducationMeta>
                  <MetaItem>
                    <FaCalendarAlt /> {edu.year}
                  </MetaItem>
                  <MetaItem>
                    <FaMapMarkerAlt /> {edu.location}
                  </MetaItem>
                </EducationMeta>
              </TimelineItem>
            ))}
          </EducationTimeline>
        </div>
      </ContentSection>
    </Container>
  );
};

export default AboutWindow; 