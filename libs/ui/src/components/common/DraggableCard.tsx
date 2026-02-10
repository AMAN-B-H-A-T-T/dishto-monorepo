// DraggableCard.tsx
import type { ReactNode } from 'react';

import { useDraggable } from '@dnd-kit/core';

interface DraggableCardProps {
  id: string; // must be unique within a <DndContext>
  children: ReactNode;
}

export function DraggableCard({ id, children }: DraggableCardProps) {
  // ① call the hook
  const {
    attributes, // ARIA + data-* attrs to keep things accessible
    listeners, // pointer / keyboard event handlers
    setNodeRef, // ref callback – tells dnd‑kit which DOM element to track
    transform, // {x, y} pixels the item should be offset by
    isDragging, // boolean flag – handy for styling
  } = useDraggable({ id }); // ② every draggable needs a unique id

  // ③ translate the element visually
  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
