import { Almacen } from "./almacen";
//import { PlanificacionDetalle } from "./planificacion_detalle";
import { Chofer } from "./chofer";
import { Destino } from "./destino";
import { Equipo } from './equipo';
import { Transportista } from './transportista';
import { User } from './user';
import { Tractor } from './tractor';
import { EstadoPlanificacion } from './estado_planificacion';

export class PlanificacionCabecera {
    almacen:                        Almacen;
    cancelable:                     boolean;
    chofer:                         Chofer;
    //colDetallePlanificacionViajes:  PlanificacionDetalle[];
    destino:                        Destino;
    equipo:                         Equipo;
    estado:                         EstadoPlanificacion;
    fechaCarga:                     string;
    fechaHoraCreacion:              Date;
    fechaHoraModificacion:          Date;
    horaCarga:                      string;
    idCabeceraPlanificacion:        number;
    numeroPlanificacion:            string;
    observacion:                    string;
    timestamp:                      Date;
    tipoCarga:                      string;
    tractor:                        Tractor;
    transportista:                  Transportista;
    usuarioCancelador:              User;
    usuarioCreador:                 User;
    usuarioModificador:             User;
}
