import { DocumentList } from '@/store/savedListSlice'

export function SavedListItem({ item }: { item: DocumentList }) {
    return (
        <div
            key={item.name}
            className='hover:bg-white/5 flex flex-col items-start'
        >
            <h1 className='text-lg font-semibold tracking-tight text-pretty text-white'>
                {item.name}
            </h1>
            <p className='text-sm text-gray-300'>{item.description}</p>
        </div>
    )
}
