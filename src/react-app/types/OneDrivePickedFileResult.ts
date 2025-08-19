interface OneDrivePickedFile {
    webDavUrl: string
    id: string
    name: string
}

export interface OneDrivePickedFileResult {
    command: string
    items: OneDrivePickedFile[]
}