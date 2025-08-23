import { ListRow } from "../types/ListRow";

export interface SavedList {
    items: ListRow[]
    id: string
    name: string
    description: string
    dateCreated: Date
    dateModified: Date
}

export interface SavedListState {
    lists: SavedList[]
}