import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Verificacion } from '../../../controladores/verificacion';
import { AutenticadorService } from 'src/app/servicios/autenticador.service';
import swal from 'sweetalert2';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-restablecer-clave',
  templateUrl: './restablecer-clave.component.html',
  styleUrls: ['./restablecer-clave.component.css']
})
export class RestablecerClaveComponent implements OnInit {

  usuario:number = null;

  Clave1:string= null;
  Clave2:string= null;

  controlador: Verificacion;

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


  // verifica que las contraseñas ingresadas son correctas y realiza el restablecimiento de contraseña
  restablecerClave(){
    this.controlador.setUsuario(this.usuario)
    this.usuario = this.autenticadorService.GetUsuario();
    if(this.Clave1 == '' || this.Clave2 == '' || this.Clave1 == null || this.Clave2 == null){
      swal({
        type: 'error',
        title: "Por favor ingrese la nueva contraseña",
        timer: 5000
      });
    }
    else{
      if(this.Clave1 != this.Clave2){
        swal({
          type: 'error',
          title: "Las contraseñas no coinciden",
          timer: 5000
        });
      }
      else{
        swal({
          type: 'warning',
          title: "Restableciendo contraseña",
          timer: 5000
        });
        this.controlador.setClave(this.Clave1);
        this.controlador.restablecerClave().subscribe(
          response=>{
            if(response['codigo']!=200){
              swal({
                type: 'warning',
                title: "Error al restableser contraseña",
                timer: 5000
              });
             
            }
            else{
              if(response['codigo']==200){
                swal({
                  type: 'success',
                  title: "Cambio de contraseña correrto",
                  timer: 5000
                });
                
                
              }
            }
          },erro=>{
            swal({
              type: 'error',
              title: "Error al cambiar contraseña",
              timer: 5000
            });
          }
        );
        this.router.navigateByUrl('/login');
      }
    }
  }
}
