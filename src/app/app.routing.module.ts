import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';


import { LoginComponent } from './modulos-sistema/login/login/login.component';
import { RecuperarClaveComponent } from './modulos-sistema/login/recuperar-clave/recuperar-clave.component';
import { CodigoVerificacionComponent } from './modulos-sistema/login/codigo-verificacion/codigo-verificacion.component';
import { RestablecerClaveComponent } from './modulos-sistema/login/restablecer-clave/restablecer-clave.component';


import { ListaEmpleadosComponent } from './modulos-sistema/empleados/lista-empleados/lista-empleados.component';
import { RegistrarEmpleadoComponent } from './modulos-sistema/empleados/registrar-empleado/registrar-empleado.component';
import { EditarEmpleadoComponent } from './modulos-sistema/empleados/editar-empleado/editar-empleado.component';


import { RegistrarDemandaComponent } from './modulos-sistema/demandas/registrar-demanda/registrar-demanda.component';
import { ListaDemandasComponent } from './modulos-sistema/demandas/lista-demandas/lista-demandas.component';
import { EditarDemandaComponent } from './modulos-sistema/demandas/editar-demanda/editar-demanda.component';
import { VerDemandaComponent } from './modulos-sistema/demandas/ver-demanda/ver-demanda.component';


import { ListaTipoDocumentoComponent } from './modulos-sistema/parametrizaciones/TiposDocumentos/lista-tipo-documento/lista-tipo-documento.component';
import { ListaPaisesComponent } from './modulos-sistema/parametrizaciones/paises/lista-paises/lista-paises.component';
import { ListaDepartamentosComponent } from './modulos-sistema/parametrizaciones/departamentos/lista-departamentos/lista-departamentos.component';
import { ListaCiudadesComponent } from './modulos-sistema/parametrizaciones/ciudades/lista-ciudades/lista-ciudades.component';
import { ListaEspecialidadesComponent } from './modulos-sistema/parametrizaciones/especialidades/lista-especialidades/lista-especialidades.component';
import { ListaEstadosDemandaComponent } from './modulos-sistema/parametrizaciones/estadosDemanda/lista-estados-demanda/lista-estados-demanda.component';
import { ListaEstadosProcesosComponent } from './modulos-sistema/parametrizaciones/estadosProcesos/lista-estados-procesos/lista-estados-procesos.component';
import { ListaInstitucionesLaboralesComponent } from './modulos-sistema/parametrizaciones/institucionLaboral/lista-instituciones-laborales/lista-instituciones-laborales.component';
import { ListaJuzgadosComponent } from './modulos-sistema/parametrizaciones/juzgados/lista-juzgados/lista-juzgados.component';
import { ListaParentescosComponent } from './modulos-sistema/parametrizaciones/parentesco/lista-parentescos/lista-parentescos.component';
import { ListaCargosComponent } from './modulos-sistema/parametrizaciones/cargos/lista-cargos/lista-cargos.component';
import { ListaTiposProcesosComponent } from './modulos-sistema/parametrizaciones/tipoProcesos/lista-tipos-procesos/lista-tipos-procesos.component';
import { ListaTiposDemandasComponent } from './modulos-sistema/parametrizaciones/tiposDemandas/lista-tipos-demandas/lista-tipos-demandas.component';


import { RegistrarClienteComponent } from './modulos-sistema/clientes/registrar-cliente/registrar-cliente.component';
import { EditarClienteComponent } from './modulos-sistema/clientes/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './modulos-sistema/clientes/listar-cliente/listar-cliente.component';


import { ConvertidorPdfComponent } from './modulos-sistema/pdf/convertidor-pdf/convertidor-pdf.component';


import { EditarClaveComponent } from './modulos-sistema/usuarios/editar-clave/editar-clave.component';





//Rutas para redirecciones por url
const rutas: Routes =[
    { path:'', redirectTo:'login', pathMatch:'full' },
    { path:'login', component:LoginComponent},
        { path:'recuperarClave', component:RecuperarClaveComponent},
        { path:'codigoVerificacion', component:CodigoVerificacionComponent},
        { path:'restablecerClave', component:RestablecerClaveComponent},

    {path:':usuario', component:InicioComponent, children:[
        { path:'empleados', component:ListaEmpleadosComponent},
        { path:'registrarEmpleado', component:RegistrarEmpleadoComponent},
        { path:'editarEmpleado/:id', component:EditarEmpleadoComponent},

        { path:'editarClave', component:EditarClaveComponent},

        { path:'convertidorPdf', component:ConvertidorPdfComponent},

        { path:'clientes', component:ListarClienteComponent},
        { path:'registrarCliente', component:RegistrarClienteComponent},
        { path:'editarCliente/:id', component:EditarClienteComponent},

        { path:'demandas', component:ListaDemandasComponent},
        { path:'registrarDemanda', component:RegistrarDemandaComponent},
        { path:'editarDemanda/:id', component:EditarDemandaComponent},
        { path:'verDemanda/:id', component:VerDemandaComponent},

        { path:'tiposDocumentos', component:ListaTipoDocumentoComponent},
        { path:'paises', component:ListaPaisesComponent},
        { path:'departamentos', component:ListaDepartamentosComponent},
        { path:'ciudades', component:ListaCiudadesComponent},
        { path:'especialidades', component:ListaEspecialidadesComponent},
        { path:'estadosDemanda', component:ListaEstadosDemandaComponent},
        { path:'estadosProcesos', component:ListaEstadosProcesosComponent},
        { path:'institucionesLaborales', component:ListaInstitucionesLaboralesComponent},
        { path:'juzgados', component:ListaJuzgadosComponent},
        { path:'cargos', component:ListaCargosComponent},
        { path:'parentesco', component:ListaParentescosComponent},
        { path:'tiposProcesos', component:ListaTiposProcesosComponent},
        { path:'tipoDemandas', component:ListaTiposDemandasComponent},
    ]},
];




@NgModule({
    imports:[
        RouterModule.forRoot(rutas, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports:[RouterModule]
})  




export class appRutasModules{

}