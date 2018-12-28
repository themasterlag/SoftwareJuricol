import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Demanda } from '../../../controladores/demanda';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { AmbienteService } from 'src/app/servicios/ambiente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-lista-demandas',
  templateUrl: './lista-demandas.component.html',
  styleUrls: ['./lista-demandas.component.css']
})
export class ListaDemandasComponent implements OnInit {

  ValidarR:boolean = false;
  Url : number;
  controladorDemanda:Demanda;
  FechaInicial : Date = null;
  FechaFinal : Date = null;

  usuario = this.autenticadorService.GetUsuario();
  // variable con las diferentes demandas
 
  // listaDemandas:any;
  searchObject:any={
    NumDemanda:"",
    NombreJuzgado:"",
    NombreTipoDemanda:"",
    NombreTipoProceso:"",
    NombreTitular:"",
    NombreCliente:"",
    UltimoMovimiento:"",
    FechaMovimiento: "",
    FechaLimite:"",
    Finalizacion:""
  }
  
  listaDemandas:any;
  rolPropio:string;

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService,  private ambienteService: AmbienteService) {
    this.controladorDemanda = new Demanda(this.http, this.ambienteService);
    autenticadorService.ProcesarToken();
    this.Url = 0;
    
  }

  ngOnInit() {
    this.rolPropio = this.autenticadorService.GetRol() ;
    if(this.rolPropio == 'Abogado'){
      let IdEmpleado: number;
      IdEmpleado =  this.autenticadorService.GetIdEmpleado();
       this.controladorDemanda.BuscarDemandas(IdEmpleado).add(
         response =>{
           this.listaDemandas = this.controladorDemanda.GetListaDemandas();
         }
       );
    }
    else{
      let IdEmpleado = 0;
      this.controladorDemanda.BuscarDemandas(IdEmpleado).add(
        response =>{
          this.listaDemandas = this.controladorDemanda.GetListaDemandas();
        }
      );

    }
    
  }

  semaforo(fechaInicioEstado,fechaVencimiento){
    this.controladorDemanda.SetFechaInicioEstado(fechaInicioEstado);
    this.controladorDemanda.SetFechaVencimiento(fechaVencimiento);
    let diasRestantes = this.controladorDemanda.Semaforo();
    return diasRestantes;
  }


  verDemanda(IdDemanda){
    this.router.navigateByUrl("/"+this.usuario+"/verDemanda/"+IdDemanda);
  }

  Editar(IdDemanda){
    this.router.navigateByUrl("/"+this.usuario+"/editarDemanda/"+IdDemanda);
  }

  nuevaDemanda(){
    this.router.navigateByUrl("/"+this.usuario+"/registrarDemanda");
  }

  Eliminar(){
    
  }
  activarModal(){
    
    document.getElementById('id01').style.display='block';
  }
  cerrarModal(){

    document.getElementById('id01').style.display='none';
    this.Url = 0;
    this.FechaInicial= null;
    this.FechaFinal = null;
    this.ValidarR = false;
  }
  generarReporte(){
    if(this.Url == 0 ){
      swal({
        type: 'error',
        title: 'Seleccione un Reporte',
        timer: 5000
      });
    }
    else{
      if(this.Url == 4){
        if(this.FechaFinal == null || this.FechaInicial == null){
          swal({
            type: 'error',
            title: 'Seleccione una fecha',
            timer: 5000
          });
        }
        else{
          window.open("http://juricoltolima.com/juricol_recursos/juricol/recursos/reportes/demandasEntreFechas.php?FechaInicial="+this.FechaInicial
          +"&FechaFinal="+this.FechaFinal,"_blank");
          this.cerrarModal();       
        }

      }
      else if(this.Url == 3){
        window.open("http://juricoltolima.com/juricol_recursos/juricol/recursos/reportes/demandasDeEmpleados.php","_blank");
        this.cerrarModal(); 
      }
      else if(this.Url == 2){
        window.open("http://juricoltolima.com/juricol_recursos/juricol/recursos/reportes/demandasPorTipoProceso.php","_blank");
        this.cerrarModal(); 
      }
      else if(this.Url == 1){
        window.open("http://juricoltolima.com/juricol_recursos/juricol/recursos/reportes/demandasPorJuzgado.php ","_blank");
        this.cerrarModal(); 
      }
    }
  }
  validarReporte(Url){
    if(Url == 4){
      this.ValidarR = true;
    }
    else{
      this.ValidarR = false;
    }
  }
}
