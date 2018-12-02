import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposDemandasComponent } from './lista-tipos-demandas.component';

describe('ListaTiposDemandasComponent', () => {
  let component: ListaTiposDemandasComponent;
  let fixture: ComponentFixture<ListaTiposDemandasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTiposDemandasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTiposDemandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
