// src/App.tsx

import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import FlowChartArea from './components/FlowChartArea';
import ControlArea from './components/ControlArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BubbleProvider } from './context/BubbleContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #000;
`;

const App: React.FC = () => {
  return (
    <BubbleProvider>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Header />
          <FlowChartArea />
          <Divider />
          <ControlArea />
        </Container>
      </DndProvider>
    </BubbleProvider>
  );
};

export default App;
