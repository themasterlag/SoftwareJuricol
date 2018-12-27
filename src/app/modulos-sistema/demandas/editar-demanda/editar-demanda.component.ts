import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Demanda } from '../../../controladores/demanda';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-editar-demanda',
  templateUrl: './editar-demanda.component.html',
  styleUrls: ['./editar-demanda.component.css']
})
export class EditarDemandaComponent implements OnInit {

  usuario = this.autenticadorService.GetUsuario();

  controladorDemanda:Demanda;

  pantalla:number = 0;

  id:number = null;
  numRadicado:string;
  tipoDemanda:number = 0;
  listaTiposDemandas:Object;
  cliente:number = 0;
  listaClientes:Object;
  titular:number = 0;
  suplente:number = 0;
  listaEmpleados:Object;
  descripcion:string;
  estadoProceso:number = 0;
  listaEstadosProcesos:Object;
  tipoProceso:number = 0;
  listaTiposProcesos:Object;
  contraparte:string;
  juzgado:number = 0;
  listaJuzgados:Object;
  categoria:number = null;
  fechaDemanda:Date;

  error:any;

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService, private rute: ActivatedRoute, private ambienteService: AmbienteService) {
    this.controladorDemanda= new Demanda(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
  }

  ngOnInit() {
    this.rute.params.subscribe(
      parametro =>{
        this.controladorDemanda.SetIdDemanda(parametro.id);
        this.controladorDemanda.BuscarDemanda().add(
          response =>{
            this.id = this.controladorDemanda.GetIdDemanda();
            this.categoria = this.controladorDemanda.GetCategoria();
            this.numRadicado = this.controladorDemanda.GetNumeroRadicado();
            this.tipoDemanda = this.controladorDemanda.GetTipoDemanda();
            this.cliente = this.controladorDemanda.GetCliente();
            this.titular = this.controladorDemanda.GetTitular();
            this.suplente = this.controladorDemanda.GetSuplente();
            this.juzgado =  this.controladorDemanda.GetJuzgado();
            this.contraparte = this.controladorDemanda.GetContraparte();
            this.tipoProceso = this.controladorDemanda.GetTipoProceso();
            this.estadoProceso = this.controladorDemanda.GetEstadoProceso();
            this.descripcion = this.controladorDemanda.GetDescripcion();
          }
        );
      }
    )


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

      
  }

  guardarDemanda(){
    if(!/^([0-9])*$/.test(this.numRadicado)){
      swal({
        type: 'error',
        title: "El valor " + this.numRadicado + " no es un número",
        timer: 5000
      });
    
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
            title: 'Se realizo el cambio correctamente',
            timer: 5000
            
          });
          this.router.navigateByUrl("/"+this.usuario+"/demandas");
        }
        else{
          this.error = response["mensaje"];
          swal({
            type: 'error',
            title: this.error,
            timer: 5000
            
          });
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
}
