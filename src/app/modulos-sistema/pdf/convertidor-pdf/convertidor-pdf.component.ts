import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Router, Routes }  from '@angular/router';
import {PDF}from '../../../controladores/pdf'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AutenticadorService } from '../../../servicios/autenticador.service';

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
  DatosEvnio:Array<Object>=[]

  PDF : PDF ;
  private token = this.autenticadorService.GetToken();
  constructor(private route : Router,private autenticadorService: AutenticadorService, private http: HttpClient) {
    this.PDF = new PDF(http);
    this.uploader = new FileUploader({
      url:  'http://localhost/GitHub/juricol/recursos/validar.php?accion=pdf',
      authToken: this.token,
      authTokenHeader: 'Authorization',
      isHTML5: true,
      removeAfterUpload: true
    });
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
      if (status === 200) {
        swal({
          type: 'success',
          title: 'Se subió correctamente el archivo!',
          timer: 5000
        
        });
       let i
       this.ObtenerDatos = JSON.parse(response);
       this.ObtenerDatos= this.ObtenerDatos['mensaje'];

       for(i = 0 ; i < this.ObtenerDatos.length; i++ ){
        this.ObtenerDatos[i]['Descripcion'] = "";
        
      }
      } else {
        swal({
          type: 'error',
          title: 'Hubo un error al intentar subir el archivo',
          timer: 5000
        });
      }
      
    };
  }

  fileOverBase(e) {
    this.hasBaseDropZoneOver = e;
  }

  abrirVentana(ventana) {
    ventana.click();
  }

  ProcesarDatos(){
   
let i


  for(i = 0; i < this.ObtenerDatos.length; i++){
    let registro: Object = new Object();

    registro['IdDemanda']=this.ObtenerDatos[i]['IdDemanda'];
    registro['IdEstadoDemanda']= this.ObtenerDatos[i]['IdNuevoEstado'];
    registro['FechaMovimiento']= this.ObtenerDatos[i]['FechaCambio'];
    registro['FechaLimite']= this.ObtenerDatos[i]['FechaLimite'];
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
    this.route.navigate(["/login"]);
  }

}
