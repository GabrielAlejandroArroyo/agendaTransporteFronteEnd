import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { PlanificacionDetalleService } from './planificacion_detalle.service';

import { environment } from '../../../environments/environment';

describe('PlanificacionCabeceradetalle', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PlanificacionDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PlanificacionDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAll', () => {

    it('should return products', () => {
      // arrange
      const expectData = [
        {
          id: '1',
          title: 'asas',
          price: 1212,
          description: 'asas',
          image: 'img/img.jpg'
        },
        {
          id: '2',
          title: 'sdfdf',
          price: 1212,
          description: 'asas',
          image: 'img/img.jpg'
        }
      ];
      let dataError, dataResponse;
      // act
      let id:string;
      console.log(service);
      service.getByIdcabecera(id)
        .subscribe(response => {
          dataResponse = response;
        }, error => {
          dataError = error;
        });
      const req = httpTestingController.expectOne(`${environment.apiSecureUrl}/detallePlanificacionViaje/porIdCabeceraPlanificacion/${id}`);
      req.flush(expectData);
      // assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });

  });
});
