import jwt_decode from "jwt-decode"

export default function isExpired(token) {
    try {
        const { exp } = jwt_decode(token)
        let expired = Date.now() >= exp * 1000
        if (expired) {
            return !expired;
        }
        return !expired
    } catch (error) {
        return false
    }
}