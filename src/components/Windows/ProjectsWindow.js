import React, { useState } from 'react';
import styled from 'styled-components';
import projects from '../../data/projects';
import { FaGithub, FaExternalLinkAlt, FaFolder, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const ProjectCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: #333;
  border-radius: 5px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
`;

const ProjectName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Year = styled.span`
  font-size: 14px;
  color: #aaa;
`;

const Description = styled.p`
  font-size: 14px;
  color: #ddd;
  margin-bottom: 15px;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
`;

const Tech = styled.span`
  background-color: #444;
  color: #fff;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #333;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #444;
  }
`;

const ProjectDetail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DetailContent = styled.div`
  background-color: #2a2a2a;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    background: #555;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const DetailImageContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #333;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const GalleryNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const ImageIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const ImageIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#4caf50' : '#555'};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#4caf50' : '#777'};
  }
`;

const ProjectsWindow = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Debug paths
  console.log("Projects:", projects);
  console.log("First project image path:", projects[0].image);
  
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };
  
  const closeProjectDetail = () => {
    setSelectedProject(null);
  };
  
  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject?.images && selectedProject.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject?.images && selectedProject.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <Container>
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard key={project.id} onClick={() => openProjectDetail(project)}>
            <ProjectImageContainer>
              {project.image ? (
                <StyledImage src={project.image} alt={project.name} />
              ) : (
                <Placeholder>
                  <FaFolder size={40} />
                  <span>No image</span>
                </Placeholder>
              )}
            </ProjectImageContainer>
            <ProjectName>
              {project.name}
              <Year>{project.year}</Year>
            </ProjectName>
            <Description>{project.description.substring(0, 100)}...</Description>
            <Technologies>
              {project.technologies.slice(0, 3).map((tech, index) => (
                <Tech key={index}>{tech}</Tech>
              ))}
              {project.technologies.length > 3 && (
                <Tech>+{project.technologies.length - 3}</Tech>
              )}
            </Technologies>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      
      {selectedProject && (
        <ProjectDetail>
          <CloseButton onClick={closeProjectDetail}>✕</CloseButton>
          <DetailContent>
            <DetailHeader>
              <DetailTitle>{selectedProject.name}</DetailTitle>
              <Year>{selectedProject.year}</Year>
            </DetailHeader>
            
            <DetailImageContainer>
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <StyledImage 
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.name} screenshot ${currentImageIndex + 1}`} 
                />
              ) : selectedProject.image ? (
                <StyledImage 
                  src={selectedProject.image}
                  alt={selectedProject.name} 
                />
              ) : (
                <Placeholder>
                  <FaFolder size={60} />
                  <span>No image</span>
                </Placeholder>
              )}
              
              {selectedProject.images && selectedProject.images.length > 1 && (
                <>
                  <GalleryNavButton direction="left" onClick={prevImage}>
                    <FaChevronLeft />
                  </GalleryNavButton>
                  <GalleryNavButton direction="right" onClick={nextImage}>
                    <FaChevronRight />
                  </GalleryNavButton>
                </>
              )}
            </DetailImageContainer>
            
            {selectedProject.images && selectedProject.images.length > 1 && (
              <ImageIndicators>
                {selectedProject.images.map((_, index) => (
                  <ImageIndicator 
                    key={index} 
                    active={index === currentImageIndex} 
                    onClick={() => goToImage(index)}
                  />
                ))}
              </ImageIndicators>
            )}
            
            <Description>{selectedProject.description}</Description>
            <Technologies>
              {selectedProject.technologies.map((tech, index) => (
                <Tech key={index}>{tech}</Tech>
              ))}
            </Technologies>
            <Links>
              {![4, 5, 6].includes(selectedProject.id) && (
              <LinkButton href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </LinkButton>
              )}
              {selectedProject.id === 1 && (
              <LinkButton href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt /> Live Demo
              </LinkButton>
              )}
            </Links>
          </DetailContent>
        </ProjectDetail>
      )}
    </Container>
  );
};

export default ProjectsWindow; 