import { HttpClient } from '@angular/common/http';
import { Empleado } from './empleado';
import { Cliente } from './cliente';
import { Termino } from './termino';
import { Semaforo } from './semaforo';
import { AmbienteService } from '../servicios/ambiente.service';

class ObjetoDemanda {
    DiasRestantes:number;
    IdDemanda:number;
    NumeroRadicado:number;
    Demandante:string;
    Demandado:string;
    FechaDemanda:string;
    FechaMovimiento:string; 
    FechaLimite:string ;
    Descripcion:string; 
    AbogadoPrincipal:string;
}


// clase para objeto Empleado
export class Demanda {

    // atributos

    private controladorCliente:Cliente;
    private controladorEmpleado:Empleado;
    private controladorTermino:Termino;
    private controladorSemaforo:Semaforo;

    private id:number = null;

    private listaDemandas:Array<ObjetoDemanda> = [];
    private tipoDemanda:number = 1;
    private nombreTipoDemanda:string;//
    private listaTiposDemandas:Object;

    private numRadicado:number;
    private cliente:number = 0;
    private nombrecliente:string;//
    private listaClientes:Object;
    private listaEmpleados:object;
    private abogadoTitular:number = 0;
    private nombreAbogadoTitular:string; //
    private abogadoSuplente:number = 0;
    private nombreAbogadoSuplente:string;//
    private descripcion:string;
    private listaTerminos:Object;
    private termino:number = 0;
    private descripcionTermino:string;
    private tipoProceso:number = 0;
    private nombreTipoProceso:string;//
    private listaTiposProcesos:Object;
    private estadoProceso:number = 0;
    private nombreEstadoProceso:string;//
    private listaEstadosProcesos:Object;
    private juzgado:number = 0;
    private nombreJuzgado:string;//
    private listaJuzgados:Object;
    private contraparte:string;
    private categoria:number;
    private nombreCategoria:string; //
    private fechaDemanda:Date;
    private fechaVencimiento:Date;
    private fechaInicioEstado:Date;
    private listaMovimientos:Object;

    private diasRestantes:any;

    private ruta:string = null;


    // metodos
    constructor( private http:HttpClient, private ambienteService: AmbienteService){
        this.ruta = ambienteService.GetRutaAmbiente();
        this.controladorCliente= new Cliente(this.http, this.ambienteService);
        this.controladorEmpleado= new Empleado(this.http,this.ambienteService);
        this.controladorTermino= new Termino(this.http,this.ambienteService);
        this.controladorSemaforo= new Semaforo(this.ambienteService);
    }

    public SetIdDemanda(IdDemanda){
        this.id = IdDemanda;
    }

    // asigna al atributo tipoDemanda el valor recibido en la funcion
    public SetTipoDemanda(tipoDemanda){
        this.tipoDemanda = tipoDemanda;
    }

    public SetTipoProceso(TipoProceso){
        this.tipoProceso = TipoProceso;
    }

    // asigna al atributo numRadicado el valor recibido en la funcion
    public SetNumeroRadicado(numeroRadicado){
        this.numRadicado = numeroRadicado; 
    }

    // asigna al atributo cliente el valor recibido en la funcion
    public SetCliente(cliente){
        this.cliente = cliente;
    }

    // asigna al atributo abigadoTitular el valor recibido en la funcion
    public SetTitular(titular){
        this.abogadoTitular = titular;
    }

    // asigna al atributo abogadoSuplente el valor recibido en la funcion
    public SetSuplente(suplente){
        this.abogadoSuplente = suplente;
    }

    // asigna al atributo descripcionel valor recibido en la funcion
    public SetDescripcion(descripcion){
        this.descripcion = descripcion;
    }

    // asigna al atributo estadoProceso el valor recibido en la funcion
    public SetEstadoProceso(EstadoProceso){
        this.estadoProceso = EstadoProceso;
    }

    public SetFechaVencimiento(fechaVencimiento){
        this.fechaVencimiento = fechaVencimiento;
    }

    public SetFechaInicioEstado(fechaInicioEstado){
        this.fechaInicioEstado = fechaInicioEstado;
    }

    public SetTermino(idTermino){
        this.termino = idTermino;
    }

    public SetJuzgado(IdJuzgado){
        this.juzgado = IdJuzgado;
    }

    public SetContraparte(Contraparte){
        this.contraparte = Contraparte;
    }

    public SetCategoria(Categoria){
        this.categoria = Categoria;
    }

    public SetDescripcionTermino(DescripcionTermino){
        this.descripcionTermino = DescripcionTermino;
    }

