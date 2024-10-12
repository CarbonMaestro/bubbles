// src/interfaces.ts

import { BubbleType } from './context/BubbleContext';
import { ItemTypes } from './constants';

// Interface for creating a new bubble
export interface CreateBubbleItem {
  type: typeof ItemTypes.BUBBLE;
  bubbleType: BubbleType;
}

// Interface for moving an existing bubble
export interface MoveBubbleItem {
  type: typeof ItemTypes.MOVE_BUBBLE;
  id: string;
}

// Union type for all drag items
export type DragItem = CreateBubbleItem | MoveBubbleItem;
