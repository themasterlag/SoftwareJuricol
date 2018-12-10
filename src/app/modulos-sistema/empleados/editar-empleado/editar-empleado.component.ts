import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../controladores/Empleado';
import { HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticadorService } from '../../../servicios/autenticador.service';
import { Usuario } from '../../../controladores/usuario';
import { AmbienteService } from 'src/app/servicios/ambiente.service';


@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  controladorUsuario:Usuario;
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
  rol: number;
  Roles:Array<Object>=[];
  RolPropio;
  BloqueoRol;
  
  private DatosJSON: any;

  constructor(private router: Router, private http: HttpClient, private autenticadorService: AutenticadorService,private route:ActivatedRoute,  private ambienteService: AmbienteService) {
    if(autenticadorService.ProcesarToken() != false) {

    this.controladorUsuario = new Usuario(this.http, this.ambienteService);
    this.Empleado = new Empleado(this.http, this.ambienteService) ;
    this.RolPropio = autenticadorService.GetRol();
    this.route.params.subscribe(
      parametro=>{
        this.id= parametro.id
        this.Empleado.BuscarEmpleado(parametro.id).subscribe(
          response => {

          this.DatosJSON = response["mensaje"] ;
          this.correoElectronico = this.DatosJSON[0].CorreoElectronico;
          this.celular = this.DatosJSON[0].Celular;
          this.direccion = this.DatosJSON[0].Direccion;
          this.cedula = this.DatosJSON[0].Documento;
          this.fechaNacimiento = this.DatosJSON[0].FechaNacimiento;
          this.primerApellido = this.DatosJSON[0].PrimerApellido;
          this.primerNombre = this.DatosJSON[0].PrimerNombre;
          this.segundoApellido = this.DatosJSON[0].SegundoApellido;
          this.segundoNombre = this.DatosJSON[0].SegundoNombre;
          this.especialidad = this.DatosJSON[0].IdEspecialidad;
          this.tipoDecumento = this.DatosJSON[0].IdTipoDocumento;
          this.cuidad = this.DatosJSON[0].IdCiudad;
          this.tarjeta = this.DatosJSON[0].TarjetaProfesional;
          this.titular = this.DatosJSON[0].Titular;
          this.cargo = this.DatosJSON[0].IdCargo;
          this.rol = this.DatosJSON[0].IdRol
          if(this.rol == null || this.rol == undefined){
            this.rol = 0;
            this.BloqueoRol = true;
          }
          this.LlenarSelects();
          }
        );
        
        });
        this.CargarTiposDoc();
        this.CargarPaises();
        this.CargarCargos();
        this.CargarEspecialidades();
    }
  }

  ngOnInit() {
    this.controladorUsuario.BuscarRoles().add(
      response=>{
         this.Roles = this.controladorUsuario.GetRoles();
      }
    )
  }

  GuardarAsociado(){
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
    this.Empleado.SetId(this.id);
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
    this.Empleado.SetRol(this.rol);
    

    this.Empleado.ActualizarAsociado().subscribe(
      response=>{
        this.Respuesta = response;
        if(response['codigo'] == 200){

          swal({
            type: 'success',
            title: 'Se guardaron correctamente los cambios',
            timer: 5000
          
          });
     
         }
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
  LlenarSelects(){
    this.Empleado.ObtenerCiudad(this.cuidad).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
              
          let ArrayCiudad : [''];
          ArrayCiudad = response['mensaje']; 
        
          this.Empleado.ObtenerCiudades(ArrayCiudad[0]['Departamentos_id']).subscribe(
            response=>{
              this.ciudades = response['mensaje'];
            }
          )
          this.Empleado.ObtenerDepartamento(ArrayCiudad[0]['Departamentos_id']).subscribe(
            response=>{
              let ArrayDepartamento : [''];
              ArrayDepartamento = response['mensaje'];
              this.departamento = ArrayDepartamento[0]['Id'];
              this.pais = ArrayDepartamento[0]['Paises_id'];
              this.Empleado.ObtenerDepartamentos(ArrayDepartamento[0]['Paises_id']).subscribe(
                response=>{
                  this.departamentos = response['mensaje'];
                }
              )
            }
          )  
  });
  }
  CargarTiposDoc(){
    this.Empleado.ObtenerTiposDoc().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.tiposDocumentos = response['mensaje']; 
            
  
  });
  }
  CargarPaises(){
    
    this.Empleado.ObtenerPaises().subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.paises = response['mensaje']; 
            
  
  });
  }
  CargarDepartamentos(){
    this.cuidad = 0;
    this.Empleado.ObtenerDepartamentos(this.pais).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.departamentos = response['mensaje']; 
          
  
  });
  }
  CargarCuidades(){
    this.Empleado.ObtenerCiudades(this.departamento).subscribe  
    (       //Asignacion de la respuesta del metodo al atributo cargos
            response => {
          this.ciudades = response['mensaje']; 
        
            
  
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
