import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClaveComponent } from './editar-clave.component';

describe('EditarClaveComponent', () => {
  let component: EditarClaveComponent;
  let fixture: ComponentFixture<EditarClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
