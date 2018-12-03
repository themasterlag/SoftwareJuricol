import { Component, OnInit } from '@angular/core';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { Cliente } from '../../../controladores/cliente';
import { HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
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

  
  private DatosJSON: any;
  constructor( private http : HttpClient ,private autenticadorService: AutenticadorService,private router: Router, private route:ActivatedRoute) { 
    if(autenticadorService.ProcesarToken() == false) {
      this.router.navigate(["/login"]);
    }
   
    this.Cliente = new Cliente(this.http) ;
    this.route.params.subscribe(
      parametro=>{
        
        this.Cliente.BuscarCliente(parametro.id).subscribe(
          response => {
          this.id = parametro.id;
          this.DatosJSON = response["mensaje"] ;
          this.correoElectronico = this.DatosJSON[0].Correo;
          this.celular = this.DatosJSON[0].Celular;
          this.direccion = this.DatosJSON[0].Direccion;
          this.cedula = this.DatosJSON[0].Documento;
          this.fechaNacimiento = this.DatosJSON[0].FechaNacimiento;
          this.primerApellido = this.DatosJSON[0].PrimerApellido;
          this.primerNombre = this.DatosJSON[0].PrimerNombre;
          this.segundoApellido = this.DatosJSON[0].SegundoApellido;
          this.segundoNombre = this.DatosJSON[0].SegundoNombre;
          this.telefono = this.DatosJSON[0].Telefono;
          this.correoElectronico= this.DatosJSON[0].Correo;
          this.direccion= this.DatosJSON[0].Direccion; 
          this.cedula= this.DatosJSON[0].Documento ;
          this.Cuidad=this.DatosJSON[0].IdCiudad;
          this.DocumentoAdicional= this.DatosJSON[0].DocumentoSustituto;
          this.CorreoElectronicoAdicional= this.DatosJSON[0].CorreoSustituto;
          this.CelularAdicional= this.DatosJSON[0].CelularSustituto;
          this.Parentesco= this.DatosJSON[0].IdParentesco;
          this.Entidad= this.DatosJSON[0].IdInstitucionLaboral;
          this.NombreAdicional= this.DatosJSON[0].NombreSustituto;
          this.TipoDocumento=this.DatosJSON[0].IdTipoDocumento;
          this.TipoDocumentoAdicional=this.DatosJSON[0].IdTipoDocumentoSusutituto;
          

          this.LlenarSelects();
          this.CargarPaises();
          this.CargarEntidad();
          this.CargarTiposDoc();
          this.CargarParentescos();
          }
        );
        
        });

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
    this.Cliente.ObtenerPaises().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.paises = response['mensaje']; 
          
  
  });
  }
  CargarDepartamentos(){
    this.Cuidad = 0;
    this.Cliente.ObtenerDepartamentos(this.Pais).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.departamentos = response['mensaje']; 
          
  
  });
  }
  CargarCuidades(){
    this.Cliente.ObtenerCiudades(this.Departamento).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.Ciudades = response['mensaje']; 

  });
  }
  LlenarSelects(){
    this.Cliente.ObtenerCiudad(this.Cuidad).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
              
          let ArrayCiudad : [''];
          ArrayCiudad = response['mensaje']; 
        
          this.Cliente.ObtenerCiudades(ArrayCiudad[0]['Departamentos_id']).subscribe(
            response=>{
              this.Ciudades = response['mensaje'];
            }
          )
          this.Cliente.ObtenerDepartamento(ArrayCiudad[0]['Departamentos_id']).subscribe(
            response=>{
              let ArrayDepartamento : [''];
              ArrayDepartamento = response['mensaje'];
              this.Departamento = ArrayDepartamento[0]['Id'];
              this.Pais = ArrayDepartamento[0]['Paises_id'];
              this.Cliente.ObtenerDepartamentos(ArrayDepartamento[0]['Paises_id']).subscribe(
                response=>{
                  this.departamentos = response['mensaje'];
                }
              )
            }
          )  
  });
  }
  CargarParentescos(){
    this.Cliente.ObtenerParentescos().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.Parentescos = response['mensaje']; 
            
  
  });
  }
  
  ngOnInit() {
  }

  GuardarCambios(){
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
 
      this.Cliente.SetId(this.id);
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
     

    this.Cliente.ActualizarCliente().subscribe(
      response=>{
        if(response["codigo"] == 200){

          swal({
            type: 'success',
            title: 'Se guardaron correctamente los cambios',
            timer: 5000
          
          });
     
         }
      },err=> {

        this.Respuesta = err.error["mensaje"]
        this.Respuesta = this.Respuesta.includes("Duplicate entry")
        if(this.Respuesta == true){
          this.Respuesta = "El documento del usuario ya existe"
          swal({
           type: 'error',
           title: this.Respuesta,
           timer: 5000
         });
        }
      }
    );

  }

Cancelar(){
  this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+"/clientes");
}
}
