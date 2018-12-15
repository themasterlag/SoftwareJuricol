import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';
import swal from 'sweetalert2';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-lista-instituciones-laborales',
  templateUrl: './lista-instituciones-laborales.component.html',
  styleUrls: ['./lista-instituciones-laborales.component.css']
})

export class ListaInstitucionesLaboralesComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();


  id:number = null;
  nombre:string = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  pais:number = null;
  listaPaises:Object = null;
  departamento:number = null;
  listaDepartamentos:Object = null;
  ciudad:number = null;
  listaCiudades:Object = null;

  listaInstituciones:Object = null;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient, private ambienteService: AmbienteService) { 
    this.controladorParametrizacion = new Parametrizacion(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
  }

  ngOnInit() {
    this.controladorParametrizacion.SetIdRelacion(null);

    this.controladorParametrizacion.SetTipo("paises");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaPaises = this.controladorParametrizacion.GetListaDatos();
      }
    );
    this.controladorParametrizacion.SetTipo("institucionesLaborales");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaInstituciones  = this.controladorParametrizacion.GetListaDatos();
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

  guardarEstado(){
    this.controladorParametrizacion.SetTipo("institucionesLaborales");
    if(this.nombre == null){
      this.error = "Ingrese un nombre valido";
    }
    else{
      if(this.tipoAccion == false){
        this.controladorParametrizacion.SetId(null);
        this.controladorParametrizacion.SetNombre(this.nombre);
        this.controladorParametrizacion.SetIdRelacion(this.ciudad);
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
        this.controladorParametrizacion.SetIdRelacion(this.ciudad);
        this.controladorParametrizacion.GuardarParametrizacion().subscribe(
          response =>{
            this.cerrarModal();
            this.ngOnInit();
          }
        );
      }
    }
  }

  mostrasDepartamentos(){
    this.controladorParametrizacion.SetTipo("departamentos");
    this.controladorParametrizacion.SetIdRelacion(this.pais);
    this.controladorParametrizacion.buscarDatosLista().add(
      response => {
        this.listaDepartamentos = this.controladorParametrizacion.GetListaDatos();
        if(this.listaDepartamentos == null){
          this.error = this.controladorParametrizacion.GetError();
        }
      }
    );
  }

  mostrasCiudades(){
    this.controladorParametrizacion.SetTipo("ciudades");
    this.controladorParametrizacion.SetIdRelacion(this.departamento);
    this.controladorParametrizacion.buscarDatosLista().add(
      response => {
        this.listaCiudades = this.controladorParametrizacion.GetListaDatos();
        if(this.listaCiudades == null){
          this.error = this.controladorParametrizacion.GetError();
        }
      }
    );
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