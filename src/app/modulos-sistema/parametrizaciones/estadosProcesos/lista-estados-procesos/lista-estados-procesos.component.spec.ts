import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstadosProcesosComponent } from './lista-estados-procesos.component';

describe('ListaEstadosProcesosComponent', () => {
  let component: ListaEstadosProcesosComponent;
  let fixture: ComponentFixture<ListaEstadosProcesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstadosProcesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstadosProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
