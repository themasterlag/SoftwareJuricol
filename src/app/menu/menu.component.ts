import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticadorService } from "../servicios/autenticador.service"
import { filter } from 'rxjs/operators';

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

  gruposMenu: Array<Object> = [];

  searchObject={
    agrupamiento:"",
  }

  constructor(private ruta: ActivatedRoute, private servicioSesion: AutenticadorService) {
    this.usuario = servicioSesion.GetUsuario();

    this.menu = [
      { opcion: 'Ver demandas'        , url: '/'+this.usuario+'/demandas'         ,   agrupamiento: "Procesos"         , orden: 1  },
      { opcion: 'Procesador PDF'      , url: '/'+this.usuario+'/convertidorPdf'   ,   agrupamiento: "Procesos"         , orden: 1  },
      { opcion: 'Clientes'            , url: '/'+this.usuario+'/clientes'         ,   agrupamiento: "Administración"   , orden: 2  },
      { opcion: 'Empleados y Usarios' , url: '/'+this.usuario+'/empleados'        ,   agrupamiento: "Administración"   , orden: 2  },
      // { opcion: 'Registrar empleado', url: '/'+this.usuario+'/registrarEmpleado' },
      // { opcion: 'Registrar demanda', url: '/'+this.usuario+'/registrarDemanda' },
      { opcion: 'Tipos Documentos'    , url: '/'+this.usuario+'/tiposDocumentos'  ,   agrupamiento: "Parametrización"  , orden: 3  },
      { opcion: 'Paises'              , url: '/'+this.usuario+'/paises'           ,   agrupamiento: "Parametrización"  , orden: 3  },
      { opcion: 'Departamentos'       , url: '/'+this.usuario+'/departamentos'    ,   agrupamiento: "Parametrización"  , orden: 3  },
      { opcion: 'Ciudades'            , url: '/'+this.usuario+'/ciudades'         ,   agrupamiento: "Parametrización"  , orden: 3  },
      { opcion: 'Cambiar Contraseña'  , url: '/'+this.usuario+'/editarClave'      ,   agrupamiento: "Usuarios"         , orden: 4  }
    ];
    
    var menuActual="";
    for (var unmenu of this.menu) {
      if(menuActual != unmenu.agrupamiento){
        this.gruposMenu.push({nombre: unmenu.agrupamiento, orden: unmenu.orden});
        menuActual = unmenu.agrupamiento;
      }
    }

  console.log(this.gruposMenu);

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

  ngOnInit() {
  
  }

  cerrarSesion(){
    this.servicioSesion.CerrarSesion();
  }

}
