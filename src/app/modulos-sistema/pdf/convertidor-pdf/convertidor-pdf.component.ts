import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Router, Routes }  from '@angular/router';
import {PDF}from '../../../controladores/pdf'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { isArray } from 'util';


@Component({
  selector: 'app-convertidor-pdf',
  templateUrl: './convertidor-pdf.component.html',
  styleUrls: ['./convertidor-pdf.component.css']
})
export class ConvertidorPdfComponent implements OnInit {
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  config;
  ObtenerDatos:Array<Object>=[];   
  DatosEvnio:Array<Object>=[];
  Estados:Array<Object>=[];

  PDF : PDF ;
  private token = this.autenticadorService.GetToken();
  constructor(private route : Router,private autenticadorService: AutenticadorService, private http: HttpClient) {
    if(autenticadorService.ProcesarToken() == false) {
      this.route.navigate(["/login"]);
    }
    this.PDF = new PDF(http);
    this.uploader = new FileUploader({
      url:  'http://localhost/GitHub/juricol/recursos/validar.php?accion=pdf',
      authToken: this.token,
      authTokenHeader: 'Authorization',
      isHTML5: true,
      removeAfterUpload: true
    });
   
  }

  ConsultarEstados(){
    this.PDF.ObtenerEstados().subscribe(
      responde=>{
      
        this.Estados = responde['mensaje']
      }
    )
  }
  
 
  ngOnInit() {
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      item.withCredentials = false;
      item.alias = 'MiArchivo';
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      let respuesta
      respuesta = JSON.parse(response);
      if (status === 200) {
        swal({
          type: 'success',
          title: 'Se subió correctamente el archivo!',
          timer: 5000
        
        });
       let i
   
       
   
       
      if (isArray(respuesta['mensaje']) == false){
              swal({
               type: 'success',
               title: respuesta['mensaje'],
               timer: 5000
             });
      }
      else{
      
       this.ObtenerDatos = respuesta['mensaje']; 
       this.ConsultarEstados();
       for(i = 0 ; i < this.ObtenerDatos.length; i++ ){
        this.ObtenerDatos[i]['Descripcion'] = "";
        
        this.ObtenerDatos[i]['Estado'] = this.ObtenerDatos[i]['IdNuevoEstado'];
      }
      }
      
      } 
      else {
        swal({
          type: 'error',
          title: respuesta['mensaje'],
          timer: 5000
        });
      }
      
    },err=>{
    
      swal({
        type: 'error',
        title: err.error['mensaje'],
        timer: 5000
      });
     
    }
  }

  fileOverBase(e) {
    this.hasBaseDropZoneOver = e;
  }

  abrirVentana(ventana) { 
      this.ObtenerDatos = null;
        this.DatosEvnio = []; 
    ventana.click();
  }

  ProcesarDatos(){
   
let i


  for(i = 0; i < this.ObtenerDatos.length; i++){
    let registro: Object = new Object();

    registro['IdDemanda']=this.ObtenerDatos[i]['IdDemanda'];
    registro['IdEstadoDemanda']= this.ObtenerDatos[i]['Estado'];
    if(registro['IdEstadoDemanda'] == null || registro['IdEstadoDemanda'] == undefined || registro['IdEstadoDemanda'] == ''|| registro['IdEstadoDemanda'] == 0){
      swal({
        type: 'error',
        title: 'Falta elegir estado en la Demanda '+this.ObtenerDatos[i]['IdDemanda'],
        timer: 5000
      
      });
      
   
      this.DatosEvnio = [];
      return false
    }

    registro['FechaMovimiento']= this.ObtenerDatos[i]['FechaCambio'];
    registro['FechaLimite']= this.ObtenerDatos[i]['FechaLimite'];
    if(registro['FechaLimite'] == null || registro['FechaLimite'] == undefined || registro['FechaLimite'] == ''){
      swal({
        type: 'error',
        title: 'Falta fecha limite en la Demanda '+this.ObtenerDatos[i]['IdDemanda'],
        timer: 5000
      
      });
      
   
      this.DatosEvnio = [];
      return false
    }
    registro['Descripcion']= this.ObtenerDatos[i]['Descripcion'];

 
    this.DatosEvnio.push(registro);
  
  }
 this.PDF.SetMovimiento(this.DatosEvnio);

 this.PDF.EnviarMovimiento().subscribe(
   response=>{
     if(response['codigo'] == 200){

      swal({
        type: 'success',
        title: 'Se guardo correctamente los cambios',
        timer: 5000
      
      });
      this.ObtenerDatos = null;
      this.DatosEvnio = [];
     }
    
   }
 )
  }
  Cancelar(){
    this.ObtenerDatos = null;
      this.DatosEvnio = [];
  }
}
