import { Component } from '@angular/core';

import { AutenticadorService } from './servicios/autenticador.service';
import { AmbienteService } from './servicios/ambiente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SoftwareJuricol';

  constructor(private servicioSesion: AutenticadorService, private ambienteService: AmbienteService){
    // this.ambienteService.SetTipoAmbiente("desarrollo");
    this.ambienteService.SetTipoAmbiente("");
  }
}