import { User } from './user';

export class Credential {
    public password: string;
    public tokenJWT: string;
    public token: string;
    public user: string;
    public mensaje: string;
    public paso1: boolean;
    public paso2: boolean;
    public profile: User;
}
