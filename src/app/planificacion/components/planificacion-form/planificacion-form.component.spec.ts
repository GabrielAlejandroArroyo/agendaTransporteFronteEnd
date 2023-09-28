import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionFormComponent } from './planificacion-form.component';

xdescribe('PlanificacionFormComponent', () => {
  let component: PlanificacionFormComponent;
  let fixture: ComponentFixture<PlanificacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
