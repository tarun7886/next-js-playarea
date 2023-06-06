const storage = window.localStorage || localStorage
export const getKey = (key) => {
    return JSON.parse(storage.getItem(key))
}
export const setKey = (key, value) => {
    return storage.setItem(key, JSON.stringify(value))
}