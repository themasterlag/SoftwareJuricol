import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AutenticadorService } from '../../../../servicios/autenticador.service';
import { Parametrizacion } from '../../../../controladores/parametrizacion';


@Component({
  selector: 'app-lista-estados-procesos',
  templateUrl: './lista-estados-procesos.component.html',
  styleUrls: ['./lista-estados-procesos.component.css']
})
export class ListaEstadosProcesosComponent implements OnInit {

  controladorParametrizacion:Parametrizacion;

  usuario = this.autenticadorService.GetUsuario();


  id:number = null;
  nombre:string = null;
  tipo:string = null;
  diasLimite:number = null;
  tipoAccion:boolean = false; //falso para crear nuevo tipo, verdadero para editar tipo
  listaEstados:Object = null;

  error:any = null;

  constructor(private router: Router, private autenticadorService: AutenticadorService, private http:HttpClient) { 
    this.controladorParametrizacion = new Parametrizacion(this.http);
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit() {

    this.controladorParametrizacion.SetTipo("estadosProceso");
    this.controladorParametrizacion.buscarDatosLista().add(
      response =>{
        this.listaEstados = this.controladorParametrizacion.GetListaDatos();
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
    if(this.nombre == null){
      this.error = "Ingrese un nombre valido";
    }
    else{
      if(this.tipoAccion == false){
        this.controladorParametrizacion.SetNombre(this.nombre);
        this.controladorParametrizacion.SetTipoDato(this.tipo);
        this.controladorParametrizacion.SetDiasLimites(this.diasLimite);
        this.controladorParametrizacion.GuardarParametrizacion().subscribe(
          response =>{
            console.log(response)
            this.cerrarModal();
            this.ngOnInit();
          }
        );
      }
      else{
        this.controladorParametrizacion.SetId(this.id);
        this.controladorParametrizacion.SetNombre(this.nombre);
        this.controladorParametrizacion.SetTipoDato(this.tipo);
        this.controladorParametrizacion.SetDiasLimites(this.diasLimite);
        this.controladorParametrizacion.GuardarParametrizacion().subscribe(
          response =>{
            this.cerrarModal();
            this.ngOnInit();
          }
        );
      }
    }
  }


  // desactiva el modal de registrar o  editar tipo de la interfaz
  cerrarModal(){
    this.nombre = null;
    this.tipo = null;
    this.diasLimite = null;
    this.error = null;
    document.getElementById('id01').style.display='none';
  }

  editar(Id,Nombre,Tipo,DiasLimite){
    this.id = Id;
    this.nombre = Nombre;
    this.tipo = Tipo;
    this.diasLimite = DiasLimite;
    this.activarModal("editar");
  }


}
