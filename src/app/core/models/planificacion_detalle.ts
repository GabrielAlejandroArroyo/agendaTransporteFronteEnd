import { Almacen } from './almacen';
import { Chofer } from './chofer';
import { Equipo } from './equipo';
import { Tractor } from './tractor';
import { Transportista } from './transportista';
import { User } from './user';
import {Estado} from './estado';
import {PlanificacionCabecera} from './planificacion_cabecera'

export class PlanificacionDetalle {
    almacen:                Almacen;
    cabeceraPlanificacion: PlanificacionCabecera;
    chofer:                 Chofer;
    equipo:                 Equipo;
    estado:                 Estado;
    fechaHoraCreacion:      Date;
    idDetallePlanificacion: number;
    idMuelle:               string;
    notificacion:           string;
    observaciones:          string;
    timestamp:              Date;
    tractor:                Tractor;
    transpportista:         Transportista;
    usuario:                User;
}
