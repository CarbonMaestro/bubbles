// src/components/FlowChartArea.tsx

import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import { BubbleContext, BubbleType } from '../context/BubbleContext';
import BubbleInstanceComponent from './BubbleInstance';
import ConnectionComponent from './Connection';
import { DragItem } from '../interfaces';

const Area = styled.div`
  flex: 1;
  position: relative;
  background-color: #f9f9f9;
  overflow: hidden;
`;

const FlowChartArea: React.FC = () => {
  const { bubbles, connections, addBubble, updateBubblePosition } =
    useContext(BubbleContext);
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >(
    () => ({
      accept: [ItemTypes.BUBBLE, ItemTypes.MOVE_BUBBLE],
      drop: (item: DragItem, monitor) => {
        const offset = monitor.getClientOffset();
        if (offset && dropRef.current) {
          const area = dropRef.current.getBoundingClientRect();
          let position = {
            x: offset.x - area.left - 50, // Adjust to center the bubble (assuming 100px width)
            y: offset.y - area.top - 50, // Adjust to center the bubble (assuming 100px height)
          };

          // Boundary checks to prevent bubbles from going out of the FlowChartArea
          position = {
            x: Math.max(0, Math.min(position.x, area.width - 100)),
            y: Math.max(0, Math.min(position.y, area.height - 100)),
          };

          if (item.type === ItemTypes.BUBBLE) {
            // Type is CreateBubbleItem
            addBubble(item.bubbleType, position);
          } else if (item.type === ItemTypes.MOVE_BUBBLE) {
            // Type is MoveBubbleItem
            updateBubblePosition(item.id, position);
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [addBubble, updateBubblePosition]
  );

  drop(dropRef);

  return (
    <Area
      ref={dropRef}
      style={{
        backgroundColor: isOver && canDrop ? '#e0ffe0' : '#f9f9f9',
      }}
    >
      {bubbles.map((bubble) => (
        <BubbleInstanceComponent key={bubble.id} bubble={bubble} />
      ))}
      {connections.map((conn, index) => (
        <ConnectionComponent key={index} connection={conn} />
      ))}
    </Area>
  );
};

export default FlowChartArea;
