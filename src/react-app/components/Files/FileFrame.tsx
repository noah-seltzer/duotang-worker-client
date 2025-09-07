interface FileFrameProps {
    width?: number
    height?: number
    url: string
    onLoaded?: () => void
}

export function FileFrame({
    width = 100,
    height = 100,
    url,
    onLoaded
}: FileFrameProps) {
    return (
        <iframe
            onLoad={onLoaded}
            src={url}
            width={`${width}px`}
            height={`${height}px`}
            title='pdf-viewer'
        />
    )
}
