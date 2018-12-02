import { TestBed, inject } from '@angular/core/testing';

import { AutenticadorService } from './servicios/autenticador.service';

describe('AutenticadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticadorService]
    });
  });

  it('should be created', inject([AutenticadorService], (service: AutenticadorService) => {
    expect(service).toBeTruthy();
  }));
});
