import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Md5} from "md5-typescript";
import { AutenticadorService } from '../servicios/autenticador.service';
import swal from 'sweetalert2';
import { AmbienteService } from '../servicios/ambiente.service';



// clase para objeto Verificacion
export class Verificacion {
    
    // atributos
    private id:number = null;
    private usuario:string= null;
    private nombreUsuario:number = null;
    private clave:string= null;
    private codigoIngresado:number= null;

    private ruta:string = null;


    // metodos
    constructor(private http:HttpClient, private autenticadorService: AutenticadorService, private ambienteService: AmbienteService){ 
        this.ruta = this.ambienteService.GetRutaAmbiente();
    }


    public setUsuario(usuario){
        this.usuario = usuario;
    }

    public setClave(clave){
        this.clave = clave;
    }

    public setCodigoIngresado(codigo){
        this.codigoIngresado = codigo;
    }

    public GetUsuario(){
        return this.usuario;
    }

    // envia el usuario y clave al recurso para validar que sean correctos
        // juricol.000webhostapp.com
    public IniciarSesion(){
        this.clave = Md5.init(this.clave);
        return this.http.post(this.ruta+"validar.php",
            {accion:'validar',
            usuario:this.usuario,
            password:this.clave}
        );
    }
    

    // verifica la existencia del usuario para reestablecer la clave
    public VerificarUsuario(){
        return this.http.post(this.ruta+"recuperacion.php",{
            NomUsuario: this.usuario}
        );
    }

    // envia el codigo que ingresa el usuario al recurso para que sea validado
    public ValidarCodigo(){
        return this.http.post(this.ruta+"recuperacion.php",{
            NomUsuario: this.usuario,
            Codigo: this.codigoIngresado
        });
    }

    // envia la nueva clave para remplazar la antigua
    public restablecerClave(){
        this.clave = Md5.init(this.clave);
        return this.http.post(this.ruta+"recuperacion.php",{
            Codigo: "nuevaClave",
            NomUsuario: this.usuario,
            NuevaClave: this.clave
        });
    }

}