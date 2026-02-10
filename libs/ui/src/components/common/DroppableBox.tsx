// DroppableBox.tsx
import { useDroppable } from '@dnd-kit/core';

interface DroppableBoxProps {
  id: string;
  children?: React.ReactNode;
}

export function DroppableBox({ id, children }: DroppableBoxProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const style: React.CSSProperties = {
    height: 150,
    width: 150,
    border: '2px dashed #aaa',
    borderRadius: 8,
    backgroundColor: isOver ? '#d1fae5' : '#f9fafb', // highlight when dragged over
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children || 'Drop here'}
    </div>
  );
}
