import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';
import { AmbienteService } from 'src/app/servicios/ambiente.service';

@Component({
  selector: 'app-lista-cargos',
  templateUrl: './lista-cargos.component.html',
  styleUrls: ['./lista-cargos.component.css']
})
export class ListaCargosComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();

  id:number = null;
  nombre:string = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  listaCargos:Object = null;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient,  private ambienteService: AmbienteService) { 
    this.controladorParametrizacion = new Parametrizacion(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
  }

  ngOnInit() {
    this.controladorParametrizacion.SetTipo("cargos");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaCargos = this.controladorParametrizacion.GetListaDatos();
        
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

  guardarCargo(){
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
          }
        );
      }
    }
  }


  // desactiva el modal de registrar o  editar tipo de la interfaz
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
        if(respuesta == null){
          this.error = this.controladorParametrizacion.GetError();
          swal({
            type: 'error',
            title: this.error,
            timer: 5000
          });
        }
        else{
          swal({
            type: 'success',
            title: "Eliminacion realizada satisfactoriamente",
            timer: 5000
          });
          this.ngOnInit();
        }
      }
    );
    
  }

}
