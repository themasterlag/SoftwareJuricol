import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

// import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  idUsuario:number = null;
  usuario:number = null;
  idEmpleado:number = null;
  empledo:string = null;
  tipoUsuario: string = null;
  token:any = null;

  constructor(private router:Router) {  
    // this.SetToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDM5MjM5NTcsImV4cCI6MTU0Mzk1OTk1NywiZGF0YSI6eyJ1c3VhcmlvIjoiMTIzNDU2Nzg5IiwiSWRVc3VhcmlvIjoiMSIsIlRpcG9Vc3VhcmlvIjoiQWRtaW5pc3RyYWRvciJ9fQ.9p-w3YUGrJ5vkZxQ6vQ1BH86N_ow-u9iWbyFkdftzHc")   
    // this.GuardarToken();
    this.token = this.GetToken();
    this.ProcesarToken();
  }

  public SetToken(Token){
    this.token = Token;
    // this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDI3NDYxMTYsImV4cCI6MTU0Mjc4MjExNiwiZGF0YSI6eyJ1c3VhcmlvIjoiMTIzNDU2Nzg5In19.eHjX1nNxucTAzaydxdInNW3lngdgyzk2XRbbpWHwBuI";
  }

  public GetToken() {
    var token = sessionStorage.getItem("token");
    // console.log(token)
    return token;
  }

  public GetIdUsuario(){
    return this.idUsuario;
  }

  public GetUsuario(){
    return this.usuario;
  }

  public GetIdEmpleado(){
    return this.idEmpleado;
  }

  public GetNombreEmpleado(){
    return this.empledo;
  }

  public GetRol(){
    return this.tipoUsuario;
  }
 

  public ProcesarToken(){
    if(this.token != null){
      var base64Url = this.token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      base64 = JSON.parse(atob(base64))
      console.log(base64);
      this.idUsuario = base64.data.IdUsuario;
      this.usuario = base64.data.usuario;
      this.idEmpleado = base64.data.IdEmpleado;
      this.empledo = base64.data.NombreEmpleado;
      this.tipoUsuario = base64.data.TipoUsuario;

      this.GuardarToken(); 
      return this.autenticarToken(base64);
    }
    else{
      this.CerrarSesion();
    }
    
  }


  public GuardarToken(){
    sessionStorage.setItem("token",this.token);
  }

  
  public autenticarToken(base64) {
    this.GetToken();

    if(this.token == null){
        swal({
          type: 'error',
          title: "Por favor inicie sesion",
          timer: 5000
        })
      this.CerrarSesion();
      return false;
    }
    else{
      var fecha1:Date = new Date();
      var fecha2 = new Date(base64.exp*1000);
      console.log(fecha2);

      if (fecha1 > fecha2){
        swal({
          type: 'error',
          title: "La sesion ha caducado",
          timer: 5000
        })
        this.CerrarSesion();
        console.log("aqui vence token");

        return false;
      }
      else{
        return true;
      }
    }
  }


  public CerrarSesion(){
    sessionStorage.removeItem("token");
    this.token = null;
    this.router.navigateByUrl("/login");
  }

}