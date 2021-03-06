import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';
import swal from 'sweetalert2';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-lista-tipos-procesos',
  templateUrl: './lista-tipos-procesos.component.html',
  styleUrls: ['./lista-tipos-procesos.component.css']
})
export class ListaTiposProcesosComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();


  id:number = null;
  nombre:string = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  listaTipos:Object = null;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient, private ambienteService: AmbienteService) { 
    this.controladorParametrizacion = new Parametrizacion(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
  }

  ngOnInit() {
    this.controladorParametrizacion.SetTipo("tiposProcesos");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaTipos  = this.controladorParametrizacion.GetListaDatos();
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

  guardarEstado(){
    if(this.nombre == null){
      this.error = "Ingrese un nombre valido";
    }
    else{
      swal('Cargando');
      swal.showLoading();
      if(this.tipoAccion == false){
        this.controladorParametrizacion.SetId(null);
        this.controladorParametrizacion.SetNombre(this.nombre);
        this.controladorParametrizacion.GuardarParametrizacion().subscribe(
          response =>{
            swal({
              type: 'success',
              title: "Registro realizado correctamente",
              timer: 5000
            });
            this.cerrarModal();
            this.ngOnInit();
          }, error =>{
            swal({
              type: 'error',
              title: "Ocurrio un error al realizar el registro",
              timer: 5000
            })
            this.cerrarModal();
            this.ngOnInit();
          }
        );
      }
      else{
        this.controladorParametrizacion.SetId(this.id);
        this.controladorParametrizacion.SetNombre(this.nombre);
        this.controladorParametrizacion.GuardarParametrizacion().subscribe(
          response =>{
            swal({
              type: 'success',
              title: "Registro realizado correctamente",
              timer: 5000
            });
            this.cerrarModal();
            this.ngOnInit();
          }, error =>{
            swal({
              type: 'error',
              title: "Ocurrio un error al realizar el registro",
              timer: 5000
            })
            this.cerrarModal();
            this.ngOnInit();
          }
        );
      }
    }
  }

  // desactiva el modal de registrar o editar, de la interfaz
  cerrarModal(){
    this.id = null;
    this.nombre = null;
    this.error = null;
    document.getElementById('id01').style.display='none';
  }


  editar(Id,Nombre){
    this.id = Id;
    this.nombre = Nombre;
    this.activarModal("editar");
  }

  eliminar(Id){
    swal('Cargando');
    swal.showLoading();
    this.id = Id;
    this.controladorParametrizacion.SetId(this.id);
    this.controladorParametrizacion.EliminarParametrizacion().add(
      response =>{
        let respuesta = this.controladorParametrizacion.GetRespuesta();
        if(respuesta != 1){
          this.error = this.controladorParametrizacion.GetError();
          swal({
            type: 'error',
            title: "Ocurrio un error en la eliminacion",
            timer: 5000
          });
        }
        else{
          if(respuesta == 1){
            swal({
              type: 'success',
              title: "Eliminacion realizada satisfactoriamente",
              timer: 5000
            });
            this.ngOnInit();
          }
          else{
            swal({
              type: 'error',
              title: "Ocurrio un error en la eliminacion",
              timer: 5000
            });
            this.ngOnInit();
          }
        }
      }
    );
  }

}