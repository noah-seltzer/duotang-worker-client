export interface DocumentTag {
    uiLabel: string
    fileLabel: string
    slug: string
}

export type FileNameComponent =
    | 'clientFirstName'
    | 'clientLastName'
    | 'label'
    | 'index'
    | 'subIndex'

export interface DocumentType {
    label: string
    fileLabel?: string
    slug: string
    marad: boolean
    add_year?: boolean
    tags: DocumentTag[]
}
