import { HttpClient, HttpHeaders} from '@angular/common/http'; //Importacion de la libreria HttpClient y HttpHeaders 
export class PDF  {


    
     constructor(private http: HttpClient) {

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
         return this.http.post('http://localhost/GitHub/juricol/recursos/validar.php',
          {           
                
             accion : accionPDF,
             Movimientos : this.Movimiento
     
           },{headers:new HttpHeaders ({"content-type":"application/json"})} // Tipo de contenido que va a enviar el recurso
     );
 }
   }