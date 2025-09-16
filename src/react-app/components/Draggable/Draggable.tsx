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

interface DraggableProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {
    items: string[]
    onChange: (items: string[]) => void
}

export function Draggable({
    onChange,
    items: ids,
    children,
    ...props
}: DraggableProps) {
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
                    <div {...props}>
                        {children}
                        {/* {ids.map((id) => (
                            <DraggableItem
                            lockSize={true}
                            key={id}
                            id={id}
                            >
                                <Slottable id={id}>{children}</Slottable>
                                {/* <Badge>{id.value}</Badge> */}
                        {/* </DraggableItem> */}
                    </div>
                    {/* <div className='flex flex-row'> */}
                    {/* <LayoutGroup>
                            {items.map((item, i) => (
                                <motion.div layout key={item.id}>
                                    {item.example}
                                    {i === items.length - 1 ? '' : '_'}
                                </motion.div>
                            ))}
                        </LayoutGroup> */}
                    {/* </div> */}
                </SortableContext>
            </DndContext>
        </div>
    )
}
