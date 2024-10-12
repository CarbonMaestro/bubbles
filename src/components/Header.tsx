// src/components/Header.tsx
import React, { useContext } from "react";
import styled from "styled-components";
import { BubbleContext } from "../context/BubbleContext";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${({ active }) => (active ? "#ddd" : "#fff")};
  border: 1px solid #ccc;
  border-bottom: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #eee;
  }
`;

const Header: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedBubble } =
    useContext(BubbleContext);

  const handleTabClick = (tab: "Bubbles" | "Input") => {
    setActiveTab(tab);
    if (tab === "Bubbles") {
      setSelectedBubble(null);
    }
  };

  return (
    <HeaderContainer>
      <Tab
        active={activeTab === "Bubbles"}
        onClick={() => handleTabClick("Bubbles")}
      >
        Bubbles
      </Tab>
      <Tab
        active={activeTab === "Input"}
        onClick={() => handleTabClick("Input")}
      >
        Input
      </Tab>
    </HeaderContainer>
  );
};

export default Header;
