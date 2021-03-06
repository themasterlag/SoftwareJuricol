import { Component, OnInit } from '@angular/core';
import { AutenticadorService} from "../../../servicios/autenticador.service";
import {Usuario} from "../../../controladores/Usuario";
import { HttpClient, HttpHeaders} from '@angular/common/http'; //Importacion de la libreria HttpClient y HttpHeaders 
import swal from 'sweetalert2';
import { AmbienteService } from 'src/app/servicios/ambiente.service';

@Component({
  selector: 'app-editar-clave',
  templateUrl: './editar-clave.component.html',
  styleUrls: ['./editar-clave.component.css']
})
export class EditarClaveComponent implements OnInit {

  idUsuario:number;
  usuario:number;
  clave:any;
  claveNueva:any;
  claveConfirmar:any;
  ControladorUsuario : Usuario;
  NombreUsuario: string;
  constructor(private http: HttpClient,private autenticadorService: AutenticadorService, private ambienteService: AmbienteService) { 

    autenticadorService.ProcesarToken();

    this.ControladorUsuario= new Usuario(this.http, this.ambienteService);
   
    this.idUsuario = this.autenticadorService.GetIdUsuario();
    this.usuario = this.autenticadorService.GetUsuario();
    this.NombreUsuario= this.autenticadorService.GetNombreEmpleado();
 

  }

  ngOnInit() {
  }
  GuardarContra(){
    if(this.clave == null || this.clave == ""){
      swal({
        type: 'error',
        title: 'Escriba la Contraseña Actual',
        timer: 5000
      });
      return false
     }
    if(this.claveNueva == null || this.claveNueva == ""){
      swal({
        type: 'error',
        title: 'Campo Nueva Contraseña Vacio',
        timer: 5000
      });
      return false
     }
     
     if(this.claveConfirmar == null || this.claveConfirmar == ""){
      swal({
        type: 'error',
        title: 'Escriba la confirmacion de nueva contraseña',
        timer: 5000
      });
      return false
     }
     if(this.claveNueva != this.claveConfirmar){
      swal({
        type: 'error',
        title: 'La clave nueva no es igual a la clave confirmada',
        timer: 5000
      });
      return false
     }

    swal('Cargando');
    swal.showLoading();

    this.ControladorUsuario.SetClave(this.clave);
    this.ControladorUsuario.SetUsuario(this.usuario);
    this.ControladorUsuario.SetIdUsuario(this.idUsuario);
    this.ControladorUsuario.SetClaveNueva(this.claveNueva);

    this.ControladorUsuario.ModicarPasword().subscribe(
      response=>{
        if(response['codigo']== 200){
          swal({
            type: 'success',
            title: 'Se guardaron correctamente los cambios',
            timer: 5000
          
          });
          this.clave= null;
          this.claveNueva=null;
          this.claveConfirmar= null;
        }
      
      },err=>{
    
        if(err.error['codigo'] == 404){
          swal({
            type: 'error',
            title: 'Contraseña Atual Erronea',
            timer: 5000
          
          })
        }
      }
    );
  }

}
