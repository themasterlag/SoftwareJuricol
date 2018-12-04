import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Md5} from "md5-typescript";



// clase para objeto Verificacion
export class Verificacion {
    
    // atributos
    private id:number = null;
    private usuario:string= null;
    private clave:string= null;
    private codigoIngresado:number= null;


    // metodos
    constructor(private http:HttpClient ){ }


    public setUsuario(usuario){
        this.usuario = usuario;
    }

    public setClave(clave){
        // console.log(Md5.init(clave));
        this.clave = clave;
    }

    public setCodigoIngresado(codigo){
        this.codigoIngresado = codigo;
    }


    // envia el usuario y clave al recurso para validar que sean correctos
        // juricol.000webhostapp.com
    public IniciarSesion(){
        this.clave = Md5.init(this.clave);
        console.log(this.clave);
        return this.http.post("https://localhost/GitHub/juricol/recursos/validar.php",
            {accion:'validar',
            usuario:this.usuario,
            password:this.clave}
        );
    }
    

    // verifica la existencia del usuario para reestablecer la clave
    public VerificarUsuario(){
        return this.http.post("https://localhost/GitHub/juricol/recursos/recuperacion.php",{
            NomUsuario: this.usuario}
        );
    }


    // envia el codigo que ingresa el usuario al recurso para que sea validado
    public ValidarCodigo(){
        alert(this.codigoIngresado);
        // this.http.post('',
        // {codigo:this.codigoIngresado});
    }

    // envia la nueva clave para remplazar la antigua
    public restablecerClave(){
        
    }

}