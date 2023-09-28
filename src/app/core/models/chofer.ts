import { Almacen } from "./almacen";
import { Transportista } from "./transportista";

export class Chofer {
    almacen:            Almacen;
    apellido:           string;
    autorizado:         string;
    codigo:             number; //este es el campo que funciona de Id
    dni:                string;
    idChofer:           string;
    licencia:           string;
    nombre:             string;
    telefonoContacto:   string;
    transportista:      Transportista;
    idDescripcion:      string;
}
