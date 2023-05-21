import Jwt from "jsonwebtoken"
export const generateToken = async (id, username) => {
    const payload = { id, username }
    const token = Jwt.sign(payload, "myKey", { expiresIn: "24h" })
    return token
}