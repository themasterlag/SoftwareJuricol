import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInstitucionesLaboralesComponent } from './lista-instituciones-laborales.component';

describe('ListaInstitucionesLaboralesComponent', () => {
  let component: ListaInstitucionesLaboralesComponent;
  let fixture: ComponentFixture<ListaInstitucionesLaboralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInstitucionesLaboralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInstitucionesLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
