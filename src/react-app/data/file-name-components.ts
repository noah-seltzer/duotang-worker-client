import { FileNameComponent } from "@/types/FileNameComponent";

export const defaultFileNameComponents: FileNameComponent[] = [
    { id: '1', value: 'index', label: 'Index', example: '1a' },
    { id: '2', value: 'name', label: 'Client Name', example: 'Noah_Seltzer' },
    { id: '3', value: 'job-title', label: 'Job Title', example: 'Second_Mate' },
    {
        id: '4',
        value: 'certificate-name',
        label: 'Certificate Name',
        example: 'Passport Photo'
    },
    {
        id: '5',
        value: 'current-year',
        label: 'Current Year',
        example: new Date().getFullYear().toString()
    },
    {
        id: '6',
        value: 'current-month',
        label: 'Current Month',
        example: new Date()
            .toLocaleString('default', { month: 'long' })
            .toString()
    },
    {
        id: '7',
        value: 'list-name',
        label: 'List Name',
        example: 'Ukrainian Mariner Transport Canada Submission'

    }
]