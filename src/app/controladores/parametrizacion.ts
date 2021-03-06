import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { AmbienteService } from '../servicios/ambiente.service';


export class Parametrizacion {
 
    private id:number = null;
    private tipo:string = null;
    private nombre:string = null;
    private tipoDato:string = null;
    private diasLimite:number = null;
    private listaDatos:Object = null;
    private idRelacion:number = null;

    private respuesta:any = null;
    private error:any = null

    private ruta:string = null;

    // metodos
    constructor(private http:HttpClient, private ambienteService: AmbienteService){
        this.ruta = this.ambienteService.GetRutaAmbiente();
    }


    public SetId(Id){
        this.id = Id;
    }

    public SetTipo(Tipo){
        this.tipo = Tipo;
    }

    public SetNombre(Nombre){
        this.nombre = Nombre;
    }

    public SetIdRelacion(IdRelacion){
        this.idRelacion = IdRelacion;
    }

    public SetTipoDato(tipoDato){
        this.tipoDato = tipoDato;
    }

    public SetDiasLimites(DiasLimite){
        this.diasLimite = DiasLimite;
    }


    public GetNombre(){
        return this.nombre;
    }

    public GetListaDatos(){
        return this.listaDatos;
    }

    public GetRespuesta(){
        return this.respuesta;
    }

    public GetError(){
        return this.error;
    }

