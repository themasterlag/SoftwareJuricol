import { HttpClient, HttpHeaders} from '@angular/common/http'; //Importacion de la libreria HttpClient y HttpHeaders 
export class PDF  {


    
     constructor(private http: HttpClient) {

      }
ObtenerEstados(){// Recurso que permite consultar todas los Cargos posibles para los empleados
   return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarEstadosDemandas')

}
Movimiento:Array<Object>=[];
SetMovimiento(Movimeinto){
this.Movimiento = Movimeinto;
}
GetMovimiento(Movimeinto){
   return this.Movimiento ;
}
   EnviarMovimiento(){ // Recurso que permite el procesamiento del documeto PDF
  

    let accionPDF = "crearMovimiento";
         return this.http.post('https://localhost/GitHub/juricol/recursos/validar.php',
          {           
                
             accion : accionPDF,
             Movimientos : this.Movimiento
     
           },{headers:new HttpHeaders ({"content-type":"application/json"})} // Tipo de contenido que va a enviar el recurso
     );
 }
   }