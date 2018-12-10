import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { Verificacion } from '../../../controladores/verificacion';
import { AutenticadorService } from 'src/app/servicios/autenticador.service';
import swal from 'sweetalert2';
import { AmbienteService } from 'src/app/servicios/ambiente.service';



@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.component.html',
  styleUrls: ['./codigo-verificacion.component.css']
})

export class CodigoVerificacionComponent implements OnInit {

  usuario:number = null;
  codigoIngresado: number;
  controlador: Verificacion;

  error:any = null;

  constructor(private router:Router, private http:HttpClient, private autenticadorService: AutenticadorService, private ambienteService: AmbienteService) {
    this.controlador= new Verificacion(this.http, this.autenticadorService, this.ambienteService);
    this.usuario = autenticadorService.GetUsuario();
    if(this.usuario == null){
      swal({
        type: 'warning',
        title: "Por favor inicie de nuevo el proceso y no actualice la pagina del navegador",
        timer: 5000
      });
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {
    
  }

  verificacionCodigo(){
    this.router.navigateByUrl("/restablecerClave");

    this.controlador.setUsuario(this.usuario);
    this.controlador.setCodigoIngresado(this.codigoIngresado);
    this.controlador.ValidarCodigo().subscribe(
      response =>{
        if(response["mensaje"] != "El codigo es correcto"){
          this.error = response["mensaje"];
        }
        else{
          this.router.navigateByUrl("/restablecerClave");
        }
      },error =>{
        this.error = "Error al validar el codigo";
      }
    );
  }

}