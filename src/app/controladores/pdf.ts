import { HttpClient, HttpHeaders } from '@angular/common/http'; //Importacion de la libreria HttpClient y HttpHeaders 
import { AmbienteService } from '../servicios/ambiente.service';
export class PDF {

   private ruta:string = null;

   constructor(private http: HttpClient, private ambienteService: AmbienteService) {
      this.ruta = this.ambienteService.GetRutaAmbiente();
   }

   ObtenerEstados() {// Recurso que permite consultar todas los Cargos posibles para los empleados
      return this.http.get(this.ruta + 'validar.php?accion=consultarEstadosDemandas')

   }
   Movimiento: Array<Object> = [];
   SetMovimiento(Movimeinto) {
      this.Movimiento = Movimeinto;
   }
   GetMovimiento(Movimeinto) {
      return this.Movimiento;
   }
   EnviarMovimiento() { // Recurso que permite el procesamiento del documeto PDF


      let accionPDF = "crearMovimiento";
      return this.http.post(this.ruta + 'validar.php',
         {

            accion: accionPDF,
            Movimientos: this.Movimiento

         }, { headers: new HttpHeaders({ "content-type": "application/json" }) } // Tipo de contenido que va a enviar el recurso
      );
   }
}