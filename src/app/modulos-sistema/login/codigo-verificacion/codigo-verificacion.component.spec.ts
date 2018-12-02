import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoVerificacionComponent } from './codigo-verificacion.component';

describe('CodigoVerificacionComponent', () => {
  let component: CodigoVerificacionComponent;
  let fixture: ComponentFixture<CodigoVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
