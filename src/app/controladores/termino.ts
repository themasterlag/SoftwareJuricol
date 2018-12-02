import { Semaforo } from './semaforo';

import { HttpClient } from '@angular/common/http';

// clase para objeto Empleado
export class Termino {

    // atributos
    controladorSemaforo:Semaforo;

    private id:number;
    private descipcion:string;
    private diasVencimiento:number;
    private listaTerminos:Object;
    private listaMoviminetos:Object;

    private idDemanda:number = null;
    private idEstadoDemanda:number = null;
    private fechaInicioEstado:Date;
    private fechaVencimiento:Date;

    // metodos
    constructor(private http:HttpClient){
        this.diasVencimiento = null;
    }

    public SetIdDemanda(IdDemanda){
        this.idDemanda = IdDemanda;
    }

    public SetDescripcion(Descripcion){
        this.descipcion = Descripcion;
    }

    public SetIdEstadoDemanda(IdEstadoDemanda){
        this.idEstadoDemanda =  IdEstadoDemanda;
    }

    public SetFechaInicioEstado(FechaInicioEstado){
        this.fechaInicioEstado = FechaInicioEstado;
    }

    public SetFechaVencimiento(FechaVencimiento){
        this.fechaVencimiento = FechaVencimiento;
    }

    public GetListaTerminos(){
        return this.listaTerminos;
    }

    public GetListaMovimientos(){
        return this.listaMoviminetos;
    }


    public ConsultarTerminos(){
        return this.http.get("https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarEstadosDemandas").subscribe(
            response=>{
                this.listaTerminos = response['mensaje'];
            }
        );
    }

    public CrearTermino(){

    }

    public ConsultarMovimientosDemanda(){
        return this.http.get("https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarMovimientos&IdDemanda="+this.idDemanda).subscribe(
            response =>{
                this.listaMoviminetos = response["mensaje"];
                // console.log(this.listaMoviminetos)
            }
        );
    }

    public CrearMovimiento(){
        return this.http.post("https://localhost/GitHub/juricol/recursos/validar.php",{
            accion:"crearMovimiento",
            IdDemanda: this.idDemanda,
            IdEstadoDemanda: this.idEstadoDemanda,
            Descripcion: this.descipcion,
            FechaMovimiento: this.fechaInicioEstado,
            FechaLimite: this.fechaVencimiento 
        });
    }

    // realiza la peticion al recurso, el cual devuelve los cliente, una vez recibido los guarda en el atributo listaClientes

}