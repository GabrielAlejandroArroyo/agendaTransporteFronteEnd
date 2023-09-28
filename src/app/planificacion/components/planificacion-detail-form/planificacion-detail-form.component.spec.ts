import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionDetailFormComponent } from './planificacion-detail-form.component';

xdescribe('PlanificacionDetailFormComponent', () => {
  let component: PlanificacionDetailFormComponent;
  let fixture: ComponentFixture<PlanificacionDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
