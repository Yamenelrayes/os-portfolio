import React from 'react';
import styled from 'styled-components';
import { FaDownload, FaFileAlt } from 'react-icons/fa';
import { getAssetPath } from '../../utils/pathUtils';

const Container = styled.div`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #1a1a1a;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(to right, #2d2d3a, #1a1a2a);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 500;
  
  svg {
    color: #9c27b0;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #4caf50;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;

const PDFContainer = styled.div`
  flex: 1;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  background-color: #222;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const PDFFrame = styled.iframe`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  border: none;
  background-color: #222;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

const CVWindow = () => {
  const cvPath = getAssetPath('/yamen-cv.pdf');

  return (
    <Container>
      <Header>
        <HeaderTitle>
          <FaFileAlt size={18} />
          <span>Yamen's CV</span>
        </HeaderTitle>
        <DownloadButton href={cvPath} download="yamen-cv.pdf">
          <FaDownload /> Download CV
        </DownloadButton>
      </Header>

      <PDFContainer>
        <PDFFrame
          src={`${cvPath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          title="CV Viewer"
          allowFullScreen
        />
      </PDFContainer>
    </Container>
  );
};

export default CVWindow; 