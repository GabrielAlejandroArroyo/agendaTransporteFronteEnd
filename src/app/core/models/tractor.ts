import { Almacen } from "./almacen";
import { Transportista } from "./transportista";

export class Tractor {
    almacen:            Almacen;
    autorizado:         string;
    codigo:             number; //este campo funciona como Id
    descripcion:        string;
    idTractor:          string;
    patente:            string;
    tipo:               string;
    transportista:      Transportista;
    vencimientoSeguro:  Date;
    idDescripcion:      string;
};
