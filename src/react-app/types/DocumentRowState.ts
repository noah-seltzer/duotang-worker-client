import type { DocumentRowType } from "./DocumentRowType"

// Defines the structure for a single document row in our state
export interface DocumentRowState {
    id: number
    docType: DocumentRowType
    file: File | null
}
