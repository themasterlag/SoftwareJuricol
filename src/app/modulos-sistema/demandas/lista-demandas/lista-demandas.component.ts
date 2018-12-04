import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Demanda } from '../../../controladores/demanda';
import { AutenticadorService } from '../../../servicios/autenticador.service';

@Component({
  selector: 'app-lista-demandas',
  templateUrl: './lista-demandas.component.html',
  styleUrls: ['./lista-demandas.component.css']
})
export class ListaDemandasComponent implements OnInit {

  controladorDemanda:Demanda;

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

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService) {
    this.controladorDemanda = new Demanda(this.http);
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
    
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

}
