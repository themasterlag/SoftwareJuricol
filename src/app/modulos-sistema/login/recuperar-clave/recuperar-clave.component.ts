import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { Verificacion } from '../../../controladores/verificacion';


@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  usuario:string;

  controlador:Verificacion;

  constructor(private router:Router, private http:HttpClient) { 
    this.controlador= new Verificacion(this.http);
  }

  ngOnInit() {
  }

  verificacionUsuario(){

    this.controlador.setUsuario(this.usuario);
    console.log(this.usuario)
    this.controlador.VerificarUsuario().subscribe(
      response =>{
        console.log(response)
      }
    );
    // this.router.navigateByUrl('/codigoVerificacion');

  }

}
