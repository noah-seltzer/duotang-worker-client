import localforage from "localforage"
import { Suspense, use } from "react"
import FilePreview from "reactjs-file-preview"

interface FilePreviewProps {
    fileId: string
}

export function NewFilePreview({ fileId }: FilePreviewProps) {
    const promise = localforage.getItem(fileId) as Promise<File>
    return (
        <div className='flex flex-row items-center gap-2'>
            <Suspense fallback={<div className='h-8 w-32'>Loading...</div>}>
                <FileLoader filePromise={promise} />
            </Suspense>
        </div>
    )
}


function FileLoader({
    filePromise,
}: {
    filePromise: Promise<File>
}) {

    const file = use(filePromise)
    return (
        <div className="w-fit rounded-md" style={{ height: "10rem", overflow:'hidden' }} >
            <FilePreview preview={file} />
        </div>
    )
}