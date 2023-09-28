import { Destino } from "./destino";
import { Transportista } from './transportista';
import { EstadoPlanificacion } from './estado_planificacion';

export class PlanificacionCabeceraLazy {
    almacen:                        string;
    descripcionAlmacen:             string;
    destino:                        Destino;
    estado:                         EstadoPlanificacion;
    fechaCarga:                     string;
    horaCarga:                      string;
    idCabeceraPlanificacion:        number;
    numeroPlanificacion:            string;
    timestamp:                      Date;
    tipoCarga:                      string;
    transportista:                  Transportista;
}
