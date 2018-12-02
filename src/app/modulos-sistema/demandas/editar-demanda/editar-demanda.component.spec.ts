import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDemandaComponent } from './editar-demanda.component';

describe('EditarDemandaComponent', () => {
  let component: EditarDemandaComponent;
  let fixture: ComponentFixture<EditarDemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
