// src/components/Connection.tsx
import React, { useContext } from "react";
import styled from "styled-components";
import { BubbleContext, Connection } from "../context/BubbleContext";

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

interface ConnectionProps {
  connection: Connection;
}

const ConnectionComponent: React.FC<ConnectionProps> = ({ connection }) => {
  const { bubbles } = useContext(BubbleContext);

  const fromBubble = bubbles.find((b) => b.id === connection.from);
  const toBubble = bubbles.find((b) => b.id === connection.to);

  if (!fromBubble || !toBubble) return null;

  const startX = fromBubble.position.x + 50; // Bubble radius
  const startY = fromBubble.position.y + 50;
  const endX = toBubble.position.x + 50;
  const endY = toBubble.position.y + 50;

  return (
    <Svg>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#000"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#000" />
        </marker>
      </defs>
    </Svg>
  );
};

export default ConnectionComponent;
