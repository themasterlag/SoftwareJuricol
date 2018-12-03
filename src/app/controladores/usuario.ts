import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Md5} from "md5-typescript";

// clase para objeto Usuaurio
export class Usuario {

    // atributos
    clave;
    usuario;
    idUsuario;
    claveNueva;
    private rol : number ;
    private roles : Object;
   
    private empleado:number = null;


    // metodos
    constructor( private http:HttpClient ){}
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
      return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarRoles').subscribe(
          response => {
    
            //llenado de variable lista de demandas con resultados de la consulta
            this.roles = response['mensaje'];
          },err=>{

             console.log(err.error['mensaje']);
              
          }
      );
  }
    public CrearUsuario(){
    return this.http.post("https://localhost/GitHub/juricol/recursos/validar.php",{
        accion:'crearUsuario',
        IdEmpleado: this.empleado});
    }
    public ModicarPasword(){
        this.clave = Md5.init(this.clave);
        this.claveNueva = Md5.init(this.claveNueva);
        
         // Recurso que permite la actualizacion de los datos de un Empleado.
          let accionAztualizar = "cambiarPassword"
          return this.http.put('https://localhost/GitHub/juricol/recursos/validar.php',
              { 
                  accion: accionAztualizar,
                //   viejaClave:this.clave,
                  NuevaClave : this.claveNueva,
                //   IdUsuario : this.idUsuario
                NomUsuario: this.usuario
                  
              },{headers:new HttpHeaders ({"content-type":"application/json"})}
          );
    
      }


   
}