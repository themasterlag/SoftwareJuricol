import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDemandaComponent } from './registrar-demanda.component';

describe('RegistrarDemandaComponent', () => {
  let component: RegistrarDemandaComponent;
  let fixture: ComponentFixture<RegistrarDemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarDemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
