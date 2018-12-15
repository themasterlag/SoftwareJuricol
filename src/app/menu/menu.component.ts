import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AutenticadorService } from "../servicios/autenticador.service"


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  tipoMenu: number=0;

  usuario:any = null;
  // urlUsuario:any=this.ruta.paramMap.subscribe(
  //     ( params: ParamMap ) : void => {
  //       this.urlUsuario = params.get( "usuario" );
  //       // console.log('v'+valor);
  //       // this.urlUsuario = valor;
  //       console.log(this.urlUsuario);
  //     }
  //   );

  //opciones del menu con nombre y url
  menu:any;
  
  nuevoMenu:Array<Object> = [];

  gruposMenu: Array<Object> = [];

  searchObject={
    agrupamiento:"",
  }

  constructor(private router: Router, private ruta: ActivatedRoute, private servicioSesion: AutenticadorService) {
    if(servicioSesion.ProcesarToken() != false) {
   
      this.usuario = servicioSesion.GetUsuario();

      let tipoUsuario = this.servicioSesion.GetRol();

      if(tipoUsuario == "Abogado"){
        this.menu = [
          { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                  , icon: "fa-folder-open"          , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Cambiar Contraseña'        , url: '/'+this.usuario+'/editarClave'               , icon: "fa-key"                  , agrupamiento: "Usuarios"         , orden: 4  }
        ];
      }

      if(tipoUsuario == "Administrador"){
        this.menu = [
          { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                  , icon: "fa-folder-open"          , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Procesador PDF'            , url: '/'+this.usuario+'/convertidorPdf'            , icon: "fa-file-pdf-o"           , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Clientes'                  , url: '/'+this.usuario+'/clientes'                  , icon: "fa-id-card-o"            , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Empleados y Usarios'       , url: '/'+this.usuario+'/empleados'                 , icon: "fa-user-o"               , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Tipos Documentos'          , url: '/'+this.usuario+'/tiposDocumentos'           , icon: "fa-file-text-o"          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Paises'                    , url: '/'+this.usuario+'/paises'                    , icon: "fa-plane"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Departamentos'             , url: '/'+this.usuario+'/departamentos'             , icon: "fa-bus"                  , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Ciudades'                  , url: '/'+this.usuario+'/ciudades'                  , icon: "fa-car"                  , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Cargos'                    , url: '/'+this.usuario+'/cargos'                    , icon: "fa-user-circle-o"        , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Especialidades'            , url: '/'+this.usuario+'/especialidades'            , icon: "fa-graduation-cap"       , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados de la Demana'      , url: '/'+this.usuario+'/estadosDemandas'           , icon: "fa-gavel"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados del Proceso'       , url: '/'+this.usuario+'/estadosProcesos'           , icon: "fa-tasks"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Instituciones Laborales'   , url: '/'+this.usuario+'/institucionesLaborales'    , icon: "fa-university "          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Juzgados'                  , url: '/'+this.usuario+'/juzgados'                  , icon: "fa-balance-scale "       , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Parentescos'               , url: '/'+this.usuario+'/parentesco'                , icon: "fa-child "               , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Procesos'         , url: '/'+this.usuario+'/tiposProcesos'             , icon: "fa-clone"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Demanda'          , url: '/'+this.usuario+'/tipoDemandas'              , icon: "fa-suitcase"             , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Cambiar Contraseña'        , url: '/'+this.usuario+'/editarClave'               , icon: "fa-key"                  , agrupamiento: "Usuarios"         , orden: 4  }
        ];
      }

      if(tipoUsuario == "Recepcionista"){
        this.menu = [
          { opcion: 'Demandas'                  , url: '/'+this.usuario+'/demandas'                  , icon: "fa-folder-open"          , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Procesador PDF'            , url: '/'+this.usuario+'/convertidorPdf'            , icon: "fa-file-pdf-o"           , agrupamiento: "Procesos"         , orden: 1  },
          { opcion: 'Clientes'                  , url: '/'+this.usuario+'/clientes'                  , icon: "fa-id-card-o"            , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Empleados y Usarios'       , url: '/'+this.usuario+'/empleados'                 , icon: "fa-user-o"               , agrupamiento: "Administración"   , orden: 2  },
          { opcion: 'Tipos Documentos'          , url: '/'+this.usuario+'/tiposDocumentos'           , icon: "fa-file-text-o"          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Paises'                    , url: '/'+this.usuario+'/paises'                    , icon: "fa-plane"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Departamentos'             , url: '/'+this.usuario+'/departamentos'             , icon: "fa-bus"                  , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Ciudades'                  , url: '/'+this.usuario+'/ciudades'                  , icon: "fa-car"                  , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados de la Demana'      , url: '/'+this.usuario+'/estadosDemandas'           , icon: "fa-gavel"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Estados del Proceso'       , url: '/'+this.usuario+'/estadosProcesos'           , icon: "fa-tasks"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Instituciones Laborales'   , url: '/'+this.usuario+'/institucionesLaborales'    , icon: "fa-university "          , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Juzgados'                  , url: '/'+this.usuario+'/juzgados'                  , icon: "fa-balance-scale "       , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Parentescos'               , url: '/'+this.usuario+'/parentesco'                , icon: "fa-child "               , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Procesos'         , url: '/'+this.usuario+'/tiposProcesos'             , icon: "fa-clone"                , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Tipos de Demanda'          , url: '/'+this.usuario+'/tipoDemandas'              , icon: "fa-suitcase"             , agrupamiento: "Parametrización"  , orden: 3  },
          { opcion: 'Cambiar Contraseña'        , url: '/'+this.usuario+'/editarClave'               , icon: "fa-key"                  , agrupamiento: "Usuarios"         , orden: 4  }
        ];
      }

    }

    var menuActual="";
    for (var unmenu of this.menu) {
      if(menuActual != unmenu.agrupamiento){
        this.gruposMenu.push({nombre: unmenu.agrupamiento, orden: unmenu.orden, opciones: [] });
        menuActual = unmenu.agrupamiento;
      }
    }

    for (var grupo of this.gruposMenu) {
      
      
      for(var opcion of this.menu){
        if(grupo['orden'] == opcion['orden']){
          grupo['opciones'].push(opcion);
        }
        
      }
      this.nuevoMenu.push(grupo);  
    }

    //console.log(this.nuevoMenu);


  }


  ngOnInit() {
  }

  //muestra o culta el menu cuando la pantalla es pequeña
  cambio() { 
    if(this.tipoMenu==0){
      this.tipoMenu = 1;
    }
    else{
      this.tipoMenu = 0;
    }
  }



  cerrarSesion(){
    this.servicioSesion.CerrarSesion();
  }

}
