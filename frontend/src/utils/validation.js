export const isMatch = (password, cfPassword) => {
    if (password === cfPassword) return true
    return false
}