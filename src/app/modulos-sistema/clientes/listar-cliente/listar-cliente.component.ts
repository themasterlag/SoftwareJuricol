import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; //Importacion de la libreria HttpClient y HttpHeaders 
import { Cliente } from '../../../controladores/cliente';
import { Router, Routes }  from '@angular/router';
import * as momento from 'moment';
import { filter } from 'rxjs/operators';
import swal from 'sweetalert2';
import { AutenticadorService } from '../../../servicios/autenticador.service';

import { extendMoment } from 'moment-range';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
 
const moment = extendMoment(momento);
@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  Cliente: Cliente;
  ClientesJSON: Array<Object> = null;
  Cedulas: Array<Object> = [];
  filtro: string;
  rol: string;

  
  searchObject:any={
    Documento:"",
    Nombres:"",
    Apellidos:"",
    Telefono:"",
    Celular:"",
    Correo:"",
    Direccion:"",
    Edad:"",
    Estado:"",
    CiudadResidencia:""
  }
  
  constructor(private http : HttpClient ,private autenticadorService: AutenticadorService,private router: Router,  private ambienteService: AmbienteService) {
    if(autenticadorService.ProcesarToken() != false) {    
      this.Cliente = new Cliente(this.http, this.ambienteService);
      this.Recargar();
      this.rol = autenticadorService.GetRol();
    }
  }

  ngOnInit() {
  }
  
  
  ObtenerCedulas(){
    return this.Cedulas;
  }
  ObtenerDato(){
     return this.ClientesJSON ;
      
  }
  EditarCliente(id){
  this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+'/editarCliente/'+id)
  }
  Crear(){
    this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+'/registrarCliente');
  }
  
  EliminarCliente(id){
        this.Cliente.EliminarCliente(id).subscribe(
          response=>{
           
            if(response["codigo"] = 200){
             
                swal({
                  type: 'success',
                  title: 'Se realizo el cambio correctamente',
                  timer: 5000
                  
                });
                this.Recargar();
            }
           
              if(response["codigo"]==404){
                swal({
                  type: 'success',
                  title: response['mensaje'],
                  timer: 5000
                  
                });
                this.Recargar();
              }
                           
      
          },err => {
            if(err.error["codigo"]!=200){
              swal({
                type: 'error',
                title: err.error['mensaje'],
                timer: 5000
                
              });
              this.Recargar();
            }
          }
        );
    }
    
    
  
  
  Recargar(){
    let Hoy : any ;
    let fechaNaci : any;
    let Edad: any;
    let range : any;
    let color : number ;
    let dato : any ;
    let Activo = '';
    this.Cliente.BuscarClientes(Activo).subscribe(
  
      respuesta =>{
     
        this.ClientesJSON = respuesta["mensaje"];
          Hoy = moment();
          let i:any ;
         
          for(i = 0; i < this.ClientesJSON.length; i++) {
         
          fechaNaci = momento(this.ClientesJSON[i]["FechaNacimiento"]);
          Edad = Hoy.diff(fechaNaci,"years");
  
      
         let FechaN : Date ;
         let FechaA : Date ;
         
         FechaN = new Date(fechaNaci);
         FechaA = new Date();
  
       
         if(FechaA.getMonth() === FechaN.getMonth() && FechaA.getDate() > FechaN.getDate()){
         
             FechaN.setFullYear((FechaA.getFullYear()+1));
      
             range = moment.range(FechaA,FechaN );
             dato = (range.diff('days')+1);
             
         }
          else if(FechaA.getMonth() > FechaN.getMonth()){
         
            FechaN.setFullYear((FechaA.getFullYear()+1));
            range = moment.range(FechaA,FechaN );
            dato = (range.diff('days')+1);
            
          }
          else if(FechaA.getMonth() === FechaN.getMonth() && FechaA.getDate() === FechaN.getDate()){
            FechaN.setFullYear(FechaA.getFullYear());
            range = moment.range(FechaA,FechaN );
            dato = range.diff('days');
      
           }
           else{
            FechaN.setFullYear(FechaA.getFullYear());
            range = moment.range(FechaA,FechaN );
            dato = (range.diff('days')+1);
           }
       
      if(dato > 31  ){
        
        color = 3
      }
      else if(dato < 31 && dato > 7){
        color = 2
      }
      else if(dato <= 7 && dato > 0){
        color = 0
      }
      else if(dato === 0 ){
        color = 1
      }
        
      this.ClientesJSON[i]["dato"] = dato;
      this.ClientesJSON[i]["color"] = color;
      this.ClientesJSON[i]["Edad"] = Edad;
      if(this.ClientesJSON[i]["Estado"]== "Inactivo"){
        this.ClientesJSON[i]["Estado"] = 0;
      }
      else{
        this.ClientesJSON[i]["Estado"] = 1;
      }
      

      this.ClientesJSON[i]["Nombres"] = this.ClientesJSON[i]["PrimerNombre"]+" "+this.ClientesJSON[i]["SegundoNombre"];
      this.ClientesJSON[i]["Apellidos"] = this.ClientesJSON[i]["PrimerApellido"]+" "+this.ClientesJSON[i]["SegundoApellido"];
      
        }  
      
     }
   );
  }

}
