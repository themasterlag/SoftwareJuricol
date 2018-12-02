import { HttpClient } from '@angular/common/http';


export class Parametrizacion {
 
    private id:number = null;
    private tipo:string = null;
    private nombre:string = null;
    private tipoDato:string = null;
    private diasLimite:number = null;
    private listaDatos:Object = null;
    private idRelacion:number = null;


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

    public buscarDatosLista(){
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
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarDepartamentos").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                }
            );
        }

        if(this.tipo == "ciudades"){
            // console.log("aqui list ciudades");
            return this.http.get("https:/localhost/GitHub/juricol/recursos/validar.php?accion=consultarCiudades").subscribe(
                response =>{
                    this.listaDatos = response['mensaje'];
                }
            );
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
        }
    }

}