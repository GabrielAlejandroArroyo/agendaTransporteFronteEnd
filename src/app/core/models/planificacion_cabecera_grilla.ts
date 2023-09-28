import { PlanificacionCabecera } from './planificacion_cabecera';

export class PlanificacionCabeceraGrilla {
    cabecera:       PlanificacionCabecera;
    id:             number;
    numero:         string;
    fechaCarga:     Date;
    fechaCargaStr:  string;
    horaCarga:      string;
    origen:         string;
    destino:        string;
    estado:         string;

    //Constructor a partir de la cabecera
    constructor(viaje: PlanificacionCabecera) {
        this.cabecera    = viaje;
        this.id          = viaje.idCabeceraPlanificacion;
        this.numero      = viaje.numeroPlanificacion;
        this.horaCarga   = "";
        this.origen      = "";
        this.destino     = "";
        this.estado      = "";
  
        try {
  
          if(viaje.fechaCarga) {
            // let fec         = viaje.fechaCarga.substring(0, 4) + "-";
            // fec            += viaje.fechaCarga.substring(4, 6) + "-";
            // fec            += viaje.fechaCarga.substring(6, 8);
            // let anio = parseInt(viaje.fechaCarga.substring(0, 4));
            // let mes  = parseInt(viaje.fechaCarga.substring(4, 6));
            // let dia  = parseInt(viaje.fechaCarga.substring(6, 8));
            // v.fechaCarga    = new Date(Date.UTC(anio,mes,dia));
  
            let fec         = viaje.fechaCarga.substring(6, 8) + "/";
            fec            += viaje.fechaCarga.substring(4, 6) + "/";
            fec            += viaje.fechaCarga.substring(0, 4);
            this.fechaCargaStr = fec;
          }
  
          this.horaCarga   = viaje.horaCarga;
          this.origen      = viaje.almacen?.localidad;
          this.destino     = viaje.destino?.localidad;
          this.estado      = viaje.estado?.codigo + "/" + viaje.estado?.descripcion;
  
        } catch(e) {
          console.log('Se ha producido un error creando el registro PlanificacionCabeceraGrilla para la grilla', e);
  
        }
    }
}
