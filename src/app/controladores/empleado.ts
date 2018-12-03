import { HttpClient , HttpHeaders} from '@angular/common/http';

// clase para objeto Empleado
export class Empleado {
    private id: number = null ;   //Atributo donde podra contener el id del objeto Empleado 
    private primerNombre: string = null; //Atributo donde podra contener el Primer Nombre de un Empleado
    private segundoNombre: string = null; //Atributo donde podra contener el Segundo  Nombre de un Empleado
    private primerApellido: string = null;//Atributo donde podra contener el Pimer Apellido    de un Empleado
    private segundoApellido: string = null;//Atributo donde podra contener el Segundo Apellido    de un Empleado
    private fechaNacimiento:Date = null; //Atributo donde podra contener la fecha de nacimiento del Empleado
    private celular: number = null; //Atributo donde podra contener el celular del cliente
    private telefono:number = null; //Atributo donde podra contener el telefono fijo del cliente
    private correoElectronico: string = null; //Atributo donde podra contener el correo electronico del cliente
    private titular: number ; //Atributo donde podra contener un 0 o 1 para saber si el Empleado es titular en una demanda

    private especialidad: number = null; //Atributo donde podra contener la especialidad del empleado

    private cedula: number = null ; //Atributo donde podra contener la cedula del empleado
    private direccion : string =  null ; //Atributo donde podra contener la direccion del empleado
    private cargo : number = null ; //Atributo donde podra contener el cargo de un empleado
    private ciudad:number ; // atributo donde se guarda temporalmete la Cuidad del cliente
    private tipoDocumento: number;
    private tarjeta : number ;

    // atributos
    
    listaEmpleados:Object;

    // metodos
    constructor( private http:HttpClient ){}


    public GetListaEmpleados(){
        return this.listaEmpleados;
    }