    // 
    public ObtenerClientes(){
        return this.controladorCliente.consultarClientes().add(
            response =>{
                this.listaClientes = this.controladorCliente.GetListaClientes();
            }
        );
    }

    public ObtenerTerminos(){
        this.controladorTermino.ConsultarTerminos().add(
            response =>{
                this.listaTerminos =  this.controladorTermino.GetListaTerminos();
            }
        );
        return this.listaTerminos;
    }


    public ObtenerEmpleados(){
        return this.controladorEmpleado.BuscarEmpleados().add(
            response=>{
                this.listaEmpleados = this.controladorEmpleado.GetListaEmpleados();
            }
        );
    }

    public GuardarDemanda(){
        if(this.id == null){
            return this.http.post(this.ruta+'validar.php',{
                accion:"crearDemanda",
                Categoria: this.categoria,
                NumDemanda: this.numRadicado,
                IdTipoDemanda: this.tipoDemanda,
                IdCliente: this.cliente,
                IdTitular: this.abogadoTitular,
                IdSuplente: this.abogadoSuplente,
                IdJuzgado: this.juzgado,
                Demandado: this.contraparte,
                IdTipoProceso: this.tipoProceso,
                IdEstadoProceso: this.estadoProceso,
                Descripcion: this.descripcion
            });
        }
        else{
            return this.http.put(this.ruta+'validar.php',{
                accion:"modificarDemanda",
                IdDemanda:this.id,
                Categoria: this.categoria,
                NumDemanda: this.numRadicado,
                IdTipoDemanda: this.tipoDemanda,
                IdCliente: this.cliente,
                IdTitular: this.abogadoTitular,
                IdSuplente: this.abogadoSuplente,
                IdJuzgado: this.juzgado,
                Demandado: this.contraparte,
                IdTipoProceso: this.tipoProceso,
                IdEstadoProceso: this.estadoProceso,
                Descripcion: this.descripcion
            });
        }
    }
    
    public CrearMovimiento(){
        this.controladorTermino.SetIdDemanda(this.id);
        this.controladorTermino.SetDescripcion(this.descripcionTermino);
        this.controladorTermino.SetIdEstadoDemanda(this.termino);
        this.controladorTermino.SetFechaInicioEstado(this.fechaInicioEstado);
        this.controladorTermino.SetFechaVencimiento(this.fechaVencimiento);

        return this.controladorTermino.CrearMovimiento();
    }

    public BuscarTerminos(){
        return this.controladorTermino.ConsultarTerminos().add(
            response =>{
                this.listaTerminos = this.controladorTermino.GetListaTerminos(); 
            }
        );
    }

    public BuscarMovimientosDemanda(){
        this.controladorTermino.SetIdDemanda(this.id);
        return this.controladorTermino.ConsultarMovimientosDemanda().add(
            response =>{
                this.listaMovimientos = this.controladorTermino.GetListaMovimientos();
            }
        );
    }

    public BuscarTipoDemandas(){
        return this.http.get(this.ruta+"validar.php?accion=consultarTiposDemandas").subscribe(
            response =>{
                this.listaTiposDemandas = response["mensaje"];
            }
        );
    }

    public BuscarTiposProcesos(){
        return this.http.get(this.ruta+"validar.php?accion=consultarTiposProcesos").subscribe(
            response =>{
                this.listaTiposProcesos = response["mensaje"];
            }
        );
    }

    public BuscarEstadosProcesos(){
      
        return this.http.get(this.ruta+"validar.php?accion=consultarEstadosProcesos").subscribe(
            response =>{
                this.listaEstadosProcesos = response["mensaje"];
            }
        );
    }

    public BuscarJuzgados(){
        return this.http.get(this.ruta+"validar.php?accion=consultarJuzgados").subscribe(
            response =>{
                this.listaJuzgados = response["mensaje"];
            }
        );
    }

