import { UsuarioRol } from "./usuarioRol";
import { Transportista } from "./transportista";

export class User {
    public idUsuario:       number;
    public user:            string;
    public nombre:          string;
    public apellido:        string;
    public email:           string;
    public telefono:        string;
    public habilitado:      boolean;
    public timestamp:       string;
    public usuarioRol:      UsuarioRol[];
    public transportista:   Transportista;
}
