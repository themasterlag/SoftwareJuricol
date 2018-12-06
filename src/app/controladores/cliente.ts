import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

// clase para objeto Empleado
export class Cliente {

    // atributos
private Id: number = null ;   //Atributo donde podra contener el id del objeto 
private primerNombre: string = null; //Atributo donde podra contener el Primer Nombre de un cliente
private segundoNombre: string = null; //Atributo donde podra contener el Segundo  Nombre de un cliente
private primerApellido: string = null;//Atributo donde podra contener el Pimer Apellido    de un cliente
private segundoApellido: string = null;//Atributo donde podra contener el Segundo Apellido    de un cliente
private fechaNacimiento:Date = null; //Atributo donde podra contener la fecha de nacimiento del cliente
private celular: number = null; //Atributo donde podra contener el celular del cliente
private telefono:number = null; //Atributo donde podra contener el telefono fijo del cliente
private correoElectronico: string = null; //Atributo donde podra contener el correo electronico del cliente

private cedula: number = null ; //Atributo donde podra contener la cedula del cliente
private direccion : string =  null ; //Atributo donde podra contener la direccion de donde vive el cliente
private Ciudad:number ; // atributo donde se guarda temporalmete la Cuidad del cliente
private Pais: number ;
private NombreAdicional:string;
private DocumentoAdicional:number;
private CelularAdicional: number;
private CorreoElectronicoAdicional: string;
private Departamento: number;// atributo donde se guarda temporalmete el Departamento del cliente
private Entidad : number;
private Parentesco: number;
private TipoDocumento: number;
private TipoDucumentoAdicional:number
//Para instanciar este objeto pedira  parametro  una variable de tipo HttpClient para 
//hacer el debido procesamineto del constructor
    listaClientes:Object;


    // metodos
    constructor( private http:HttpClient ){}

    public GetListaClientes(){
        return this.listaClientes; 
    }

