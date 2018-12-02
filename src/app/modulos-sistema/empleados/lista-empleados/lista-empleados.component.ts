import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Empleado } from '../../../controladores/empleado';
import { Usuario } from '../../../controladores/usuario';
import { AutenticadorService } from '../../../servicios/autenticador.service';


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

  listaEmpleados:Object;

  controladorEmpleado: Empleado;


  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService) {
    //instanciacion de objeto Usuario y objeto Empleado
    this.controladorUsuario = new Usuario(this.http);
    this.controladorEmpleado = new Empleado(this.http);
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
  }


  //--------------Empleados---------------------------------
  ngOnInit() {
    //consulta de Empleados
    this.controladorEmpleado.BuscarEmpleados().add(
      response=>{
        this.listaEmpleados = this.controladorEmpleado.GetListaEmpleados();
      }
    );
   
  }


 
    verEmpleado(id){
      this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+'/editarEmpleado/'+id)
      
    }




  //----------------Usuarios--------------------------------

  crearUsuario(IdEmpleado){
    this.empleadoId = IdEmpleado;
    this.controladorUsuario.setEmpleado(this.empleadoId);

    this.controladorUsuario.CrearUsuario().subscribe(
      response =>{
        this.ngOnInit();
      }
    );
  }

  nuevoEmpleado(){
    this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+"/registrarEmpleado");
  }


}