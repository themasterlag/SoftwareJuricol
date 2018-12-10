import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { AutenticadorService } from '../../../servicios/autenticador.service';
import { Verificacion } from '../../../controladores/verificacion';
import { AmbienteService } from 'src/app/servicios/ambiente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  controladorVerificacion:Verificacion;

  usuario:string= null;
  clave:string= null;
  codigoIngresado:number= null;
  empleado:number = null;

  respuesta:any;
  error:any = null;

  constructor(private router:Router, private http:HttpClient, private autenticadorService: AutenticadorService, private ambienteService: AmbienteService) {
    this.controladorVerificacion= new Verificacion(this.http, this.autenticadorService, this.ambienteService);
    if(autenticadorService.ProcesarToken() == true) {
      this.router.navigateByUrl('/'+autenticadorService.GetUsuario()+'/demandas');
    }
   }

  ngOnInit() {
  }

  // funcion llamada por el boton ingresar
  verificar(){
    this.respuesta= null;
    this.error= null;

    // valida que los datos no esten vacios
    if(this.usuario == null || this.usuario == '' ){
      this.error = 'Por favor ingrese un usuario';
    }
    else{

      if(this.clave == null || this.clave == '' ){
        this.error = 'Por favor ingrese su contraseña';
      }
      else{
        this.controladorVerificacion.setUsuario(this.usuario);
        this.controladorVerificacion.setClave(this.clave);
        

        this.controladorVerificacion.IniciarSesion().subscribe(
        (data)=> this.respuesta = {...data },
        (error) => this.error = error['error']['mensaje']).add(
          response=>{
            if(this.error==null){
              if(this.respuesta == null){
                this.error = "Error al iniciar sesion";
              }
              if(this.respuesta['mensaje']=='Acceso correcto'){
                this.autenticadorService.SetToken(this.respuesta['token'])
                if(this.autenticadorService.ProcesarToken() == true){
                  this.router.navigateByUrl('/'+this.usuario+'/demandas');
                }
                else{
                  this.error = "Token no valido";
                }
              }
              else{
                this.error = this.respuesta['mensaje'];
              }
            }
          }
        );
      }
    }
  }
}