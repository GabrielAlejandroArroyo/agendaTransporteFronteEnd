import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


import { PlanificacionCabeceraService } from './planificacion_cabecera.service';
import {Transportista} from './../../core/models/transportista'

import { environment } from '../../../environments/environment';

describe('PlanificacionCabecera', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PlanificacionCabeceraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PlanificacionCabeceraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAll', () => {

    it('should return CabecerasPlanificacion', () => {

      // arrange
      const expectData = [
        {
            idCabeceraPlanificacion: 12213,
            numeroPlanificacion: null,
            almacen: {
              descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
              direccion: 'PEREZ QUINTANA 3850',
              localidad: 'ITUZAINGO',
              provincia: 'BUENOS AIRES',
              almacen: '002',
              idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
            },
            destino: {
              destino: '040',
              nombre: 'CENTRO DE DISTRIBUCIÓN.USHUAIA',
              direccion: 'PERITO MORENO 4440',
              localidad: 'USHUAIA',
              provincia: 'TIERRA DE FUEGO',
              casillaCorreo: null,
              telefonoContacto: null,
              duracionViaje: '8',
              diasAnticipacionTurno: '2',
              idDescripcion: '[040]CENTRO DE DISTRIBUCIÓN.USHUAIA'
            },
            fechaCarga: '20201125',
            horaCarga: '10:00',
            tipoCarga: 'SEC',
            estado: {
              codigo: '85',
              descripcion: 'CANCELADO POR PLANIFICADOR'
            },
            cancelable: true,
            fechaHoraCreacion: null,
            fechaHoraModificacion: null,
            equipo: null,
            tractor: null,
            chofer: null,
            usuarioCreador: {
              idUsuario: 5,
              user: 'admin',
              password: '321',
              nombre: 'Admin',
              apellido: 'Administrador',
              email: 'admin',
              telefono: '+5491131744121',
              habilitado: true,
              transportista: null,
              timestamp: '2020-10-30T12:49:23.708+00:00',
              usuarioRol: [
                {
                  idUsuarioRol: 5,
                  rol: {
                    idRol: 45,
                    descripcion: 'ADMINISTRADOR',
                    timeStamp: '2020-10-08T16:06:19.699+00:00',
                    idDescripcion: '[45]ADMINISTRADOR'
                  },
                  timestamp: null
                }
              ]
            },
            usuarioModificador: {
              idUsuario: 5,
              user: 'admin',
              password: '321',
              nombre: 'Admin',
              apellido: 'Administrador',
              email: 'admin',
              telefono: '+5491131744121',
              habilitado: true,
              transportista: null,
              timestamp: '2020-10-30T12:49:23.708+00:00',
              usuarioRol: [
               {
                  idUsuarioRol: 5,
                  rol: {
                    idRol: 45,
                    descripcion: 'ADMINISTRADOR',
                    timeStamp: '2020-10-08T16:06:19.699+00:00',
                    idDescripcion: '[45]ADMINISTRADOR'
                  },
                  timestamp: null
                }
              ]
            },
            usuarioCancelador: null,
            observacion: null,
            transportista: null,
            colDetallePlanificacionViajes: [
              {
                idDetallePlanificacion: 12046,
                estado: {
                  codigo: '00',
                  descripcion: 'PENDIENTE DE ASIGNACION'
                },
                fechaHoraCreacion: '2020-11-24T18:41:20.096+00:00',
                equipo: null,
                tractor: null,
                chofer: null,
                usuario: null,
                transportista: null,
                alamcen: {
                  descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                  direccion: 'PEREZ QUINTANA 3850',
                  localidad: 'ITUZAINGO',
                  provincia: 'BUENOS AIRES',
                  almacen: '002',
                  idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
                },
                idMuelle: null,
                notificacion: null,
                observaciones: null,
                timestamp: '2020-11-24T18:41:20.145+00:00'
              },
              {
                idDetallePlanificacion: 12109,
                estado: {
                  codigo: '85',
                  descripcion: 'CANCELADO POR PLANIFICADOR'
                },
                fechaHoraCreacion: '2020-11-25T15:17:44.173+00:00',
                equipo: null,
                tractor: null,
                chofer: null,
                usuario: {
                  idUsuario: 5,
                  user: 'admin',
                  password: '321',
                  nombre: 'Admin',
                  apellido: 'Administrador',
                  email: 'admin',
                  telefono: '+5491131744121',
                  habilitado: true,
                  transportista: null,
                  timestamp: '2020-10-30T12:49:23.708+00:00',
                  usuarioRol: [
                    {
                      idUsuarioRol: 5,
                      rol: {
                        idRol: 45,
                        descripcion: 'ADMINISTRADOR',
                        timeStamp: '2020-10-08T16:06:19.699+00:00',
                        idDescripcion: '[45]ADMINISTRADOR'
                      },
                      timestamp: null
                    }
                  ]
                },
                transportista: null,
                alamcen: {
                  descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                  direccion: 'PEREZ QUINTANA 3850',
                  localidad: 'ITUZAINGO',
                  provincia: 'BUENOS AIRES',
                  almacen: '002',
                  idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
                },
                idMuelle: null,
                notificacion: null,
                observaciones: null,
                timestamp: '2020-11-25T15:17:44.215+00:00'
              }
            ],
            timestamp: '2020-11-25T15:17:44.085+00:00'
        },
        {
          idCabeceraPlanificacion: 12213,
          numeroPlanificacion: null,
          almacen: {
            descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
            direccion: 'PEREZ QUINTANA 3850',
            localidad: 'ITUZAINGO',
            provincia: 'BUENOS AIRES',
            almacen: '002',
            idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
          },
          destino: {
            destino: '040',
            nombre: 'CENTRO DE DISTRIBUCIÓN.USHUAIA',
            direccion: 'PERITO MORENO 4440',
            localidad: 'USHUAIA',
            provincia: 'TIERRA DE FUEGO',
            casillaCorreo: null,
            telefonoContacto: null,
            duracionViaje: '8',
            diasAnticipacionTurno: '2',
            idDescripcion: '[040]CENTRO DE DISTRIBUCIÓN.USHUAIA'
          },
          fechaCarga: '20201125',
          horaCarga: '10:00',
          tipoCarga: 'SEC',
          estado: {
            codigo: '85',
            descripcion: 'CANCELADO POR PLANIFICADOR'
          },
          cancelable: true,
          fechaHoraCreacion: null,
          fechaHoraModificacion: null,
          equipo: null,
          tractor: null,
          chofer: null,
          usuarioCreador: {
            idUsuario: 5,
            user: 'admin',
            password: '321',
            nombre: 'Admin',
            apellido: 'Administrador',
            email: 'admin',
            telefono: '+5491131744121',
            habilitado: true,
            transportista: null,
            timestamp: '2020-10-30T12:49:23.708+00:00',
            usuarioRol: [
              {
                idUsuarioRol: 5,
                rol: {
                  idRol: 45,
                  descripcion: 'ADMINISTRADOR',
                  timeStamp: '2020-10-08T16:06:19.699+00:00',
                  idDescripcion: '[45]ADMINISTRADOR'
                },
                timestamp: null
              }
            ]
          },
          usuarioModificador: {
            idUsuario: 5,
            user: 'admin',
            password: '321',
            nombre: 'Admin',
            apellido: 'Administrador',
            email: 'admin',
            telefono: '+5491131744121',
            habilitado: true,
            transportista: null,
            timestamp: '2020-10-30T12:49:23.708+00:00',
            usuarioRol: [
             {
                idUsuarioRol: 5,
                rol: {
                  idRol: 45,
                  descripcion: 'ADMINISTRADOR',
                  timeStamp: '2020-10-08T16:06:19.699+00:00',
                  idDescripcion: '[45]ADMINISTRADOR'
                },
                timestamp: null
              }
            ]
          },
          usuarioCancelador: null,
          observacion: null,
          transportista: null,
          colDetallePlanificacionViajes: [
            {
              idDetallePlanificacion: 12046,
              estado: {
                codigo: '00',
                descripcion: 'PENDIENTE DE ASIGNACION'
              },
              fechaHoraCreacion: '2020-11-24T18:41:20.096+00:00',
              equipo: null,
              tractor: null,
              chofer: null,
              usuario: null,
              transportista: null,
              alamcen: {
                descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                direccion: 'PEREZ QUINTANA 3850',
                localidad: 'ITUZAINGO',
                provincia: 'BUENOS AIRES',
                almacen: '002',
                idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
              },
              idMuelle: null,
              notificacion: null,
              observaciones: null,
              timestamp: '2020-11-24T18:41:20.145+00:00'
            },
            {
              idDetallePlanificacion: 12109,
              estado: {
                codigo: '85',
                descripcion: 'CANCELADO POR PLANIFICADOR'
              },
              fechaHoraCreacion: '2020-11-25T15:17:44.173+00:00',
              equipo: null,
              tractor: null,
              chofer: null,
              usuario: {
                idUsuario: 5,
                user: 'admin',
                password: '321',
                nombre: 'Admin',
                apellido: 'Administrador',
                email: 'admin',
                telefono: '+5491131744121',
                habilitado: true,
                transportista: null,
                timestamp: '2020-10-30T12:49:23.708+00:00',
                usuarioRol: [
                  {
                    idUsuarioRol: 5,
                    rol: {
                      idRol: 45,
                      descripcion: 'ADMINISTRADOR',
                      timeStamp: '2020-10-08T16:06:19.699+00:00',
                      idDescripcion: '[45]ADMINISTRADOR'
                    },
                    timestamp: null
                  }
                ]
              },
              transportista: null,
              alamcen: {
                descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                direccion: 'PEREZ QUINTANA 3850',
                localidad: 'ITUZAINGO',
                provincia: 'BUENOS AIRES',
                almacen: '002',
                idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
              },
              idMuelle: null,
              notificacion: null,
              observaciones: null,
              timestamp: '2020-11-25T15:17:44.215+00:00'
            }
          ],
          timestamp: '2020-11-25T15:17:44.085+00:00'
      },
      ];

      let dataError, dataResponse;

      // act
      console.log(service);
      service.getAll()
        .subscribe(response => {
          dataResponse = response;
        }, error => {
          dataError = error;
        });
      const req = httpTestingController.expectOne(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/all`);
      req.flush(expectData);

      // assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });


  describe('tests for getById', () => {

    it('should return CabeceraPlanificacion', () => {

      // arrange
      const expectData = [
        {
            idCabeceraPlanificacion: 12213,
            numeroPlanificacion: null,
            almacen: {
              descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
              direccion: 'PEREZ QUINTANA 3850',
              localidad: 'ITUZAINGO',
              provincia: 'BUENOS AIRES',
              almacen: '002',
              idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
            },
            destino: {
              destino: '040',
              nombre: 'CENTRO DE DISTRIBUCIÓN.USHUAIA',
              direccion: 'PERITO MORENO 4440',
              localidad: 'USHUAIA',
              provincia: 'TIERRA DE FUEGO',
              casillaCorreo: null,
              telefonoContacto: null,
              duracionViaje: '8',
              diasAnticipacionTurno: '2',
              idDescripcion: '[040]CENTRO DE DISTRIBUCIÓN.USHUAIA'
            },
            fechaCarga: '20201125',
            horaCarga: '10:00',
            tipoCarga: 'SEC',
            estado: {
              codigo: '85',
              descripcion: 'CANCELADO POR PLANIFICADOR'
            },
            cancelable: true,
            fechaHoraCreacion: null,
            fechaHoraModificacion: null,
            equipo: null,
            tractor: null,
            chofer: null,
            usuarioCreador: {
              idUsuario: 5,
              user: 'admin',
              password: '321',
              nombre: 'Admin',
              apellido: 'Administrador',
              email: 'admin',
              telefono: '+5491131744121',
              habilitado: true,
              transportista: null,
              timestamp: '2020-10-30T12:49:23.708+00:00',
              usuarioRol: [
                {
                  idUsuarioRol: 5,
                  rol: {
                    idRol: 45,
                    descripcion: 'ADMINISTRADOR',
                    timeStamp: '2020-10-08T16:06:19.699+00:00',
                    idDescripcion: '[45]ADMINISTRADOR'
                  },
                  timestamp: null
                }
              ]
            },
            usuarioModificador: {
              idUsuario: 5,
              user: 'admin',
              password: '321',
              nombre: 'Admin',
              apellido: 'Administrador',
              email: 'admin',
              telefono: '+5491131744121',
              habilitado: true,
              transportista: null,
              timestamp: '2020-10-30T12:49:23.708+00:00',
              usuarioRol: [
               {
                  idUsuarioRol: 5,
                  rol: {
                    idRol: 45,
                    descripcion: 'ADMINISTRADOR',
                    timeStamp: '2020-10-08T16:06:19.699+00:00',
                    idDescripcion: '[45]ADMINISTRADOR'
                  },
                  timestamp: null
                }
              ]
            },
            usuarioCancelador: null,
            observacion: null,
            transportista: null,
            colDetallePlanificacionViajes: [
              {
                idDetallePlanificacion: 12046,
                estado: {
                  codigo: '00',
                  descripcion: 'PENDIENTE DE ASIGNACION'
                },
                fechaHoraCreacion: '2020-11-24T18:41:20.096+00:00',
                equipo: null,
                tractor: null,
                chofer: null,
                usuario: null,
                transportista: null,
                alamcen: {
                  descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                  direccion: 'PEREZ QUINTANA 3850',
                  localidad: 'ITUZAINGO',
                  provincia: 'BUENOS AIRES',
                  almacen: '002',
                  idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
                },
                idMuelle: null,
                notificacion: null,
                observaciones: null,
                timestamp: '2020-11-24T18:41:20.145+00:00'
              },
              {
                idDetallePlanificacion: 12109,
                estado: {
                  codigo: '85',
                  descripcion: 'CANCELADO POR PLANIFICADOR'
                },
                fechaHoraCreacion: '2020-11-25T15:17:44.173+00:00',
                equipo: null,
                tractor: null,
                chofer: null,
                usuario: {
                  idUsuario: 5,
                  user: 'admin',
                  password: '321',
                  nombre: 'Admin',
                  apellido: 'Administrador',
                  email: 'admin',
                  telefono: '+5491131744121',
                  habilitado: true,
                  transportista: null,
                  timestamp: '2020-10-30T12:49:23.708+00:00',
                  usuarioRol: [
                    {
                      idUsuarioRol: 5,
                      rol: {
                        idRol: 45,
                        descripcion: 'ADMINISTRADOR',
                        timeStamp: '2020-10-08T16:06:19.699+00:00',
                        idDescripcion: '[45]ADMINISTRADOR'
                      },
                      timestamp: null
                    }
                  ]
                },
                transportista: null,
                alamcen: {
                  descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                  direccion: 'PEREZ QUINTANA 3850',
                  localidad: 'ITUZAINGO',
                  provincia: 'BUENOS AIRES',
                  almacen: '002',
                  idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
                },
                idMuelle: null,
                notificacion: null,
                observaciones: null,
                timestamp: '2020-11-25T15:17:44.215+00:00'
              }
            ],
            timestamp: '2020-11-25T15:17:44.085+00:00'
        },
      ];

      let dataError, dataResponse;
      let id;
      // act
      console.log(service);
      service.getById(id)
        .subscribe(response => {
          dataResponse = response;
        }, error => {
          dataError = error;
        });
      const req = httpTestingController.expectOne(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/${id}`);
      req.flush(expectData);

      // assert
      expect(dataResponse.length).toEqual(1);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });

  xdescribe('tests for getAsignadosByTransportista', () => {

    it('should return CabecerasPlanificacion', () => {

      // arrange
      const expectData = [
        {
            idCabeceraPlanificacion: 12213,
            numeroPlanificacion: null,
            almacen: {
              descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
              direccion: 'PEREZ QUINTANA 3850',
              localidad: 'ITUZAINGO',
              provincia: 'BUENOS AIRES',
              almacen: '002',
              idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
            },
            destino: {
              destino: '040',
              nombre: 'CENTRO DE DISTRIBUCIÓN.USHUAIA',
              direccion: 'PERITO MORENO 4440',
              localidad: 'USHUAIA',
              provincia: 'TIERRA DE FUEGO',
              casillaCorreo: null,
              telefonoContacto: null,
              duracionViaje: '8',
              diasAnticipacionTurno: '2',
              idDescripcion: '[040]CENTRO DE DISTRIBUCIÓN.USHUAIA'
            },
            fechaCarga: '20201125',
            horaCarga: '10:00',
            tipoCarga: 'SEC',
            estado: {
              codigo: '85',
              descripcion: 'CANCELADO POR PLANIFICADOR'
            },
            cancelable: true,
            fechaHoraCreacion: null,
            fechaHoraModificacion: null,
            equipo: null,
            tractor: null,
            chofer: null,
            usuarioCreador: {
              idUsuario: 5,
              user: 'admin',
              password: '321',
              nombre: 'Admin',
              apellido: 'Administrador',
              email: 'admin',
              telefono: '+5491131744121',
              habilitado: true,
              transportista: null,
              timestamp: '2020-10-30T12:49:23.708+00:00',
              usuarioRol: [
                {
                  idUsuarioRol: 5,
                  rol: {
                    idRol: 45,
                    descripcion: 'ADMINISTRADOR',
                    timeStamp: '2020-10-08T16:06:19.699+00:00',
                    idDescripcion: '[45]ADMINISTRADOR'
                  },
                  timestamp: null
                }
              ]
            },
            usuarioModificador: {
              idUsuario: 5,
              user: 'admin',
              password: '321',
              nombre: 'Admin',
              apellido: 'Administrador',
              email: 'admin',
              telefono: '+5491131744121',
              habilitado: true,
              transportista: null,
              timestamp: '2020-10-30T12:49:23.708+00:00',
              usuarioRol: [
               {
                  idUsuarioRol: 5,
                  rol: {
                    idRol: 45,
                    descripcion: 'ADMINISTRADOR',
                    timeStamp: '2020-10-08T16:06:19.699+00:00',
                    idDescripcion: '[45]ADMINISTRADOR'
                  },
                  timestamp: null
                }
              ]
            },
            usuarioCancelador: null,
            observacion: null,
            transportista: null,
            colDetallePlanificacionViajes: [
              {
                idDetallePlanificacion: 12046,
                estado: {
                  codigo: '00',
                  descripcion: 'PENDIENTE DE ASIGNACION'
                },
                fechaHoraCreacion: '2020-11-24T18:41:20.096+00:00',
                equipo: null,
                tractor: null,
                chofer: null,
                usuario: null,
                transportista: null,
                alamcen: {
                  descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                  direccion: 'PEREZ QUINTANA 3850',
                  localidad: 'ITUZAINGO',
                  provincia: 'BUENOS AIRES',
                  almacen: '002',
                  idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
                },
                idMuelle: null,
                notificacion: null,
                observaciones: null,
                timestamp: '2020-11-24T18:41:20.145+00:00'
              },
              {
                idDetallePlanificacion: 12109,
                estado: {
                  codigo: '85',
                  descripcion: 'CANCELADO POR PLANIFICADOR'
                },
                fechaHoraCreacion: '2020-11-25T15:17:44.173+00:00',
                equipo: null,
                tractor: null,
                chofer: null,
                usuario: {
                  idUsuario: 5,
                  user: 'admin',
                  password: '321',
                  nombre: 'Admin',
                  apellido: 'Administrador',
                  email: 'admin',
                  telefono: '+5491131744121',
                  habilitado: true,
                  transportista: null,
                  timestamp: '2020-10-30T12:49:23.708+00:00',
                  usuarioRol: [
                    {
                      idUsuarioRol: 5,
                      rol: {
                        idRol: 45,
                        descripcion: 'ADMINISTRADOR',
                        timeStamp: '2020-10-08T16:06:19.699+00:00',
                        idDescripcion: '[45]ADMINISTRADOR'
                      },
                      timestamp: null
                    }
                  ]
                },
                transportista: null,
                alamcen: {
                  descripcion: 'REFRIGERAD - EST.SANITARIO NRO 3584',
                  direccion: 'PEREZ QUINTANA 3850',
                  localidad: 'ITUZAINGO',
                  provincia: 'BUENOS AIRES',
                  almacen: '002',
                  idDescripcion: '[002]REFRIGERAD - EST.SANITARIO NRO 3584'
                },
                idMuelle: null,
                notificacion: null,
                observaciones: null,
                timestamp: '2020-11-25T15:17:44.215+00:00'
              }
            ],
            timestamp: '2020-11-25T15:17:44.085+00:00'
        },
      ];

      let dataError, dataResponse;
      let transportista: Transportista;
      transportista.codigo='1';
      // act

      console.log(service);
      service.getAsignadosByTransportista(transportista)
        .subscribe(response => {
          dataResponse = response;
        }, error => {
          dataError = error;
        });
      const req = httpTestingController.expectOne(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/asignados/transportista/${transportista.codigo}`);
      req.flush(expectData);

      // assert
      expect(dataResponse.length).toEqual(1);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });


});
