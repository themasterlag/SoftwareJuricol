import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { Verificacion } from '../../../controladores/verificacion';



@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.component.html',
  styleUrls: ['./codigo-verificacion.component.css']
})

export class CodigoVerificacionComponent implements OnInit {


  codigoIngresado: number;
  controlador: Verificacion;

  error:any = null;

  constructor(private router:Router, private http:HttpClient) {
    this.controlador= new Verificacion(this.http);
  }

  ngOnInit() {
  }

  verificacionCodigo(){
    this.router.navigateByUrl("/restablecerClave");

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