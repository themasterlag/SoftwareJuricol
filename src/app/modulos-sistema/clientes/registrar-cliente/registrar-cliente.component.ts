import { Component } from '@angular/core'; //importacion de las librerias de angular para crear componentes
import { Cliente } from '../../../controladores/cliente';
import { HttpClient} from '@angular/common/http';// importacion de la libreria HttpClient
import { Router, Routes }  from '@angular/router';
import swal from 'sweetalert2';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { AmbienteService } from 'src/app/servicios/ambiente.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent  {

  //Atributos de la clase de la interfaz
  id: number = null ; // atributo donde se guarda temporalmete el id del cliente
  primerNombre: string = null; // atributo donde se guarda temporalmete el primerNombre del cliente
  segundoNombre: string = null; // atributo donde se guarda temporalmete el segundoNombre del cliente
  primerApellido: string = null;// atributo donde se guarda temporalmete el primerApellido del cliente
  segundoApellido: string = null;// atributo donde se guarda temporalmete el segundoApellido del cliente
  fechaNacimiento:Date = null;// atributo donde se guarda temporalmete el fechaNacimiento del cliente
  celular: number = null;// atributo donde se guarda temporalmete el numero de celular del cliente
  telefono:number = null;// atributo donde se guarda temporalmete el numero de telefono del cliente
  correoElectronico: string = null; // atributo donde se guarda temporalmete el correoElectronico del cliente
  direccion: string = null ; // atributo donde se guarda temporalmete la direccion recidencial del cliente
  cedula: number = null ;// atributo donde se guarda temporalmete la cedula del cliente
  Cliente : Cliente ; // Atributo de tipo cliente
  Respuesta: any;
  paises: ['']; //Atributo donde podra contener un arreglo de los posibles paises de un Empleado
  departamentos : ['']; //Atributo donde podra contener los posibles departamentos de un empleado
  Ciudades: ['']; //Atributo donde podra contener un arreglo de las posibles cuidades de un Empleado
  Pais:number ; // atributo donde se guarda temporalmete el pais del cliente
  Departamento: number;// atributo donde se guarda temporalmete el Departamento del cliente
  Cuidad:number ; // atributo donde se guarda temporalmete la Cuidad del cliente
  NombreAdicional:string;
  DocumentoAdicional:number;
  CelularAdicional: number = null;
  CorreoElectronicoAdicional: string;
  Entidades:[''];
  Parentescos:[''];
  Entidad:number;
  Parentesco: number;
  TiposDocumentos:[''];
  TipoDocumento:number;
  TipoDocumentoAdicional:number;


  //una variable de tipo HttpClient para hacer el debido procesamineto del constructor

  constructor(private http : HttpClient,private autenticadorService: AutenticadorService, private route: Router,private router: Router,  private ambienteService: AmbienteService) {
    if(autenticadorService.ProcesarToken() != false) {
      this.Cliente = new Cliente(this.http,this.ambienteService) ; // instanciacion de un objeto tipo Cliente
      this.Pais = 0 ;
      this.Departamento = 0;
      this.Cuidad = 0;
      this.Entidad = 0;
      this.Parentesco = 0;
      this.TipoDocumento=0;
      this.TipoDocumentoAdicional=0;
      this.CargarPaises();
      this.CargarEntidad();
      this.CargarTiposDoc();
      this.CargarParentescos();
    }
  }

  // Metodo de la interfaz que utiliza metodos del objeto empleado para transferir los datos introducidos en pantalla
  // ademas el metodo de intertar un cliente para Crear un registro de cliente en la BD.
  GuardarCliente(){
   
    if(this.primerNombre == null || this.primerNombre == ""){
      swal({
        type: 'error',
        title: 'Campo primer nombre vacio',
        timer: 5000
      });
      return false
    }
   
    if(this.primerApellido == null || this.primerApellido == ""){
      swal({
        type: 'error',
        title: 'Campo primer Apellido vacio',
        timer: 5000
      });
  
      return false
    }
  ;
    if(this.cedula == null ){
      swal({
        type: 'error',
        title: 'Campo Documento vacio',
        timer: 5000
      });
     return false
    }
    if(this.celular == null ){
      swal({
        type: 'error',
        title: 'Campo celular vacio',
        timer: 5000
      });
      
      return false
    }
    
    if(this.fechaNacimiento == null ){
      swal({
        type: 'error',
        title: 'Campo Fecha nacimiento vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.direccion == null || this.direccion == "" ){
      swal({
        type: 'error',
        title: 'Campo direccion vacio',
        timer: 5000
      });
     
      return false
    }
    if(this.correoElectronico == null || this.correoElectronico == "" ){
      swal({
        type: 'error',
        title: 'Campo correo electronico vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.Pais == null || this.Pais == 0 ){
      swal({
        type: 'error',
        title: 'Campo Pais vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.Departamento == null || this.Departamento == 0 ){
      swal({
        type: 'error',
        title: 'Campo Departamento vacio',
        timer: 5000
      });
   
      return false
    }
    if(this.Cuidad == null || this.Cuidad == 0 ){
      swal({
        type: 'error',
        title: 'Campo Cuidad vacio',
        timer: 5000
      });
     
      return false
    }
    if(this.Entidad == null || this.Entidad == 0 ){
      swal({
        type: 'error',
        title: 'Campo Entidad donde labora vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.Parentesco == null || this.Parentesco == 0 ){
      swal({
        type: 'error',
        title: 'Campo Parentesco vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.NombreAdicional == null || this.NombreAdicional == "" ){
      swal({
        type: 'error',
        title: 'Campo Nombre Contacto Adicional vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.DocumentoAdicional == null || this.DocumentoAdicional == 0 ){
      swal({
        type: 'error',
        title: 'Campo Documentodel Contacto Adicional vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.CelularAdicional == null || this.CelularAdicional == 0){
      swal({
        type: 'error',
        title: 'Campo Celular Contacto Adicional vacio',
        timer: 5000
      });

      return false
    }
    if(this.CorreoElectronicoAdicional == null || this.CorreoElectronicoAdicional == ""){
      swal({
        type: 'error',
        title: 'Campo Correo del Contacto Adicional vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.Parentesco == null || this.Parentesco == 0){
      swal({
        type: 'error',
        title: 'Campo Parentesco del Contacto Adicional vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.TipoDocumento == null || this.TipoDocumento == 0){
      swal({
        type: 'error',
        title: 'Campo Tipo Documento del Cliente vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.TipoDocumentoAdicional == null || this.TipoDocumentoAdicional == 0){
      swal({
        type: 'error',
        title: 'Campo Tipo Documento del  Contacto Adicional vacio',
        timer: 5000
      });
      
      return false
    }
    swal('Cargando');
    swal.showLoading();
    this.Cliente.SetPrimerNombre(this.primerNombre);
    this.Cliente.SetSegundoNombre(this.segundoNombre);
    this.Cliente.SetPrimerApellido(this.primerApellido);
    this.Cliente.SetSegundoApellido(this.segundoApellido);
    this.Cliente.SetCedula(this.cedula);
    this.Cliente.SetCelular(this.celular);
    this.Cliente.SetFecha(this.fechaNacimiento);
    this.Cliente.SetTelefono(this.telefono);
    this.Cliente.SetDireccion(this.direccion);
    this.Cliente.SetCorreo(this.correoElectronico);
    this.Cliente.SetCorreoAdicional(this.CorreoElectronicoAdicional);
    this.Cliente.SetNombreAdicional(this.NombreAdicional);
    this.Cliente.SetDocumentoAdicional(this.DocumentoAdicional);
    this.Cliente.SetCuidad(this.Cuidad);
    this.Cliente.SetParentesco(this.Parentesco);
    this.Cliente.SetCelularAdicional(this.CelularAdicional);
    this.Cliente.SetEntidad(this.Entidad);
    this.Cliente.SetTipoDocumento(this.TipoDocumento);
    this.Cliente.SetTipoDucumentoAdiconal(this.TipoDocumentoAdicional);
   



    this.Cliente.insertarCliente().subscribe(

      respuesta =>{
        this.Respuesta = respuesta ;
        swal({
          type: 'success',
          title: respuesta["mensaje"],
          timer: 5000
        });
        

        
        this.primerNombre = null; // atributo donde se guarda temporalmete el primerNombre del cliente
        this.segundoNombre = null; // atributo donde se guarda temporalmete el segundoNombre del cliente
        this.primerApellido= null;// atributo donde se guarda temporalmete el primerApellido del cliente
        this.segundoApellido= null;// atributo donde se guarda temporalmete el segundoApellido del cliente
        this.fechaNacimiento = null;// atributo donde se guarda temporalmete el fechaNacimiento del cliente
        this.celular= null;// atributo donde se guarda temporalmete el numero de celular del cliente
        this.telefono= null;// atributo donde se guarda temporalmete el numero de telefono del cliente
        this.correoElectronico= null; // atributo donde se guarda temporalmete el correoElectronico del cliente
        this.direccion= null ; // atributo donde se guarda temporalmete la direccion recidencial del cliente
        this.cedula= null ;// atributo donde se guarda temporalmete la cedula del cliente
        this.Cuidad=0;
        this.Departamento=0;
        this.Pais = 0;
        this.DocumentoAdicional= null;
        this.CorreoElectronicoAdicional= null;
        this.CelularAdicional= null;
        this.Parentesco= 0;
        this.Entidad=0;
        this.NombreAdicional= null;
        this.TipoDocumento= null;
        this.TipoDocumentoAdicional=null;
                  
     },err => {
       this.Respuesta = err.error["mensaje"]
       this.Respuesta = this.Respuesta.includes("Duplicate entry")
       if(this.Respuesta == true){
         this.Respuesta = "El documento del usuario ya existe"
         swal({
          type: 'success',
          title: this.Respuesta,
          timer: 5000
        });
       }
     }
     
   );

 

  }
  CargarEntidad(){
    this.Cliente.ObtenerEntidades().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.Entidades = response['mensaje']; 
            
  
  });
  }
  CargarTiposDoc(){
    this.Cliente.ObtenerTiposDoc().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.TiposDocumentos = response['mensaje']; 
            
  
  });
  }
  CargarPaises(){
    swal('Cargando');
    swal.showLoading();
    this.Cliente.ObtenerPaises().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.paises = response['mensaje']; 
            swal.close();
  
  });
  }
  CargarDepartamentos(){
    swal('Cargando');
    swal.showLoading();
    this.Cliente.ObtenerDepartamentos(this.Pais).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.departamentos = response['mensaje']; 
          swal.close();
  
  });
  }
  CargarCuidades(){
    swal('Cargando');
    swal.showLoading();
    this.Cliente.ObtenerCiudades(this.Departamento).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.Ciudades = response['mensaje']; 
          swal.close();
         
            
  
  });
  }
  CargarParentescos(){
    this.Cliente.ObtenerParentescos().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.Parentescos = response['mensaje']; 
            
  
  });
  }
  
  Cancelar(){
    this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+"/clientes");
  }
}
