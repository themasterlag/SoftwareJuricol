import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

import { Demanda } from '../../../controladores/demanda';
import { AutenticadorService } from '../../../servicios/autenticador.service';


@Component({
  selector: 'app-registrar-demanda',
  templateUrl: './registrar-demanda.component.html',
  styleUrls: ['./registrar-demanda.component.css']
})
export class RegistrarDemandaComponent implements OnInit {

  usuario = this.autenticadorService.GetUsuario();

  controladorDemanda:Demanda;

  pantalla:number = 0;

  id:number = null;
  numRadicado:number;
  tipoDemanda:number = 0;
  listaTiposDemandas:Object;
  cliente:number = 0;
  listaClientes:Object;
  titular:number = 0;
  suplente:number = 0;
  listaEmpleados:Object;
  descripcion:number;
  estadoProceso:number = 0;
  listaEstadosProcesos:Object;
  tipoProceso:number = 0;
  listaTiposProcesos:Object;
  contraparte:string;
  juzgado:number = 0;
  listaJuzgados:Object;
  categoria:number = null;
  termino:number = 0;
  listaTerminos:Object;
  descripcionTermino:string;
  fechaInicioEstado:Date;
  fechaVencimiento:Date;

  error:any;

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService) {
    this.controladorDemanda= new Demanda(this.http);
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit() {
    this.controladorDemanda.ObtenerClientes().add(
      response =>{
        this.listaClientes = this.controladorDemanda.GetListaClientes();
      }
    );
        
    this.controladorDemanda.ObtenerEmpleados().add(
      response =>{
        this.listaEmpleados = this.controladorDemanda.GetListaEmpleados()
      }
    );

      this.controladorDemanda.BuscarTipoDemandas().add(
        response => {
          this.listaTiposDemandas = this.controladorDemanda.GetListaTiposDemandas();
        }
      );

      this.controladorDemanda.BuscarTiposProcesos().add(
        response =>{
          this.listaTiposProcesos = this.controladorDemanda.GetListaTiposProcesos();
        }
      );
      
      this.controladorDemanda.BuscarJuzgados().add(
        response =>{
          this.listaJuzgados = this.controladorDemanda.GetListaJuzgados();
        }
      );

      this.controladorDemanda.BuscarEstadosProcesos().add(
        response=>{
          this.listaEstadosProcesos = this.controladorDemanda.GetListaEstadosProcesos();
        }
      );

      this.controladorDemanda.BuscarTerminos().add(
        response =>{
          this.listaTerminos = this.controladorDemanda.GetListaTerminos();
          // console.log(this.listaTerminos);
        }
      );
  }

  guardarDemanda(){
    if (this.estadoProceso == null){
      this.error = "Seleccione un estado del proceso";
    }
    else{
      this.controladorDemanda.SetIdDemanda(this.id);
      this.controladorDemanda.SetCategoria(this.categoria)
      this.controladorDemanda.SetNumeroRadicado(this.numRadicado);
      this.controladorDemanda.SetTipoDemanda(this.tipoDemanda);
      this.controladorDemanda.SetCliente(this.cliente);
      this.controladorDemanda.SetTitular(this.titular);
      this.controladorDemanda.SetSuplente(this.suplente);
      this.controladorDemanda.SetJuzgado(this.juzgado);
      this.controladorDemanda.SetContraparte(this.contraparte);
      this.controladorDemanda.SetTipoProceso(this.tipoProceso);
      this.controladorDemanda.SetEstadoProceso(this.estadoProceso);
      this.controladorDemanda.SetDescripcion(this.descripcion);
  
      this.controladorDemanda.GuardarDemanda().subscribe(
        response =>{
          if(response["codigo"]==200){
            swal({
              type: 'success',
              title: "Demanda registrada correctamente",
              timer: 5000
            });
            this.controladorDemanda.SetIdDemanda(response["mensaje"]);
            this.controladorDemanda.SetDescripcionTermino(this.descripcion);
            this.controladorDemanda.SetTermino(this.termino);
            this.controladorDemanda.SetFechaInicioEstado(this.fechaInicioEstado);
            this.controladorDemanda.SetFechaVencimiento(this.fechaVencimiento);
  
            this.controladorDemanda.CrearMovimiento().subscribe(
              response =>{
                if(response["codigo"]==200){
                  this.router.navigateByUrl("/"+this.usuario+"/demandas");
                }
                else{
                  this.error = response["mensaje"];
                }
              }
            );
            
          }
          else{
            this.error = response["mensaje"];
          }
        }
      );
    }
    
  }

  cancelar(){
    this.router.navigateByUrl("/"+this.usuario+"/demandas");
  }

  cambioPantalla(){
    if(this.pantalla == 0){
      if(this.categoria == null){
        this.error="Seleccione un tipo de cliente valido"
      }
      else{
        this.error = null;
        this.pantalla = 1;
      }
      
    }
    else{
      this.pantalla = 0;
    }
  }

  verDemanda(){
    
  }
}
