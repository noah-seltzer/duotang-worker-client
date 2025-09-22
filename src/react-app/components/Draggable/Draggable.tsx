import { HTMLProps, PropsWithChildren } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable'

interface DraggableProps extends PropsWithChildren {
    items: string[]
    onChange: (items: string[]) => void
}

export function Draggable({ onChange, items: ids, children }: DraggableProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!active || !over) return
        if (active.id === over.id) return
        const oldIndex = ids.findIndex((item) => item === active.id)
        const newIndex = ids.findIndex((item) => item === over.id)
        onChange(arrayMove(ids, oldIndex, newIndex))
    }

    return (
        <div className='flex flex-col gap-4'>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragEnd}
            >
                <SortableContext
                    items={ids}
                    strategy={horizontalListSortingStrategy}
                >
                    {children}
                </SortableContext>
            </DndContext>
        </div>
    )
}
