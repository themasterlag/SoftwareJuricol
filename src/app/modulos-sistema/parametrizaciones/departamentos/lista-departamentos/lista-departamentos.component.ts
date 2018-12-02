import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.css']
})
export class ListaDepartamentosComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();

  listaPaises:Object;

  id:number = null;
  nombre:string = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  listaTipos:Object = null;
  pais:number = 0;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient) { 
    this.controladorParametrizacion = new Parametrizacion(this.http);
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit() {
    this.controladorParametrizacion.SetTipo("paises");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaPaises = this.controladorParametrizacion.GetListaDatos();
        // console.log(this.listaTipos);
      }
    );

    this.controladorParametrizacion.SetTipo("departamentos");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaTipos = this.controladorParametrizacion.GetListaDatos();
        // console.log(this.listaTipos);
      }
    );
  }

  // activa el modal de registrar o editar tipo en la interfaz
  activarModal(TipoAccion){
    if(TipoAccion == "crear"){
      this.tipoAccion = false;
    }
    else{
      this.tipoAccion = true;
    }
    document.getElementById('id01').style.display='block';
  }

  guardarDepartamento(){
    if(this.nombre == null){
      this.error = "Ingrese un nombre valido";
    }
    else{
      if(this.pais == 0){
        this.error = "Seleccione un pais";
      }
      else{
        if(this.tipoAccion == false){
          this.controladorParametrizacion.SetNombre(this.nombre);
          this.controladorParametrizacion.SetIdRelacion(this.pais);
          this.controladorParametrizacion.GuardarParametrizacion().subscribe(
            response =>{
              this.cerrarModal();
              this.ngOnInit();
            }
          );
        }
        else{
          this.controladorParametrizacion.SetId(this.id);
          this.controladorParametrizacion.SetNombre(this.nombre);
          this.controladorParametrizacion.SetIdRelacion(this.pais);
          this.controladorParametrizacion.GuardarParametrizacion().subscribe(
            response =>{
              this.cerrarModal();
              this.ngOnInit();
            }
          );
        }
      }
    }
  }



  // desactiva el modal de registrar o  editar tipo de la interfaz
  cerrarModal(){
    this.nombre = null;
    this.pais = 0;
    this.error = null;
    document.getElementById('id01').style.display='none';
  }

  editar(Id,Nombre,Pais){
    this.id = Id;
    this.nombre = Nombre;
    this.pais = Pais;
    this.activarModal("editar");
  }



}
