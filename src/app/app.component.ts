import { Component } from '@angular/core';

import { AutenticadorService } from './servicios/autenticador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SoftwareJuricol';

  constructor(private servicioSesion: AutenticadorService){ }
}