import localforage from 'localforage'

export async function loadFromLocalCache(fileId: string): Promise<File | null> {
    return localforage.getItem(fileId)
}


const cache = new Map()

export function fetchFromLocalForage(key: string) {
    if (!cache.has(key)) {
        // If the promise is not in the cache, create it,
        // store it, and then return it.
        const promise = localforage
            .getItem(key)
            .then((value) => {
                // You could add logic here to handle if the value is null
                if (value === null) {
                    throw new Error(`Item with key "${key}" not found.`)
                }
                return value
            })
            .catch((error) => {
                // Important: if it fails, remove it from the cache
                // so we can try again later.
                cache.delete(key)
                throw error
            })
        cache.set(key, promise)
    }

    // Always return the promise from the cache.
    return cache.get(key)
}

// Optional: a function to clear the cache if data needs to be re-fetched
export function invalidateCache(key: string) {
    cache.delete(key)
}