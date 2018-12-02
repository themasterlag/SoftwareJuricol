import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaParentescosComponent } from './lista-parentescos.component';

describe('ListaParentescosComponent', () => {
  let component: ListaParentescosComponent;
  let fixture: ComponentFixture<ListaParentescosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaParentescosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaParentescosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
