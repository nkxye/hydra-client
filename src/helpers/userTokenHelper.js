export function getTokenDataSession() {
    const token = localStorage.getItem('token');

    if (token === null || token === undefined) {
        return false
    } else {
        return token
    }
}