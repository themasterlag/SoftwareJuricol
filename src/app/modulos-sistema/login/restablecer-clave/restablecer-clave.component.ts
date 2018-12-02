import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Verificacion } from '../../../controladores/verificacion';


@Component({
  selector: 'app-restablecer-clave',
  templateUrl: './restablecer-clave.component.html',
  styleUrls: ['./restablecer-clave.component.css']
})
export class RestablecerClaveComponent implements OnInit {

  Clave1:string= null;
  Clave2:string= null;

  controlador: Verificacion;

  constructor(private router:Router, private http:HttpClient) { 
    this.controlador= new Verificacion(this.http);
  }

  ngOnInit() {
  }


  // verifica que las contraseñas ingresadas son correctas y realiza el restablecimiento de contraseña
  restablecerClave(){
    if(this.Clave1 == '' || this.Clave2 == '' || this.Clave1 == null || this.Clave2 == null){
      alert('Por favor ingrese la nueva contraseña');
    }
    else{
      if(this.Clave1 != this.Clave2){
        alert('Las contraseñas no coinciden');
      }
      else{
        alert('restablecer');
        this.controlador.setClave(this.Clave1);
        this.controlador.restablecerClave();
        this.router.navigateByUrl('/login');
      }
    }
  }
}
