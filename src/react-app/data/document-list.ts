import type { DocumentRowType } from '../types/DocumentRowType'

export const DEFAULT_DOCUMENT_TYPE: DocumentRowType = {
    label: 'Confirmation of Competency',
    slug: 'CoC',
    marad: true
}

export const DOCUMENT_TYPES: DocumentRowType[] = [
    {
        label: 'Confirmation of Competency',
        slug: 'CoC',
        marad: true
    },
    {
        label: 'Endorsement',
        slug: 'Endorsement',
        marad: true
    },
    {
        label: 'Basic Safety',
        slug: 'Basic Safety',
        marad: false
    },
    {
        label: 'AFF',
        slug: 'AFF',
        marad: true
    },
    {
        label: 'Survival Craft',
        slug: 'Survival Craft',
        marad: true
    },
    {
        label: 'Marine Medical Certificate',
        slug: 'Marine Medical Certificate',
        marad: false
    },
    {
        label: 'Seafarer Application',
        slug: 'E_Seafarer Application',
        marad: false
    },
    {
        label: 'AR Application',
        slug: 'Seafarer Application',
        marad: false
    },
    {
        label: 'Familiarization',
        slug: 'Familiarization',
        marad: false
    },
    {
        label: 'Photo Front',
        slug: 'Photo Front',
        marad: false
    },
    {
        label: 'Photo Back',
        slug: 'Photo Back',
        marad: false
    },
    {
        label: 'Work Permit',
        slug: 'Work Permit',
        marad: false,
        add_year: true
    }
]
