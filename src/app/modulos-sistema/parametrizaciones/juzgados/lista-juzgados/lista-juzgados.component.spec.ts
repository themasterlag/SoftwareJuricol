import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJuzgadosComponent } from './lista-juzgados.component';

describe('ListaJuzgadosComponent', () => {
  let component: ListaJuzgadosComponent;
  let fixture: ComponentFixture<ListaJuzgadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaJuzgadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaJuzgadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
