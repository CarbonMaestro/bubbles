// src/context/BubbleContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Define the types of bubbles
export type BubbleType = 'Withdraw' | 'Deposit';

// Interface for each bubble instance
export interface BubbleInstance {
  id: string;
  type: BubbleType;
  position: { x: number; y: number };
}

// Interface for connections between bubbles
export interface Connection {
  from: string;
  to: string;
}

// Define the shape of the context
interface BubbleContextProps {
  bubbles: BubbleInstance[];
  addBubble: (type: BubbleType, position: { x: number; y: number }) => void;
  updateBubblePosition: (
    id: string,
    position: { x: number; y: number }
  ) => void;
  clearAll: () => void; // New function
  connections: Connection[];
  addConnection: (from: string, to: string) => void;
  activeTab: 'Bubbles' | 'Input';
  setActiveTab: (tab: 'Bubbles' | 'Input') => void;
  selectedBubble: BubbleInstance | null;
  setSelectedBubble: (bubble: BubbleInstance | null) => void;
}

// Create the context with default values
export const BubbleContext = createContext<BubbleContextProps>({
  bubbles: [],
  addBubble: () => {},
  updateBubblePosition: () => {},
  clearAll: () => {},
  connections: [],
  addConnection: () => {},
  activeTab: 'Bubbles',
  setActiveTab: () => {},
  selectedBubble: null,
  setSelectedBubble: () => {},
});

// Provider component to wrap your app and provide the context
export const BubbleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bubbles, setBubbles] = useState<BubbleInstance[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeTab, setActiveTab] = useState<'Bubbles' | 'Input'>('Bubbles');
  const [selectedBubble, setSelectedBubble] = useState<BubbleInstance | null>(
    null
  );

  // Function to add a new bubble
  const addBubble = (type: BubbleType, position: { x: number; y: number }) => {
    const newBubble: BubbleInstance = {
      id: uuidv4(), // Generate a unique ID
      type,
      position,
    };
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  };

  // Function to update the position of an existing bubble
  const updateBubblePosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) =>
        bubble.id === id ? { ...bubble, position } : bubble
      )
    );
  };

  // Function to clear all bubbles and connections
  const clearAll = () => {
    setBubbles([]);
    setConnections([]);
  };

  // Function to add a new connection between bubbles
  const addConnection = (from: string, to: string) => {
    const newConnection: Connection = { from, to };
    setConnections((prevConnections) => [...prevConnections, newConnection]);
  };

  return (
    <BubbleContext.Provider
      value={{
        bubbles,
        addBubble,
        updateBubblePosition,
        clearAll, // Include in context
        connections,
        addConnection,
        activeTab,
        setActiveTab,
        selectedBubble,
        setSelectedBubble,
      }}
    >
      {children}
    </BubbleContext.Provider>
  );
};
