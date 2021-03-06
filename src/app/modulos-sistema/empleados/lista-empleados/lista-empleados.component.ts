import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Empleado } from '../../../controladores/empleado';
import { Usuario } from '../../../controladores/usuario';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { filter } from 'rxjs/operators';
import swal from 'sweetalert2';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})

export class ListaEmpleadosComponent implements OnInit {

// ----------------------------Crear usuarios------------------------------

  empleadoId:number = null;

  controladorUsuario:Usuario;

// ---------------------------Lista empleados------------------------------
  
  Roles:Array<Object>=[];
  listaEmpleados:Array<Object>=null;
  RolPropio:string;

  controladorEmpleado: Empleado;
 
  searchObjectEmpleados: any ={
    Documento:"",
    Nombres:"",
    Apellidos:"",
    NombreCargo:"",
    Especialidad:"",
    TarjetaProfesional:"",
    Celular:"",
    CorreoElectronico:"",
    Direccion:"",
    Estado:"",
    NombreCiudad:"",
    Titular:"",
    Rol:""
  }

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService, private ambienteService: AmbienteService) {
    //instanciacion de objeto Usuario y objeto Empleado
    this.controladorUsuario = new Usuario(this.http, this.ambienteService);
    this.controladorEmpleado = new Empleado(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
  }


  //--------------Empleados---------------------------------
  ngOnInit() {
    this.RolPropio = this.autenticadorService.GetRol();
    //consulta de Empleados
    this.controladorEmpleado.BuscarEmpleados().add(
      response=>{
        this.listaEmpleados = this.controladorEmpleado.GetListaEmpleados();
        let i 
        for(i = 0; i < this.listaEmpleados.length; i++){
          if(this.listaEmpleados[i]['IdRol'] == null || this.listaEmpleados[i]['IdRol'] == undefined){
            this.listaEmpleados[i]['IdRol'] = 0;
            this.listaEmpleados[i]['Rol'] = "Sin Rol";
          } 
        }
        
      }
    );
    this.controladorUsuario.BuscarRoles().add(
      response=>{
         this.Roles = this.controladorUsuario.GetRoles();
      }
    )
  }


 
    verEmpleado(id){
      this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+'/editarEmpleado/'+id)
      
    }




  //----------------Usuarios--------------------------------

  crearUsuario(IdEmpleado,Posicion){
    if(this.listaEmpleados[Posicion]['IdRol'] == 0 ){
      swal({
        type: 'error',
        title:"Seleccione un Rol",
        timer: 5000
      });

    }
    else{
      this.empleadoId = IdEmpleado;

      this.controladorUsuario.setEmpleado(this.empleadoId);
      this.controladorUsuario.SetRol(this.listaEmpleados[Posicion]['IdRol']);
  
      this.controladorUsuario.CrearUsuario().subscribe(
        response =>{
          if(response['codigo']==200){
            swal({
              type: 'success',
              title: response['mensaje'],
              timer: 5000
            });

            this.ngOnInit();
          }
          
          
        },err=>{
          if(err.error['codigo'] != 200){
            swal({
              type: 'error',
              title:'Fallo la Creacion de Usuario',
              timer: 5000
            });
          }
        }
      );
    }
    
  }

  nuevoEmpleado(){
    this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+"/registrarEmpleado");
  }


}