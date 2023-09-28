import { Almacen } from "./almacen";
import { Transportista } from "./transportista";

export class Equipo {
    almacen:            Almacen;
    autorizado:         string;
    codigo:             number; //este campo funciona como Id
    descripcion:        string;
    idEquipo:           string;
    patente:            string;
    tipo:               string;
    transportista:      Transportista;
    vencimientoSeguro:  Date;
    idDescripcion:      string;
};