    public buscarDatosLista(){
        this.listaDatos = null;
        if(this.tipo == "tiposDocumentos"){
            // console.log("aqui list tipos");
            return this.http.get(this.ruta+"validar.php?accion=consultarTiposDocumentos").subscribe(
                response => {
                    this.listaDatos = response['mensaje'];
                },error =>{
                    this.error = "Error al consultar tipos de documentos";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "paises"){
            // console.log("aqui list paises");
            return this.http.get(this.ruta+"validar.php?accion=consultarPaises").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                },error =>{
                    this.error = "Error al consultar paises";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "departamentos"){
            // console.log("aqui list departamentos");
            if(this.idRelacion == null){
                return this.http.get(this.ruta+"validar.php?accion=consultarDepartamentos").subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    },error =>{
                        this.error = "Error al consultar departamentos";
                        return this.error;                    
                    }
                );
            }
            else{
                return this.http.get(this.ruta+"validar.php?accion=consultarDepartamentos&IdPais="+this.idRelacion).subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    },error =>{
                        this.error = "Error al consusltar departamentos de un pais";
                        return this.error;
                    }
                );
            }
        }

        if(this.tipo == "ciudades"){
            // console.log("aqui list ciudades");
            if(this.idRelacion == null){
                return this.http.get(this.ruta+"validar.php?accion=consultarCiudades").subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    },error =>{
                        this.error = "Error al consultar ciudades";
                        return this.error;                    
                    }
                );
            }
            else{
                return this.http.get(this.ruta+"validar.php?accion=consultarCiudades&IdDepartamento="+this.idRelacion).subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    },error =>{
                        this.error = "Error al consultar ciudades";
                        return this.error;                    
                    }
                );
            }
            
        }

        if(this.tipo == "cargos"){
            return this.http.get(this.ruta+"validar.php?accion=consultarCargos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                },error =>{
                    this.error = "Error al consultar cargos";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "especialidades"){
            return this.http.get(this.ruta+"validar.php?accion=consultarEspecialidades").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                },error =>{
                    this.error = "Error al consultar especialidades";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "estadosDemanda"){
            return this.http.get(this.ruta+"validar.php?accion=consultarEstadosDemandas").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                },error =>{
                    this.error = "Error al consultar estados de demandas";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "estadosProceso"){
            return this.http.get(this.ruta+"validar.php?accion=consultarEstadosProcesos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                     
                },error =>{
                    this.error = "Error al consultar estados de procesos";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "institucionesLaborales"){
            return this.http.get(this.ruta+"validar.php?accion=consultarInstitucionesLaborales").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                     
                },error =>{
                    this.error = "Error al consultar instituciones laborales";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "juzgados"){
            return this.http.get(this.ruta+"validar.php?accion=consultarJuzgados").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                     
                },error =>{
                    this.error = "Error al consultar juzgados";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "parentescos"){
            return this.http.get(this.ruta+"validar.php?accion=consultarParentescos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                     
                },error =>{
                    this.error = "Error al consultar parentescos";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "tiposProcesos"){
            return this.http.get(this.ruta+"validar.php?accion=consultarTiposProcesos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    
                },error =>{
                    this.error = "Error al consultar tipos de procesos";
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "tiposDemandas"){
            return this.http.get(this.ruta+"validar.php?accion=consultarTiposDemandas").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    
                },error =>{
                    this.error = "Error al consultar tipos de demandas";
                    return this.error;                    
                }
            );
        }
    }

    public GuardarParametrizacion(){

        // Crear nuevo tipo
        if(this.id == null){
            if(this.tipo == "tiposDocumentos"){
                // console.log("aqui tipo documento");
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearTipoDocumento",
                    documentoNuevo: this.nombre
                });
                
            }

            if(this.tipo == "paises"){
                // console.log("aqui paises");
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearPais",
                    paisNuevo: this.nombre
                });
            }

            if(this.tipo == "departamentos"){
                // console.log("aqui departemntos");
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearDepartamento",
                    departamentoNuevo: this.nombre,
                    IdPais: this.idRelacion
                });
            }

            if(this.tipo == "ciudades"){
                // console.log("aqui ciudades");
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearCiudad",
                    ciudadNueva: this.nombre,
                    IdDepartamento: this.idRelacion
                });
            }

            if(this.tipo == "cargos"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearCargo",
                    cargoNuevo: this.nombre,
                });
            }

            if(this.tipo == "especialidades"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearEspecialidad",
                    especialidadNueva: this.nombre,
                });
            }

            if(this.tipo == "estadosDemanda"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearEstadoDemanda",
                    estadoDemandaNuevo: this.nombre,
                    DiasLimite: this.diasLimite,
                    Tipo: this.tipoDato,
                });
            }

            if(this.tipo == "estadosProceso"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearEstadoProceso",
                    estadoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "institucionesLaborales"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearInstitucionLaboral",
                    institucionNueva: this.nombre,
                    IdCiudad: this.idRelacion,
                });
            }

            if(this.tipo == "juzgados"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearJuzgado",
                    juzgadoNuevo: this.nombre,
                });
            }

            if(this.tipo == "parentescos"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearParentesco",
                    parentescoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposProcesos"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearTipoProceso",
                    tipoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposDemandas"){
                return this.http.post(this.ruta+"validar.php",{
                    accion:"crearTipoDemanda",
                    tipoDemandaNueva: this.nombre,
                });
            }
        }

        // Editar un tipo
        else{
            if(this.tipo == "tiposDocumentos"){
                // console.log("aqui editar tipo documento");
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarTipoDocumento",
                    IdDocumento: this.id,
                    documentoNuevo: this.nombre
                });
            }

            if(this.tipo == "paises"){
                // console.log("aqui editar paises");
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarPais",
                    IdPais: this.id,
                    paisNuevo: this.nombre
                });
            }

            if(this.tipo == "departamentos"){
                // console.log("aqui editar departemntos");
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarDepartamento",
                    IdDepartamento: this.id,
                    departamentoNuevo: this.nombre,
                    IdPais: this.idRelacion
                });
            }

            if(this.tipo == "ciudades"){
                // console.log("aqui editar ciudades");
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarCiudad",
                    IdCiudad: this.id,
                    ciudadNueva: this.nombre,
                    IdDepartamento: this.idRelacion
                });
            }

            if(this.tipo == "cargos"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarCargo",
                    IdCargo: this.id,
                    cargoNuevo: this.nombre,
                });
            }

            if(this.tipo == "especialidades"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarEspecialidad",
                    IdEspecialidad: this.id,
                    especialidadNueva: this.nombre,
                });
            }

            if(this.tipo == "estadosDemanda"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarEstadoDemanda",
                    IdEstadoDemanda: this.id,
                    estadoDemandaNuevo: this.nombre,
                    DiasLimite: this.diasLimite,
                    Tipo: this.tipoDato
                });
            }

            if(this.tipo == "estadosProceso"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarEstadoProceso",
                    IdEstadoProceso: this.id,
                    estadoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "institucionesLaborales"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarInstitucionLaboral",
                    IdInstitucion: this.id,
                    institucionNueva: this.nombre,
                    IdCiudad: this.idRelacion,
                });
            }

            if(this.tipo == "juzgados"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarJuzgado",
                    IdJuzgado: this.id,
                    juzgadoNuevo: this.nombre,
                });
            }

            if(this.tipo == "parentescos"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarParentesco",
                    IdParentesco: this.id,
                    parentescoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposProcesos"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarTipoProceso",
                    IdTipoProceso: this.id,
                    tipoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposDemandas"){
                return this.http.put(this.ruta+"validar.php",{
                    accion:"modificarTipoDemanda",
                    IdTipoDemanda: this.id,
                    tipoDemandaNueva: this.nombre,
                });
            }
        }
    }


    public EliminarParametrizacion(){
        if(this.tipo == "tiposDocumentos"){
            // console.log("aqui list tipos");
            return this.http.delete(this.ruta+"validar.php?accion=eliminarTipoDocumento&IdTipoDocumento="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el tipo de documento";
                   
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "paises"){
            // console.log("aqui list paises");
            return this.http.delete(this.ruta+"validar.php?accion=eliminarPais&IdPais="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el pais";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "departamentos"){
            // console.log("aqui list departamentos");
            if(this.idRelacion == null){
                return this.http.delete(this.ruta+"validar.php?accion=eliminarDepartamento&IdDepartamento="+this.id).subscribe(
                    response => {
                        if(response != null){
                            this.respuesta = response['mensaje'];
                            return this.respuesta;  
                        }
                    },error =>{
                        this.error = "Error al eliminar el departamentos";
                        
                        return this.error;                    
                    }
                );
            }
        }

        if(this.tipo == "ciudades"){
            // console.log("aqui list ciudades");
            if(this.idRelacion == null){
                return this.http.delete(this.ruta+"validar.php?accion=eliminarCiudad&IdCiudad="+this.id).subscribe(
                    response => {
                        if(response != null){
                            this.respuesta = response['mensaje'];
                            return this.respuesta;  
                        }
                    },error =>{
                        this.error = "Error al eliminar la ciudad";
                        
                        return this.error;                    
                    }
                );
            }
        }

        if(this.tipo == "cargos"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarCargo&IdCargo="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el cargos";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "especialidades"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarEspecialidad&IdEspecialidad="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar la especialidades";
                  
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "estadosDemanda"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarEstadoDemanda&IdEstadoDemanda="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el estado de demanda";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "estadosProceso"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarEstadoProceso&IdEstadoProceso="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el estados de proceso";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "institucionesLaborales"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarInstitucionLaboral&IdInstitucionLaboral="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar la institucion laboral";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "juzgados"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarJuzgados&IdJuzgado="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el juzgado";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "parentescos"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarParentesco&IdParentesco="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el parentesco";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "tiposProcesos"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarTipoProceso&IdTipoProceso="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el tipo de proceso";
                    
                    return this.error;                    
                }
            );
        }

        if(this.tipo == "tiposDemandas"){
            return this.http.delete(this.ruta+"validar.php?accion=eliminarTipoDemanda&IdTipoDemanda="+this.id).subscribe(
                response => {
                    if(response != null){
                        this.respuesta = response['mensaje'];
                        return this.respuesta;  
                    }
                },error =>{
                    this.error = "Error al eliminar el tipo de demanda";
                    
                    return this.error;                    
                }
            );
        }
    }

}