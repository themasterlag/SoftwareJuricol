import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoDocumentoComponent } from './lista-tipo-documento.component';

describe('ListaTipoDocumentoComponent', () => {
  let component: ListaTipoDocumentoComponent;
  let fixture: ComponentFixture<ListaTipoDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTipoDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
