import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

interface StringValidationSchema {
    label: string,
    required?: boolean | undefined,
    minLength?: number | undefined,
    disableRegex?: boolean | undefined

}

const requiredString = ({label, required = true, minLength = undefined, disableRegex = false}: StringValidationSchema) => {
    const schema = z.string(required ? `${label} is required` : `${label} must be a string`)

    if (!disableRegex) {
        schema.regex(/^[{\\p{L}}{0-9}]$/, 'Only letters and numbers are allowed')
    }

    if (!required) {
        schema.optional()
    }

    if (minLength) {
        schema.min(minLength, `${label} must be at least ${minLength} characters long`)
    }

    return schema
}


export const userSchema = toFormikValidationSchema( z.object({
        firstName: requiredString({label: 'First Name'}),
        lastName: requiredString({label: 'Last Name'}),
        jobTitle: requiredString({label: 'Job Title'})
    }))