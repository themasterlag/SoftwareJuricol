import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertidorPdfComponent } from './convertidor-pdf.component';

describe('ConvertidorPdfComponent', () => {
  let component: ConvertidorPdfComponent;
  let fixture: ComponentFixture<ConvertidorPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertidorPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertidorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
