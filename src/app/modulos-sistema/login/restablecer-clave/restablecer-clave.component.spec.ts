import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerClaveComponent } from './restablecer-clave.component';

describe('RestablecerClaveComponent', () => {
  let component: RestablecerClaveComponent;
  let fixture: ComponentFixture<RestablecerClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecerClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
