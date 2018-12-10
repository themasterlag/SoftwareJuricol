import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  rutas={
    desarrollo:"https://localhost/GitHub/juricol/recursos/",
    produccion:"http://juricoltolima.com/juricol_recursos/juricol/recursos/"
  }

  constructor() { }

  set tipoAmbiente(tipo){

  }
}
