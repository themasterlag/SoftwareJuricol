import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstadosDemandaComponent } from './lista-estados-demanda.component';

describe('ListaEstadosDemandaComponent', () => {
  let component: ListaEstadosDemandaComponent;
  let fixture: ComponentFixture<ListaEstadosDemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstadosDemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstadosDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
