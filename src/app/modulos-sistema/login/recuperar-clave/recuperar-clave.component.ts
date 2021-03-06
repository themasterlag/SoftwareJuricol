import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AutenticadorService } from '../../../servicios/autenticador.service';

import { Verificacion } from '../../../controladores/verificacion';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  usuario:string = null;

  controlador:Verificacion;

  error:any = null;

  constructor(private router:Router, private http:HttpClient, private autenticadorService: AutenticadorService, private ambienteService: AmbienteService) { 
    this.controlador= new Verificacion(this.http, this.autenticadorService, this.ambienteService);
  }

  ngOnInit() {
  }

  verificacionUsuario(){
    if(this.usuario == null ){
      this.error = "Ingrese un usuario";
    }
    else{
      this.controlador.setUsuario(this.usuario);
      this.controlador.VerificarUsuario().subscribe(
        response =>{
          if(response['codigo'] != 200){
            this.error = response["mensaje"];
            
          }
          else{
            if(response['codigo'] === 200){
              this.autenticadorService.SetUsuario(this.usuario);
              this.router.navigateByUrl('/codigoVerificacion');
            }
      
            
          }
        },error =>{
          this.error = "Error al validar usuario"
          // console.log(error.error);
        }
      );
    }
    

  }

}
