import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { UserPayload } from '../interfaces/user-payload.interface'

class AuthService {
    private secretKey: Secret
    initiateAuthService() {
        this.secretKey = process.env.JWT_SECRET || 'RFYr98CyaupxZWd0Iy18zavs2mI9E3Yv'
    }

    generateToken(userPayload: UserPayload): string {
        const token = jwt.sign(userPayload, this.secretKey, {
            expiresIn: '30d',
            algorithm: 'HS256'
        })
        return token
    }

    verifyToken(token: string): UserPayload | null {
        try {
            const decoded = jwt.verify(token, this.secretKey) as JwtPayload & UserPayload
            return decoded;
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService();