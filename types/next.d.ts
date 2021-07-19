import { IncomingMessage } from 'http';
import { JwtPayload} from 'jsonwebtoken'

declare module 'next' {
    export interface NextApiRequest extends IncomingMessage {
        jwtPayload?: JwtPayload | string;
        files?: any
    }
}