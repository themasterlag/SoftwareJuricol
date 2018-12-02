import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCiudadesComponent } from './lista-ciudades.component';

describe('ListaCiudadesComponent', () => {
  let component: ListaCiudadesComponent;
  let fixture: ComponentFixture<ListaCiudadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCiudadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
