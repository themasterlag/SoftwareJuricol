import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  tipoAmbiente:string = null;

  rutas={
    desarrollo:"https://localhost/GitHub/juricol/recursos/",
    produccion:"http://juricoltolima.com/juricol_recursos/juricol/recursos/"
  }

  constructor(private cookieService: CookieService) {
  }

  public SetTipoAmbiente(Tipo:string){
    this.cookieService.set("ambiente",Tipo);
  }

  public IdentificarTipoAmbiente(){
    this.tipoAmbiente = this.cookieService.get("ambiente");
  }

  public GetRutaAmbiente(){
    if(this.tipoAmbiente == "desarrollo"){
      return this.rutas.desarrollo
    }
    if(this.tipoAmbiente == "produccion"){
      return this.rutas.produccion
    }
  }

}
