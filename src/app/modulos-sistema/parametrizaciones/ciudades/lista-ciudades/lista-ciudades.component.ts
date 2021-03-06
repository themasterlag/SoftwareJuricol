import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';
import { AmbienteService } from 'src/app/servicios/ambiente.service';

@Component({
  selector: 'app-lista-ciudades',
  templateUrl: './lista-ciudades.component.html',
  styleUrls: ['./lista-ciudades.component.css']
})

export class ListaCiudadesComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();

  listaDepartamentos:Object;
  listaPaises:Object;

  id:number = null;
  nombre:string = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  listaCiudades:Object = null;
  departamento:number = 0;
  pais:number = 0;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient,  private ambienteService: AmbienteService) { 
    autenticadorService.ProcesarToken();
    this.controladorParametrizacion = new Parametrizacion(this.http, this.ambienteService);
  }

  ngOnInit() {
    this.controladorParametrizacion.SetIdRelacion(null);

    this.controladorParametrizacion.SetTipo("paises");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaPaises = this.controladorParametrizacion.GetListaDatos();
        // console.log(this.listaPaises);
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
    this.controladorParametrizacion.SetTipo("ciudades");

    if(this.nombre == null){
      this.error = "Ingrese un nombre valido";
    }
    else{
      if(this.pais == 0){
        this.error = "Seleccione un pais";
      }
      else{
        if(this.departamento == 0){
          this.error = "Seleccione un departamento";
        }
        else{
          swal('Cargando');
          swal.showLoading();
          if(this.tipoAccion == false){
            this.controladorParametrizacion.SetId(null);
            this.controladorParametrizacion.SetNombre(this.nombre);
            this.controladorParametrizacion.SetIdRelacion(this.departamento);
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
            this.controladorParametrizacion.SetIdRelacion(this.departamento);
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
    }
  }


  // desactiva el modal de registrar o  editar tipo de la interfaz
  cerrarModal(){
    this.id = null;
    this.nombre = null;
    this.departamento = 0;
    this.pais = 0;
    this.error = null;
    this.listaDepartamentos = null;
    document.getElementById('id01').style.display='none';
  }

  editar(Id,Nombre,departamento){
    this.id = Id;
    this.nombre = Nombre;
    this.departamento = departamento;
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

  mostrarDepartamentos(){
    this.controladorParametrizacion.SetIdRelacion(this.pais);
    this.controladorParametrizacion.SetTipo("departamentos");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaDepartamentos = this.controladorParametrizacion.GetListaDatos();
        // console.log(this.listaDepartamentos);
      }
    );
  }
}