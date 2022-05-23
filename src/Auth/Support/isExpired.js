import jwt_decode from "jwt-decode"

export default function isExpired(token) {
    try {
        const { exp } = jwt_decode(token)
        if (Date.now() >= exp * 1000) {
            return false;
        }
        return true
    } catch (error) {
        return false
    }
}