    public BuscarDemanda(){
        
        return this.http.get(this.ruta+"validar.php?accion=consultarDemandas&Filtro=Demanda"+"&IdDemanda="+this.id).subscribe(
            response=>{
                this.id = response["mensaje"][0]["IdDemanda"];
                this.categoria = response["mensaje"][0]["IdCategoria"];
                this.nombreCategoria = response["mensaje"][0]["NombreCategoria"];
                this.numRadicado = response["mensaje"][0]["NumDemanda"];
                this.tipoDemanda = response["mensaje"][0]["IdTipoDemanda"];
                this.nombreTipoDemanda = response["mensaje"][0]["NombreTipoDemanda"];
                this.cliente = response["mensaje"][0]["IdCliente"];
                this.nombrecliente = response["mensaje"][0]["NombreCliente"];
                this.abogadoTitular = response["mensaje"][0]["IdTitular"];
                this.nombreAbogadoTitular = response["mensaje"][0]["NombreTitular"];
                this.abogadoSuplente = response["mensaje"][0]["IdSuplente"];
                this.nombreAbogadoSuplente = response["mensaje"][0]["NombreSuplente"];
                this.juzgado = response["mensaje"][0]["IdJuzgado"];
                this.nombreJuzgado = response["mensaje"][0]["NombreJuzgado"];
                this.contraparte = response["mensaje"][0]["NombreDemandado"];
                this.tipoProceso = response["mensaje"][0]["IdTipoProceso"];
                this.nombreTipoProceso = response["mensaje"][0]["NombreTipoProceso"];
                this.estadoProceso = response["mensaje"][0]["IdEstadoProceso"];
                this.nombreEstadoProceso = response["mensaje"][0]["NombreEstadoProceso"];
                this.descripcion = response["mensaje"][0]["DescripcionDemanda"];
            }
        );
    }


    public BuscarDemandas(IdEmpleado){
            return this.http.get(this.ruta+"validar.php?accion=consultarDemandas&IdEmpleado="+IdEmpleado).subscribe(
            response=>{
                this.listaDemandas = response["mensaje"];
                this.ProcesarDemandas();
            }
        );
    }


    ProcesarDemandas(){
        for(var i = 0; i < this.listaDemandas.length; i++){
    
            let demanda =this.listaDemandas[i];
            this.fechaInicioEstado = new Date(demanda.FechaMovimiento);
            this.fechaVencimiento = new Date(demanda.FechaLimite);

            let diasRestantes1 = this.Semaforo();

            this.listaDemandas[i].DiasRestantes = diasRestantes1;
        }
    
      }

    public GetCliente(){
        return this.cliente;
    }

    public GetTitular(){
        return this.abogadoTitular;
    }

    public GetSuplente(){
        return this.abogadoSuplente;
    }

    public GetEstadoProceso(){
        return this.estadoProceso;
    }

    public GetDescripcion(){
        return this.descripcion;
    }

    public GetContraparte(){
        return this.contraparte;
    }

    public GetTipoProceso(){
        return this.tipoProceso;
    }

    public GetJuzgado(){
        return this.juzgado;
    }

    public GetTipoDemanda(){
        return this.tipoDemanda;
    }

    public GetNumeroRadicado(){
        return this.numRadicado;
    }

    public GetCategoria(){
        return this.categoria;
    }

    public GetFechaDemanda(){
        return this.fechaDemanda;
    }

    public GetListaJuzgados(){
        return this.listaJuzgados;
    }

    public GetListaTerminos(){
        return this.listaTerminos;
    }

    public GetListaEstadosProcesos(){
        return this.listaEstadosProcesos;
    }

    public GetListaClientes(){
        return this.listaClientes;
    }

    public GetListaEmpleados(){
        return this.listaEmpleados;
    }

    public GetListaTiposProcesos(){
        return this.listaTiposProcesos;
    }

    public GetListaTiposDemandas(){
        return this.listaTiposDemandas;
    }

    public GetListaDemandas(){
        return this.listaDemandas;
    }

    public GetFechaVencimiento(){
        return this.fechaVencimiento;
    }

    public GetFechaInicioEstado(){
        return this.fechaInicioEstado;
    }

    public GetIdDemanda(){
        return this.id;
    }

    public GetListaMovimientos(){
        return this.listaMovimientos;
    }


    public GetNombreCategoria(){
        return this.nombreCategoria;
    }

    public GetNombreTipoProceso(){
        return this.nombreTipoProceso;
    }

    public GetNombreCliente(){
        return this.nombrecliente;
    }

    public GetNombreTitular(){
        return this.nombreAbogadoTitular;
    }


    public GetNombreSuplente(){
        return this.nombreAbogadoSuplente;
    }


    public GetNombreJuzgado(){
        return this.nombreJuzgado;
    }


    public GetNombreTipoDemanda(){
        return this.nombreTipoDemanda;
    }

    public GetNombreEstadoProceso(){
        return this.nombreEstadoProceso;
    }


    public Semaforo(){
        this.controladorSemaforo.SetFechaVencimiento(this.fechaVencimiento);
        this.controladorSemaforo.CalcularDiasFaltantes();
        this.diasRestantes = this.controladorSemaforo.GetDiasRestantes();
        return this.diasRestantes;
    }

}