    public BuscarEmpleados(){
        return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarEmpleados').subscribe(
            response => {
                console.log(response);
              //llenado de variable lista de demandas con resultados de la consulta
              this.listaEmpleados = response['mensaje'];
            },err=>{

               console.log(err.error['mensaje']);
                
            }
        );
    }
    SetId(id : number ){
        this.id= id

    }  
    
    public SetCuidad(ciudad : number){
         this.ciudad = ciudad;
 
     } 
     public SetPais(pais : number){
        this.ciudad = pais;

    } 
    public SetTarjeta(tarjeta){
        this.tarjeta= tarjeta;
    }
    public SetTipoDocumento(TipoDoc){
        this.tipoDocumento= TipoDoc;
    }
    public SetTitular(valor : number){ //Metodo para asignar un valor falso o verdadero al atributo titular
        this.titular = valor;
    }

    public SetPrimerNombre(nombre1: string){ //Metodo para asignar un valor al atributo primerNombre
        this.primerNombre = nombre1 ; 
    }
    public SetSegundoNombre(nombre2: string){ //Metodo para asignar un valor al atributo segundoNombre
        this.segundoNombre = nombre2 ; 
    }
    public SetPrimerApellido(apellido1 : string){ //Metodo para asignar un valor al atributo primerApellido
        this.primerApellido = apellido1;

    }
    public SetSegundoApellido(apellido2 : string){ //Metodo para asignar un valor al atributo segundoApellido
        this.segundoApellido = apellido2;

    }
    public SetFecha(fecha : Date){ //Metodo para asignar un valor al atributo fechaNacimiento
        this.fechaNacimiento = fecha;
    }

    public SetCelular(numeroCel : number){ //Metodo para asignar un valor al atributo celular
        this.celular = numeroCel;
    }
    public SetTelefono(numeroTel : number){  //Metodo para asignar un valor al atributo telefono
        this.telefono = numeroTel;
    }
    public SetCorreo(correo : string){ //Metodo para asignar un valor al atributo correoElectronico
        this.correoElectronico = correo;
    }
    public SetCedula(documento : number){  //Metodo para asignar un valor al atributo cedula
        this.cedula = documento;
    }
    public SetEspecialidad(profecion : number){  //Metodo para asignar un valor al atributo especialidad
        this.especialidad = profecion;
    }
    public SetDireccion(direccion : string ){ //Metodo para asignar un valor al atributo direccion
        this.direccion = direccion;
    }
    public SetCargo(cargo :number){ //Metodo para asignar un valor al atributo cargo
        this.cargo = cargo;
    }
   
    public GetCargo(){ //Metodo que permite obtener el cargo del Empleado
        return this.cargo;
    }
    public GetDireccion(){ //Metodo que permite obtener la direccion del Empleado
        return this.direccion;
    }
    public GetPrimerNombre(){ //Metodo que permite obtener el primerNombre del Empleado
        return this.primerNombre;
    }
    public  GetSegundoNombre(){ //Metodo que permite obtener el segundoNombre del Empleado
        return this.segundoNombre;
    }
    public GetPrimerApellido(){ //Metodo que permite obtener el primerApellido del Empleado
        return this.primerApellido;
    }
    public GetSegundoApellido(){ //Metodo que permite obtener el segundoApellido del Empleado
        return this.segundoApellido;
    }
    public GetFechaNacimiento(){ //Metodo que permite obtener la fechaNacimiento del Empleado
        return this.fechaNacimiento;
    }
    public GetCelular(){ //Metodo que permite obtener el celular del Empleado
        return this.celular;
    }
    public GetTelefono(){ //Metodo que permite obtener el telefono del Empleado
        return this.telefono;
    }
    public GetCorreoElectronico(){ //Metodo que permite obtener el correoElectronico del Empleado
        return this.correoElectronico;
    }
    public GetTitular(){ //Metodo que permite obtener si es  titular el Empleado
        return this.titular;
    }
    public GetEspecialidad(){ //Metodo que permite obtener el  especialidad del Empleado
        return this.especialidad;
    }
    
    
    public GetCuidad(){
        return this.ciudad ;
 
     }
    public GetTarjeta(){
        return this.tarjeta ;
    }
    public GetTipoDocumento(){
        return this.tipoDocumento ;
    }
        //      Recursos
 
 public EliminarEmpleado(){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=eliminarEmpleado')
 }
 public BuscarEmpleado(id){ // Recurso que consulta a la BD los datos de un solo Empleado
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarEmpleados&IdEmpleado='+id)
 }

 public ObtenerEspecialidades(){ // Recurso que permite consultar todas la especialidades posibles para los empleados
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarEspecialidades')

 }
 public ObtenerTiposDoc(){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarTiposDocumentos')
     
 }
 public ObtenerPaises(){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarPaises')
 }
 
 public ObtenerDepartamentos(IdPais){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos&IdPais='+IdPais)
 }
 public ObtenerDepartamento(IdDepartamento){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos&IdDepartamento='+IdDepartamento)
 }
 public ObtenerCiudades(IdDepartamento){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades&IdDepartamento='+IdDepartamento)
 }
 public ObtenerCiudad(IdCiudad){
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades&IdCiudad='+IdCiudad)
 }

 public ObtenerCargos(){// Recurso que permite consultar todas los Cargos posibles para los empleados
     return this.http.get('https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCargos')

 } 
 public insertarEmpleado(){ // Recurso que permite inserta la insersion de un Empleado a la BD

    
     let accionCrear = "crearEmpleado"
     return this.http.post('https:/localhost/GitHub/juricol/recursos/validar.php',
         { 
             accion: accionCrear,
             PrimerNombre : this.primerNombre,
             SegundoNombre :this.segundoNombre,
             PrimerApellido: this.primerApellido,
             SegundoApellido :this.segundoApellido,
             FechaNacimiento : this.fechaNacimiento,
             Celular: this.celular,
             Telefono :this.telefono,
             Correo : this.correoElectronico,
             Titular :this.titular,               
             IdEspecialidad :this.especialidad,
             Documento :this.cedula,
             IdCargo : this.cargo,
             IdCiudad: this.ciudad,
             TarjetaProfesional : this.tarjeta,
             IdTipoDocumento : this.tipoDocumento,
             Direccion : this.direccion

     
         },{headers:new HttpHeaders ({"content-type":"application/json"})}
     );
 }
 
 public ActualizarAsociado(){ // Recurso que permite la actualizacion de los datos de un Empleado.
     let accionAztualizar = "modificarEmpleado"
     return this.http.put('https:/localhost/GitHub/juricol/recursos/validar.php',
         { 
             accion: accionAztualizar,
             IdEmpleado : this.id,
             PrimerNombre : this.primerNombre,
             SegundoNombre :this.segundoNombre,
             PrimerApellido: this.primerApellido,
             SegundoApellido :this.segundoApellido,
             FechaNacimiento : this.fechaNacimiento,
             Celular: this.celular,
             Telefono :this.telefono,
             Correo : this.correoElectronico,
             Titular :this.titular,               
             IdEspecialidad :this.especialidad,
             Documento :this.cedula,
             IdCargo : this.cargo,
             IdCiudad: this.ciudad,
             TarjetaProfesional : this.tarjeta,
             IdTipoDocumento : this.tipoDocumento,
             Direccion : this.direccion
         },{headers:new HttpHeaders ({"content-type":"application/json"})}
     );

 }
}