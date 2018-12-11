import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Md5} from "md5-typescript";
import { AmbienteService } from '../servicios/ambiente.service';

// clase para objeto Usuaurio
export class Usuario {

    // atributos
    private idUsuario: number = null;
    private usuario:number = null;
    private clave:any = null;
    private claveNueva:any = null;
    private rol: number ;
    private roles: Array<Object>=[];   
   
    private empleado:number = null;

    private ruta:string = null;

    // metodos
    constructor( private http:HttpClient, private ambienteService: AmbienteService){
      this.ruta = this.ambienteService.GetRutaAmbiente();
    }

    public GetRoles(){
      return this.roles;
    }

    public SetRol(Rol){
        this.rol = Rol;
    }

    public setEmpleado(empleadoId){
        this.empleado = empleadoId;
    } 

    public SetIdUsuario(idUsuario){
        this.idUsuario = idUsuario;
    }

    public SetClave(clave){
      this.clave= clave;
    }

    public SetUsuario(usuario){
      this.usuario = usuario;
    }

    public SetClaveNueva(claveNueva){
      this.claveNueva = claveNueva;
    }

    public BuscarRoles(){
      return this.http.get(this.ruta+'validar.php?accion=consultarRoles').subscribe(
          response => {
    
            //llenado de variable lista de demandas con resultados de la consulta
            this.roles = response['mensaje'];
          },err=>{
             console.log(err.error['mensaje']);
          }
      );
    }

    public CrearUsuario(){
    return this.http.post(this.ruta+"validar.php",{
        accion:'crearUsuario',
        IdEmpleado: this.empleado,
        IdRol: this.rol
      });
    }

    public ModicarPasword(){
        this.clave = Md5.init(this.clave);
        this.claveNueva = Md5.init(this.claveNueva);
        
         // Recurso que permite la actualizacion de los datos de un Empleado.
          let accionAztualizar = "cambiarPassword"
          return this.http.put(this.ruta+'validar.php',
              { 
                accion: accionAztualizar,
                NuevaClave : this.claveNueva,
                NomUsuario: this.usuario
              },{headers:new HttpHeaders ({"content-type":"application/json"})}
          );
      }

}