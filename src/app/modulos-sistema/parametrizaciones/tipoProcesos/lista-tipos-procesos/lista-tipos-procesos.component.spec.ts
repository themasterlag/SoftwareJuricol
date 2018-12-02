import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposProcesosComponent } from './lista-tipos-procesos.component';

describe('ListaTiposProcesosComponent', () => {
  let component: ListaTiposProcesosComponent;
  let fixture: ComponentFixture<ListaTiposProcesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTiposProcesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTiposProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
