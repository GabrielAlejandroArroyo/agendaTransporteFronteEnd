
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

//Customización del paginador en castellano
@Injectable()
export class CustomMatPaginatorCast extends MatPaginatorIntl {
  constructor() {
    super();  

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
   
    this.itemsPerPageLabel    = "Items por página";
    this.nextPageLabel        = "Siguiente";
    this.previousPageLabel    = "Anterior";      
    this.firstPageLabel       = "Primera";
    this.lastPageLabel        = "Última";

    this.changes.next();
   
  }

 getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }
}