// utils.js
export function isTokenExpired(token) {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const currentTime = Date.now() / 1000; // Get current time in seconds

    return payload.exp < currentTime; // Compare expiration time with current time
}
