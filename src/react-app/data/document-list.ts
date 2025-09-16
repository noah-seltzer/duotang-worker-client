import type { DocumentType } from '@/types/DocumentRowType'

export const DEFAULT_DOCUMENT_TYPE: DocumentType = {
    label: 'Confirmation of Competency',
    slug: 'CoC',
    marad: false,
    tags: []
}

export const UKRANIAN_MARINER_DOCUMENT_LIST: DocumentType[] = [
    {
        label: 'Certificate of Competency',
        slug: 'coc',
        marad: false,
        tags: []
    },
    {
        label: 'Confirmation of Competency MARAD Endorsement',
        slug: 'coc-endorsement',
        marad: false,
        tags: []
    },
    {
        label: 'Certificate of Proficiency',
        slug: 'cop',
        marad: false,
        tags: []
    },
    {
        label: 'Basic Safety',
        fileLabel: 'Basic Safety (STCW A-VI 1)',
        slug: 'stcw-basic-safety',
        marad: false,
        tags: []
    },
    {
        label: 'Advanced Firefighting',
        fileLabel: 'Advanced Firefighting (STCW A-VI 3)',
        slug: 'aff',
        marad: false,
        tags: []
    },
    {
        label: 'Survival Craft',
        fileLabel: 'Survival Craft (STCW A-VI 2-1)',
        slug: 'survival-craft',
        marad: false,
        tags: []
    },
    {
        label: 'Marine Medical Certificate',
        slug: 'marine-medical-certificate',
        marad: false,
        tags: []
    },
    {
        label: 'Seafarer Application',
        slug: 'seafarer-application',
        marad: false,
        tags: []
    },
    {
        label: 'Authorized Representative Application',
        slug: 'ar-application',
        marad: false,
        tags: []
    },
    {
        label: 'Familiarization',
        slug: 'familiarization',
        marad: false,
        tags: []
    },
    {
        label: 'Photo Front',
        slug: 'photo-front',
        marad: false,
        tags: []
    },
    {
        label: 'Photo Back',
        slug: 'photo-back',
        marad: false,
        tags: []
    },
    {
        label: 'Work Permit',
        slug: 'work-permit',
        marad: false,
        add_year: true,
        tags: []
    },
    {
        label: 'English-French Qualifications',
        slug: 'english-french-qualifications',
        marad: false,
        tags: []
    }
]
