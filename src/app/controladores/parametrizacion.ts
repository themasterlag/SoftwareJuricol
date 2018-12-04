import { HttpClient } from '@angular/common/http';


export class Parametrizacion {
 
    private id:number = null;
    private tipo:string = null;
    private nombre:string = null;
    private tipoDato:string = null;
    private diasLimite:number = null;
    private listaDatos:Object = null;
    private idRelacion:number = null;

    private error:any = null

    // metodos
    constructor(private http:HttpClient){}


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

    public GetError(){
        return this.error;
    }

    public buscarDatosLista(){
        this.listaDatos = null;
        if(this.tipo == "tiposDocumentos"){
            // console.log("aqui list tipos");
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarTiposDocumentos").subscribe(
                response => {
                    this.listaDatos = response['mensaje'];
                }
            );
        }

        if(this.tipo == "paises"){
            // console.log("aqui list paises");
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarPaises").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                }
            );
        }

        if(this.tipo == "departamentos"){
            // console.log("aqui list departamentos");
            if(this.idRelacion == null){
                return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos").subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    },error =>{
                        console.log(error.error["mensaje"])
                        this.error = "Error al consultar departamentos";
                        return this.error;                    
                    }
                );
            }
            else{
                return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos&IdPais="+this.idRelacion).subscribe(
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
                return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades").subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    }
                );
            }
            else{
                return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades&IdDepartamento="+this.idRelacion).subscribe(
                    response =>{
                        this.listaDatos = response['mensaje'];
                    }
                );
            }
            
        }

        if(this.tipo == "cargos"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCargos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                }
            );
        }

        if(this.tipo == "especialidades"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarEspecialidades").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                }
            );
        }

        if(this.tipo == "estadosDemanda"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarEstadosDemandas").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                }
            );
        }

        if(this.tipo == "estadosProceso"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarEstadosProcesos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    console.log(this.listaDatos);
                }
            );
        }

        if(this.tipo == "institucionesLaborales"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarInstitucionesLaborales").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    console.log(this.listaDatos);
                }
            );
        }

        if(this.tipo == "juzgados"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarJuzgados").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    console.log(this.listaDatos);
                }
            );
        }

        if(this.tipo == "parentescos"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarParentescos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    console.log(this.listaDatos);
                }
            );
        }

        if(this.tipo == "tiposProcesos"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarTiposProcesos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    console.log(this.listaDatos);
                }
            );
        }

        if(this.tipo == "tiposDemandas"){
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarTiposProcesos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                    console.log(this.listaDatos);
                }
            );
        }
    }

    public GuardarParametrizacion(){

        // Crear nuevo tipo
        if(this.id == null){
            if(this.tipo == "tiposDocumentos"){
                // console.log("aqui tipo documento");
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearTipoDocumento",
                    documentoNuevo: this.nombre
                });
                
            }

            if(this.tipo == "paises"){
                // console.log("aqui paises");
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearPais",
                    paisNuevo: this.nombre
                });
            }

            if(this.tipo == "departamentos"){
                // console.log("aqui departemntos");
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearDepartamento",
                    departamentoNuevo: this.nombre,
                    IdPais: this.idRelacion
                });
            }

            if(this.tipo == "ciudades"){
                // console.log("aqui ciudades");
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearCiudad",
                    ciudadNueva: this.nombre,
                    IdDepartamento: this.idRelacion
                });
            }

            if(this.tipo == "cargos"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearCargo",
                    cargoNuevo: this.nombre,
                });
            }

            if(this.tipo == "especialidades"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearEspecialidad",
                    especialidadNueva: this.nombre,
                });
            }

            if(this.tipo == "estadosDemanda"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearEstadoDemanda",
                    estadoDemandaNuevo: this.nombre,
                    DiasLimite: this.diasLimite,
                    Tipo: this.tipoDato,
                });
            }

            if(this.tipo == "estadosProceso"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearEstadoProceso",
                    estadoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "institucionesLaborales"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearInstitucionLaboral",
                    institucionNueva: this.nombre,
                    IdCiudad: this.idRelacion,
                });
            }

            if(this.tipo == "juzgados"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearJuzgado",
                    juzgadoNuevo: this.nombre,
                });
            }

            if(this.tipo == "parentescos"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearParentesco",
                    parentescoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposProcesos"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearTipoProceso",
                    tipoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposDemandas"){
                return this.http.post("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"crearTipoDemanda",
                    tipoDemandaNuevo: this.nombre,
                });
            }
        }

        // Editar un tipo
        else{
            if(this.tipo == "tiposDocumentos"){
                // console.log("aqui editar tipo documento");
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarTipoDocumento",
                    IdDocumento: this.id,
                    documentoNuevo: this.nombre
                });
            }

            if(this.tipo == "paises"){
                // console.log("aqui editar paises");
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarPais",
                    IdPais: this.id,
                    paisNuevo: this.nombre
                });
            }

            if(this.tipo == "departamentos"){
                // console.log("aqui editar departemntos");
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarDepartamento",
                    IdDepartamento: this.id,
                    departamentoNuevo: this.nombre,
                    IdPais: this.idRelacion
                });
            }

            if(this.tipo == "ciudades"){
                // console.log("aqui editar ciudades");
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarCiudad",
                    IdCiudad: this.id,
                    ciudadNueva: this.nombre,
                    IdDepartamento: this.idRelacion
                });
            }

            if(this.tipo == "cargos"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarCargo",
                    IdCargo: this.id,
                    cargoNuevo: this.nombre,
                });
            }

            if(this.tipo == "especialidades"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarEspecialidad",
                    IdEspecialidad: this.id,
                    especialidadNueva: this.nombre,
                });
            }

            if(this.tipo == "estadosDemanda"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarEstadoDemanda",
                    IdEstadoDemanda: this.id,
                    estadoDemandaNuevo: this.nombre,
                    DiasLimite: this.diasLimite,
                    Tipo: this.tipoDato
                });
            }

            if(this.tipo == "estadosProceso"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarEstadoProceso",
                    IdEstadoProceso: this.id,
                    estadoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "institucionesLaborales"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarInstitucionLaboral",
                    IdInstitucion: this.id,
                    institucionNueva: this.nombre,
                    IdCiudad: this.idRelacion,
                });
            }

            if(this.tipo == "juzgados"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarJuzgado",
                    IdJuzgado: this.id,
                    juzgadoNuevo: this.nombre,
                });
            }

            if(this.tipo == "parentescos"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarParentesco",
                    IdParentesco: this.id,
                    parentescoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposProcesos"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarTipoProceso",
                    IdTipoProceso: this.id,
                    tipoProcesoNuevo: this.nombre,
                });
            }

            if(this.tipo == "tiposDemandas"){
                return this.http.put("https:/localhost/GitHub/juricol/recursos/validar.php",{
                    accion:"modificarTipoDemanda",
                    IdTipoDemanda: this.id,
                    tipoDemandaNuevo: this.nombre,
                });
            }
        }
    }

}