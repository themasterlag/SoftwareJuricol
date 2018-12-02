import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDemandaComponent } from './ver-demanda.component';

describe('VerDemandaComponent', () => {
  let component: VerDemandaComponent;
  let fixture: ComponentFixture<VerDemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
