import { useState } from 'react'
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
import { LayoutGroup, motion } from 'motion/react'

import { Badge } from '@/components/Skeleton/Badge'
import { DraggableItem } from '@/components/Draggable/DraggableItem'

export interface SortableItem {
    id: string
    label: string
    value: string
    example: string
    active?: boolean
}

export type SortableItemInput = Omit<SortableItem, 'id'>

interface FileNameOrderSelector {
    items: SortableItem[]
    onChange: (items: SortableItem[]) => void
}

export function FileNameOrderSelector({
    onChange,
    items
}: FileNameOrderSelector) {
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
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        onChange(arrayMove(items, oldIndex, newIndex))
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
                    items={items}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className='flex flex-row space-x-2'>
                        {items.map((id) => (
                            <DraggableItem
                                lockSize={true}
                                key={id.id}
                                id={id.id}
                            >
                                <Badge>{id.value}</Badge>
                            </DraggableItem>
                        ))}
                    </div>
                    <div className='flex flex-row'>
                        <LayoutGroup>
                            {items.map((item, i) => (
                                <motion.div layout key={item.id}>
                                    {item.example}
                                    {i === items.length - 1 ? '' : '_'}
                                </motion.div>
                            ))}
                        </LayoutGroup>
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}
