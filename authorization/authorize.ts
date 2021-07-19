import type { NextApiRequest } from 'next'

const authorize = async (req: NextApiRequest, roles: string[]) => {
    const allowedRoles = new Set(roles);

    if (!req.jwtPayload || typeof req.jwtPayload === 'string') {
        return {
            isAuthorized: false,
            status: 401,
            errors: [
                { message: 'You are not logged in' }
            ]
        }
    }

    if (!req.jwtPayload.userRole) {
        return {
            isAuthorized: false,
            status: 401,
            errors: [
                { message: 'You are not logged in' }
            ]
        }
    }

    if (!isAuthorized(req.jwtPayload.userRole, allowedRoles)) {
        return {
            isAuthorized: false,
            status: 403,
            errors: [
                { message: 'Forbidden: insufficient privileges' }
            ]
        }
    }

    return {
        isAuthorized: true,
        status: 200,
        errors: [
            { message: 'No error' }
        ]
    }
}

const isAuthorized = (userRoles: string[], allowedRoles: Set<string>) => {
    // O(n) runtime where n is the amount of roles a user has
    return userRoles.some((role) => allowedRoles.has(role));
}

export default authorize