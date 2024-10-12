// src/components/ControlArea.tsx

import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';
import { BubbleType } from '../context/BubbleContext';
import { DragItem } from '../interfaces';
import { BubbleContext } from '../context/BubbleContext';

const Area = styled.div`
  height: 200px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
`;

const BubblesContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const BubbleButton = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  font-weight: bold;
  color: #fff;
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:active {
    transform: scale(0.95);
  }
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-left: 40px;

  &:hover {
    background-color: #ff1a1a;
  }
`;

interface DraggableBubbleProps {
  type: BubbleType;
  color: string;
  label: string;
}

const DraggableBubble: React.FC<DraggableBubbleProps> = ({
  type,
  color,
  label,
}) => {
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.BUBBLE,
      item: { type: ItemTypes.BUBBLE, bubbleType: type },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [type]
  );

  return (
    <BubbleButton
      ref={drag}
      color={color}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </BubbleButton>
  );
};

const ControlArea: React.FC = () => {
  const { clearAll } = useContext(BubbleContext);

  const handleClearAll = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all bubbles and connections?'
    );
    if (confirmed) {
      clearAll();
    }
  };

  return (
    <Area>
      <BubblesContainer>
        <DraggableBubble type="Withdraw" color="#FFA500" label="Withdraw" />
        <DraggableBubble type="Deposit" color="#ADD8E6" label="Deposit" />
        {/* Add more draggable bubbles here if needed */}
      </BubblesContainer>
      <ClearButton onClick={handleClearAll}>Clear All</ClearButton>
    </Area>
  );
};

export default ControlArea;
