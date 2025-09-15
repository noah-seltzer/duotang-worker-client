export function replaceSpaceWithUnderscore(str: string) {
    return str.replace(/\b \b/g, '_')
}