import { DiasSemana, TiposCarga } from './enums';

export class TemplateViajeDetalle {
    id: number;
    id_template: number;
    dia: DiasSemana;
    id_origen: string;
    id_destino: string;
    cantidad: number;
    tiempo_cancelacion: number;
    tipo_carga: TiposCarga;
  }
