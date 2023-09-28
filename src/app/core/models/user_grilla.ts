import { User } from './user';

export class UserGrilla {
    public idUsuario:       number;
    public user:            string;
    // public nombre:          string;
    // public apellido:        string;
    // public email:           string;
    // public telefono:        string;

    //Columnas para la grilla
    public rolGrillaStr:    string = "";
    public transpGrillaStr: string = "";

    constructor(usu: User){
        this.idUsuario       = usu.idUsuario;
        this.user            = usu.user;
        // this.nombre          = usu.nombre;
        // this.apellido        = usu.apellido;
        // this.email           = usu.email;
        // this.telefono        = usu.telefono;
        this.transpGrillaStr = "";
        this.rolGrillaStr    = "";

        if(usu.transportista) {
            this.transpGrillaStr = usu.transportista.nombre;
        }
        if(usu.usuarioRol && usu.usuarioRol[0] && usu.usuarioRol[0].rol) {
            this.rolGrillaStr = usu.usuarioRol[0].rol.descripcion
        }
    }
}
