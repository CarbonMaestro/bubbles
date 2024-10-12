// src/components/BubbleInstance.tsx

import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';
import { BubbleInstance } from '../context/BubbleContext';
import { MoveBubbleItem } from '../interfaces';

const Bubble = styled.div<{ color: string; isDragging: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: move;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s;
`;

interface BubbleInstanceProps {
  bubble: BubbleInstance;
}

const BubbleInstanceComponent: React.FC<BubbleInstanceProps> = ({ bubble }) => {
  const [{ isDragging }, drag] = useDrag<
    MoveBubbleItem,
    void,
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.MOVE_BUBBLE,
      item: { type: ItemTypes.MOVE_BUBBLE, id: bubble.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [bubble.id]
  );

  return (
    <Bubble
      ref={drag}
      color={bubble.type === 'Withdraw' ? '#FFA500' : '#ADD8E6'}
      isDragging={isDragging}
      style={{ left: bubble.position.x, top: bubble.position.y }}
    >
      {bubble.type}
      {/* Future: Add pullies or other interactive elements here */}
    </Bubble>
  );
};

export default BubbleInstanceComponent;
