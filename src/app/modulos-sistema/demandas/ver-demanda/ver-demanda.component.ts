import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import { Demanda } from '../../../controladores/demanda';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ver-demanda',
  templateUrl: './ver-demanda.component.html',
  styleUrls: ['./ver-demanda.component.css']
})
export class VerDemandaComponent implements OnInit {
  usuario = this.autenticadorService.GetUsuario();


  controladorDemanda:Demanda;

  error:any = null;

  id:number = null;
  nombreCategoria:string;
  numRadicado:number;
  nombreTipoDemanda:string;
  nombrecliente:string;
  nombreAbogadoTitular:string;
  nombreAbogadoSuplente:string;
  nombreJuzgado:string;
  nombreContraparte:string;
  nombreTipoProceso:string;
  nombreEstadoProceso:string;
  descripcion:string;
  descripcionMovimiento:string;

  termino:number = 0;
  Ndescripcion:string;
  fechaInicioEstado:Date;
  fechaVencimiento:Date;

  listaMovimientos:Object;
  listaTerminos:Object;

  rolPropio:string;

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService, private rute: ActivatedRoute, private ambienteService: AmbienteService) {
    this.controladorDemanda = new Demanda(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
    this.rolPropio = autenticadorService.GetRol();
  }

  ngOnInit() {
    this.rute.params.subscribe(
      parametro =>{
        this.id = parametro.id;
        this.controladorDemanda.SetIdDemanda(this.id);
        this.controladorDemanda.BuscarDemanda().add(
          response =>{
            this.id = this.controladorDemanda.GetIdDemanda();
            this.nombreCategoria = this.controladorDemanda.GetNombreCategoria();
            this.numRadicado = this.controladorDemanda.GetNumeroRadicado();
            this.nombreTipoDemanda = this.controladorDemanda.GetNombreTipoDemanda();
            this.nombrecliente = this.controladorDemanda.GetNombreCliente();
            this.nombreAbogadoTitular = this.controladorDemanda.GetNombreTitular();
            this.nombreAbogadoSuplente = this.controladorDemanda.GetNombreSuplente();
            this.nombreJuzgado = this.controladorDemanda.GetNombreJuzgado();
            this.nombreContraparte = this.controladorDemanda.GetContraparte();
            this.nombreTipoProceso = this.controladorDemanda.GetNombreTipoProceso();
            this.nombreEstadoProceso = this.controladorDemanda.GetNombreEstadoProceso();
            this.descripcion = this.controladorDemanda.GetDescripcion();

            this.controladorDemanda.BuscarMovimientosDemanda().add(
              response =>{
                this.listaMovimientos = this.controladorDemanda.GetListaMovimientos();                
              }
            );
          }
        );
      }
    );

    this.controladorDemanda.BuscarTerminos().add(
      response =>{
        this.listaTerminos = this.controladorDemanda.GetListaTerminos();
      }
    );
  }

  guardarMovimiento(){
    this.controladorDemanda.SetIdDemanda(this.id);
    this.controladorDemanda.SetDescripcionTermino(this.descripcionMovimiento);
    this.controladorDemanda.SetTermino(this.termino);
    this.controladorDemanda.SetFechaInicioEstado(this.fechaInicioEstado);
    this.controladorDemanda.SetFechaVencimiento(this.fechaVencimiento);

    this.controladorDemanda.CrearMovimiento().subscribe(
      response =>{
        swal({
          type: 'success',
          title: "Movimiento creado correctamente",
          timer: 5000
        });
          this.cerrarModal();
          this.ngOnInit();
      },
      error =>{
        this.error = error.error["mensaje"];
      } 
    );
  }

  eliminarMovimiento(Id){
    this.controladorDemanda.EliminarMovimientoDemanda(Id).subscribe(
      response =>{
        if(response["mensaje"]==1){
          swal({
            type: 'success',
            title: "Movimiento eliminado correctamente",
            timer: 5000
          });
          this.ngOnInit();
        }
        else{
          swal({
            type: 'error',
            title: "Error al eliminar el movimiento",
            timer: 5000
          });
        }
      }
    );
  }

  activarModal(){
    document.getElementById('id01').style.display='block';
  }

  cerrarModal(){
    this.termino = 0;
    this.Ndescripcion = null;
    this.descripcionMovimiento = null;
    this.fechaInicioEstado = null;
    this.fechaVencimiento = null;
    document.getElementById('id01').style.display='none';
  }

}
