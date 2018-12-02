import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

// import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  idUsuario:number = null;
  usuario:number = null;
  token:any = null;
  tipoUsuario: string;

  constructor(private router:Router) {     
    this.token = this.GetToken();
    this.ProcesarToken();
  }

  public SetToken(Token){
    this.token = Token;
    // this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDI2OTA2MzcsImV4cCI6MTU0MjcyNjYzNywiZGF0YSI6eyJ1c3VhcmlvIjoiMTIzNDU2Nzg5In19.R-D0bL_4UJdY03220EsfXHzY-nmaQvQuLPAB_6W58UE";
    // this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDI3NDYxMTYsImV4cCI6MTU0Mjc4MjExNiwiZGF0YSI6eyJ1c3VhcmlvIjoiMTIzNDU2Nzg5In19.eHjX1nNxucTAzaydxdInNW3lngdgyzk2XRbbpWHwBuI";
  }

  public GetToken(): string {
    var token = sessionStorage.getItem("token")
    return token
  }

  public GetIdUsuario(){
    return this.idUsuario;
  }

  public GetUsuario(){
    return this.usuario;
  }

  public GetRol(){
    return this.tipoUsuario;
  }

  public ProcesarToken(){
    if(this.token != null){
      var base64Url = this.token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      base64 = JSON.parse(atob(base64))
      // console.log(base64)
      this.idUsuario = base64.data.IdUsuario;
      this.usuario = base64.data.usuario;
      this.tipoUsuario = base64.data.TipoUsuario;

      console.log(base64.data);

      // localStorage.setItem("usuario",JSON.stringify(this.usuario));


      // console.log(this.usuario);
      // console.log(prueba);

      this.GuardarToken();
      return this.autenticarToken(base64);
    }
    else{
      this.CerrarSesion();
    }
    
  }


  public GuardarToken(){
    sessionStorage.setItem("token",this.token)
  }

  
  public autenticarToken(base64) {
    this.GetToken();

    var fecha1:Date = new Date();
    var fecha2 = new Date(base64.exp*1000);
    
    if (fecha1 > fecha2){
      alert("La sesion ha caducado");
      console.log("aqui vencio token");
      this.CerrarSesion();
      return false;
    }
    else{
      return true;
    }

  }


  public CerrarSesion(){
    sessionStorage.removeItem("token");
    this.token = null;
    this.router.navigateByUrl("/login");
  }

}