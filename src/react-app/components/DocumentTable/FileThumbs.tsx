import { NewFilePreview } from '@/components/Files/NewFilePreview'
import { Separator } from '@/components/Skeleton/separator'
import { useAppSelector } from '@/store'
import { selectListHoverIndex } from '@/store/appearanceSlice'
import { selectDocumentListById } from '@/store/clientInfoSlice'
import { selectRowById } from '@/store/fileListSlice'

export function FileThumbs({ listId }: { listId: string }) {
    const list = useAppSelector((state) =>
        selectDocumentListById(state, listId)
    )
    
    return <div className='flex flex-col gap-4 justify-start'>
        {list.rows.map((rowId, i) => <div key={rowId}>
            <FileThumbnail rowId={rowId} />
            {i !== list.rows.length - 1 && <Separator />}
        </div>)}
    </div> 
}

export function FileThumbnail({ rowId }: { rowId: string }) {
    const isHover = rowId === useAppSelector(selectListHoverIndex)
    const rowFile = useAppSelector((state) => selectRowById(state, rowId))
    if (rowFile.fileIds.length === 0)
        return (
            <div className='border border-dashed border-foreground/25 w-30 h-40 rounded-md'></div>
        )

    const id = rowFile.fileIds[0]
    return MemoPreview({ fileId: id })
}


export function MemoPreview({fileId}: {fileId: string}) {
    return <NewFilePreview fileId={fileId} />
}