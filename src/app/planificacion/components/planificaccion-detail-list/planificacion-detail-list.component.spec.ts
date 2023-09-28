import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionDetailListComponent } from './planificacion-detail-list.component';

xdescribe('DetailListComponent', () => {
  let component: PlanificacionDetailListComponent;
  let fixture: ComponentFixture<PlanificacionDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
