import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


export interface DraggableItemProps {
    id: string;
    children?: React.ReactNode;
    lockSize?: boolean
}

export function DraggableItem({children, id, lockSize = false}: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  
  const style = {
    transform: lockSize ? CSS.Translate.toString(transform) : CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}