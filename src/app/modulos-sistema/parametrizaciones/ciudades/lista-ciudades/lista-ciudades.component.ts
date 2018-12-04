import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';

@Component({
  selector: 'app-lista-ciudades',
  templateUrl: './lista-ciudades.component.html',
  styleUrls: ['./lista-ciudades.component.css']
})
export class ListaCiudadesComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();

  listaDepartamentos:Object;

  id:number = null;
  nombre:string = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  listaCiudades:Object = null;
  departamento:number = 0;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient) { 
    this.controladorParametrizacion = new Parametrizacion(this.http);
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit() {
    this.controladorParametrizacion.SetIdRelacion(null);

    this.controladorParametrizacion.SetTipo("departamentos");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaDepartamentos = this.controladorParametrizacion.GetListaDatos();
        // console.log(this.listaCiudades);
      }
    );

    this.controladorParametrizacion.SetTipo("ciudades");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaCiudades = this.controladorParametrizacion.GetListaDatos();
        // console.log(this.listaCiudades);
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
      if(this.departamento == 0){
        this.error = "Seleccione un pais";
      }
      else{
        if(this.tipoAccion == false){
          this.controladorParametrizacion.SetNombre(this.nombre);
          this.controladorParametrizacion.SetIdRelacion(this.departamento);
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
          this.controladorParametrizacion.SetIdRelacion(this.departamento);
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
    this.departamento = 0;
    this.error = null;
    document.getElementById('id01').style.display='none';
  }

  editar(Id,Nombre,departamento){
    this.id = Id;
    this.nombre = Nombre;
    this.departamento = departamento;
    this.activarModal("editar");
  }


  eliminar(Id){
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
