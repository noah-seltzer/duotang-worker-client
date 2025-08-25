interface FileFrameProps {
    width?: number
    height?: number
    url: string
}

export function FileFrame({ width = 100, height = 100, url }: FileFrameProps) {
    return (
        <iframe
            src={url}
            width={`${width}px`}
            height={`${height}px`}
            title='pdf-viewer'
        />
    )
}