    // realiza la peticion al recurso, el cual devuelve los cliente, una vez recibido los guarda en el atributo listaClientes
    public consultarClientes(){
        return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarClientes").subscribe(
            response=>{
                this.listaClientes = response['mensaje'];
            }
        );
    }
    SetId(id : number){
        this.Id = id
        }
        SetTipoDucumentoAdiconal(TipoDocA){
        this.TipoDucumentoAdicional = TipoDocA;
        }
        SetTipoDocumento(TipoDoc){
        this.TipoDocumento= TipoDoc;
        }
        SetParentesco(parentesco : number){
        this.Parentesco = parentesco;
        }
        SetEntidad(entidad : number){
        this.Entidad = entidad;
        }
        SetCuidad(ciudad : number){
        this.Ciudad = ciudad;
        } 
        SetNombreAdicional(nombreA : string){
        this.NombreAdicional = nombreA;
        } 
        SetDocumentoAdicional(Documento){
        this.DocumentoAdicional = Documento
        } 
        SetCelularAdicional(celularA : number){
        this.CelularAdicional = celularA;
        } 
        SetCorreoAdicional(correoA){
        this.CorreoElectronicoAdicional =  correoA;
        }
        SetDepartamento(departamento : number){
        this.Departamento = departamento;
        } 
        SetPais(pais : number){
        this.Pais = pais;
        } 
        
        SetPrimerNombre(nombre1: string){  //Metodo para asignar un valor al atributo primerNombre 
        this.primerNombre = nombre1 ; 
        }
        SetSegundoNombre(nombre2: string){ //Metodo para asignar un valor al atributo segundoNombre 
        this.segundoNombre = nombre2 ; 
        }
        SetPrimerApellido(apellido1 : string){//Metodo para asignar un valor al atributo primerApellido
        this.primerApellido = apellido1;
        
        }
        SetSegundoApellido(apellido2 : string){//Metodo para asignar un valor al atributo segundoApellido
        this.segundoApellido = apellido2;
        
        }
        SetFecha(fecha : Date){ //Metodo para asignar un valor al atributo fechaNacimiento
        this.fechaNacimiento = fecha;
        }
        
        SetCelular(numeroCel : number){//Metodo para asignar un valor al atributo celular
        this.celular = numeroCel;
        }
        SetTelefono(numeroTel : number){ //Metodo para asignar un valor al atributo telefono
        this.telefono = numeroTel;
        }
        SetCorreo(correo : string){  //Metodo para asignar un valor al atributo correoElectronico
        this.correoElectronico = correo;
        }
        SetCedula(documento : number  ){  //Metodo para asignar un valor al atributo cedula
        this.cedula = documento;
        }
        SetDireccion(direccion : string){  //Metodo para asignar un valor al atributo direccion
        this.direccion = direccion;
        }
        GetDireccion(){   //Metodo que permite obtener la direccion del cliente
        return this.direccion;
        }
        GetPrimerNombre(){//Metodo que permite obtener el primer nombre del cliente
        return this.primerNombre;
        }
        GetSegundoNombre(){ //Metodo que permite obtener el segundo nombre del cliente 
        return this.segundoNombre;
        }
        GetPrimerApellido(){ //Metodo que permite obtener el primer apellido del cliente 
        return this.primerApellido;
        }
        GetSegundoApellido(){ //Metodo que permite obtener el segundo nombre el cliente
        return this.segundoApellido;
        }
        GetFechaNacimiento(){ //Metodo que permite obtener la fecha de nacimiento del cliente
        return this.fechaNacimiento;
        }
        GetCelular(){ //Metodo que permite obtener el celular del cliente
        return this.celular;
        }
        GetTelefono(){ //Metodo que permite obtener telefono del cliente
        return this.telefono;
        }
        GetCorreoElectronico(){ //Metodo que permite obtener el correo electronico del cliente
        return this.correoElectronico;
        }
        
        GetEntidad(){
        return this.Entidad ;
        }
        GetCuidad(){
        return  this.Ciudad ;
        } 
        GetNombreAdicional(){
        return this.NombreAdicional ;
        } 
        GetDocumentoAdicional(){
        return this.DocumentoAdicional; 
        } 
        GetCelularAdicional(){
        return this.CelularAdicional;
        } 
        GetCorreoAdicional(){
        return this.CorreoElectronicoAdicional; 
        }
        GetDepartamento(){
        return this.Departamento ;
        }
        GetPais(){
        return this.Pais;
        } 
        GetParenteco(){
        return this.Parentesco
        }
        GetTipoDocumento(){
        return this.TipoDocumento
        }
        GetTipoDocumentoAdicional(){
        return this.TipoDucumentoAdicional
        }
        
    //      Recursos

    EliminarCliente(IdCliente){
        return this.http.delete('https://localhost/GitHub/juricol/recursos/validar.php?accion=eliminarCliente&IdCliente='+IdCliente)
        }
        BuscarCliente(IdCliente){ // Recurso que consulta a la BD los datos de un solo cliente
        
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarClientes&IdCliente='+IdCliente )
        }
        BuscarClientes(Activo){ // Recurso que consulta a la BD los datos la informacion de los clientes

            return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarClientes&Activo='+Activo);
    
        }
        insertarCliente(){ // Recurso que permite inserta la insersion de un cliente a la BD
        
        let accionCrear = "crearCliente"
        return this.http.post('https://localhost/GitHub/juricol/recursos/validar.php',
            {           
                
            accion : accionCrear,
            PrimerNombre : this.primerNombre,
            SegundoNombre :this.segundoNombre,
            PrimerApellido: this.primerApellido,
            SegundoApellido :this.segundoApellido,
            FechaNacimiento : this.fechaNacimiento,
            Celular: this.celular,
            Telefono :this.telefono,
            Correo : this.correoElectronico,
            Documento :this.cedula,
            Direccion: this.direccion,
            IdTipoDocumento:this.TipoDocumento,
            IdTipoDocumentoSustituto: this.TipoDucumentoAdicional,
            IdCiudad: this.Ciudad,
            CorreoSustituto: this.CorreoElectronicoAdicional,
            NombreSustituto : this.NombreAdicional,
            CelularSustituto : this.CelularAdicional,
            IdInstitucionLaboral: this.Entidad,
            DocumentoSustituto : this.DocumentoAdicional,
            IdParentesco : this.Parentesco
        
        
        
        
            },{headers:new HttpHeaders ({"content-type":"application/json"})} // Tipo de contenido que va a enviar el recurso
        );
        }
        
        ObtenerTiposDoc(){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarTiposDocumentos' )
        
        }
        ObtenerPaises(){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarPaises' )
        }
        
        ObtenerDepartamentos(IdPais){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos&IdPais='+IdPais )
        }
        ObtenerDepartamento(IdDepartamento){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos&IdDepartamento='+IdDepartamento )
        }
        ObtenerCiudades(IdDepartamento){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades&IdDepartamento='+IdDepartamento )
        }
        ObtenerCiudad(IdCiudad){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades&IdCiudad='+IdCiudad )
        }
        
        ObtenerEntidades(){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarInstitucionesLaborales' )
        }
        ObtenerParentescos(){
        return this.http.get('https://localhost/GitHub/juricol/recursos/validar.php?accion=consultarParentescos' )
        }
        ActualizarCliente(){ // Recurso que permite la actualizacion de los datos de un cliente.
        
        let accionActualizar = "modificarCliente"
        return this.http.put('https://localhost/GitHub/juricol/recursos/validar.php',
            {           
                
        
            accion : accionActualizar,
            IdCliente: this.Id,
            PrimerNombre : this.primerNombre,
            SegundoNombre :this.segundoNombre,
            PrimerApellido: this.primerApellido,
            SegundoApellido :this.segundoApellido,
            FechaNacimiento : this.fechaNacimiento,
            Celular: this.celular,
            Telefono :this.telefono,
            Correo : this.correoElectronico,
            Documento :this.cedula,
            Direccion: this.direccion,
            IdTipoDocumento:this.TipoDocumento,
            IdTipoDocumentoSustituto: this.TipoDucumentoAdicional,
            IdCiudad: this.Ciudad,
            CorreoSustituto: this.CorreoElectronicoAdicional,
            NombreSustituto : this.NombreAdicional,
            CelularSustituto : this.CelularAdicional,
            IdInstitucionLaboral: this.Entidad,
            DocumentoSustituto : this.DocumentoAdicional,
            IdParentesco : this.Parentesco
        
            },{headers:new HttpHeaders ({"content-type":"application/json"})} // Tipo de contenido que va a enviar el recurso
        );
        }

}