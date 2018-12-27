import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../controladores/empleado';
import { HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { Router } from '@angular/router';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {

  id: number = null ;
  primerNombre: string = null;
  segundoNombre: string = null; 
  primerApellido: string = null;
  segundoApellido: string = null;
  fechaNacimiento:Date = null;
  celular: number = null;
  telefono:number = null;
  correoElectronico: string = null;  
  titular: number ;  
  especialidad: number ;
  cedula: number = null ;
  direccion : string = null ;
  Empleado: Empleado ;
  cargo :number ;
  especialidades: ['']; //Atributo donde podra contener un arreglo de las posibles especialidades de un Empleado
  cargos : ['']; //Atributo donde podra contener los posibles cargos de un empleado
  paises: ['']; //Atributo donde podra contener un arreglo de los posibles paises de un Empleado
  departamentos : ['']; //Atributo donde podra contener los posibles departamentos de un empleado
  ciudades: ['']; //Atributo donde podra contener un arreglo de las posibles cuidades de un Empleado
  pais: number ;
  departamento: number;
  cuidad : number ;
  tarjeta:number;
  tiposDocumentos:[''];
  tipoDecumento:number;
  Respuesta : any;


  constructor(private router: Router,private http : HttpClient,private autenticadorService: AutenticadorService,  private ambienteService: AmbienteService) {
    if(autenticadorService.ProcesarToken() != false) {
      this.tipoDecumento= 0;
      this.cargo = 0 ;
      this.especialidad = 0;
      this.titular = -1;
      this.pais = 0 ;
      this.departamento = 0;
      this.cuidad = 0;
      this.Empleado = new Empleado(this.http, this.ambienteService);
      this.tarjeta= null ;
      this.CargarPaises();
      this.CargarTiposDoc();
      this.CargarCargos();
      this.CargarEspecialidades();
    }
  }
  ngOnInit() {
    
  }

  GuardarEmpleado(){

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
    if(this.pais == null || this.pais == 0 ){
      swal({
        type: 'error',
        title: 'Campo Pais vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.departamento == null || this.departamento == 0 ){
      swal({
        type: 'error',
        title: 'Campo Departamento vacio',
        timer: 5000
      });
   
      return false
    }
    if(this.cuidad == null || this.cuidad == 0 ){
      swal({
        type: 'error',
        title: 'Campo Cuidad vacio',
        timer: 5000
      });
     
      return false
    }
    if(this.tipoDecumento == null || this.tipoDecumento == 0){
      swal({
        type: 'error',
        title: 'Campo Tipo Documento del Empleado vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.especialidad == null || this.especialidad == 0){
      swal({
        type: 'error',
        title: 'Campo Tipo Documento del Empleado vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.titular == null || this.titular == -1){
      swal({
        type: 'error',
        title: 'Campo Tipo Documento del Empleado vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.cargo == null || this.cargo == 0){
      swal({
        type: 'error',
        title: 'Campo Tipo Documento del Empleado vacio',
        timer: 5000
      });
      
      return false
    }
    if(this.tarjeta == null ){
      swal({
        type: 'error',
        title: 'Campo Tarjeta profesional del Empleado vacio',
        timer: 5000
      });
      
      return false
    }
      
     
    swal('Cargando');
    swal.showLoading();
    this.Empleado.SetPrimerNombre(this.primerNombre);
    this.Empleado.SetSegundoNombre(this.segundoNombre);
    this.Empleado.SetPrimerApellido(this.primerApellido);
    this.Empleado.SetSegundoApellido(this.segundoApellido);
    this.Empleado.SetCedula(this.cedula);
    this.Empleado.SetCelular(this.celular);
    this.Empleado.SetFecha(this.fechaNacimiento);
    this.Empleado.SetTelefono(this.telefono);
    this.Empleado.SetTitular(this.titular);
    this.Empleado.SetEspecialidad(this.especialidad);
    this.Empleado.SetCorreo(this.correoElectronico);
    this.Empleado.SetDireccion(this.direccion);
    this.Empleado.SetTipoDocumento(this.tipoDecumento);
    this.Empleado.SetCuidad(this.cuidad);
    this.Empleado.SetTarjeta(this.tarjeta);
    this.Empleado.SetCargo(this.cargo);
    

    this.Empleado.insertarEmpleado().subscribe(
      response=>{
        this.Respuesta = response;
        swal({
          type: 'success',
          title: response["mensaje"],
          timer: 5000
        });
        this.Empleado.SetId(this.id);
   this.primerNombre = null ;
   this.segundoNombre = null;
    this.primerApellido= null;
    this.segundoApellido= null;
    this.cedula= null;
    this.celular= null;
    this.fechaNacimiento= null;
    this.telefono= null;
    this.titular= null;
    this.especialidad= null;
    this.correoElectronico= null;
    this.direccion= null;
    this.tipoDecumento= null;
    this.cuidad= null;
    this.tarjeta= null;
    this.cargo= null;
    this.pais = 0 ;
    this.departamento= 0 ;
    this.cuidad = 0 ;
      }
    ),err => {
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
    };

  }
  CargarTiposDoc(){
    this.Empleado.ObtenerTiposDoc().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.tiposDocumentos = response['mensaje']; 
            
  
  });
  }
  CargarPaises(){
    swal('Cargando');
    swal.showLoading();
    this.Empleado.ObtenerPaises().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.paises = response['mensaje']; 
            swal.close();
  
  });
  }
  CargarDepartamentos(){
    swal('Cargando');
    swal.showLoading();
    this.cuidad = 0;
    this.Empleado.ObtenerDepartamentos(this.pais).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.departamentos = response['mensaje']; 
          swal.close();
  
  });
  }
  CargarCuidades(){
    swal('Cargando');
    swal.showLoading();
    this.Empleado.ObtenerCiudades(this.departamento).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.ciudades = response['mensaje']; 
        swal.close();
            
  
  });
  }
  CargarCargos(){ 
  //Llamado al Recurso ObtenerCargos() para cargar todas los cargos posibles de un empleado
  this.Empleado.ObtenerCargos().subscribe  
  (       //Asignacion de la respuesta del metodo al atributo cargos
          response => {
        this.cargos = response['mensaje']; 
          

});}

CargarEspecialidades(){ 
 //Llamado al metodo ObtenerEspecialidades() para cargar todas las especialidades posibles de un empleado
 this.Empleado.ObtenerEspecialidades().subscribe  
 (       //Asignacion de la respuesta del metodo al atributo especialidades
         response => {
       this.especialidades = response['mensaje']; 
         

});}
Cancelar(){
  this.router.navigateByUrl('/'+this.autenticadorService.GetUsuario()+"/empleados");
}

}
