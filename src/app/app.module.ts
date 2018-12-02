import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './servicios/http-interceptor.service';

import { appRutasModules } from './app.routing.module';

import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './modulos-sistema/login/login/login.component';
import { RecuperarClaveComponent } from './modulos-sistema/login/recuperar-clave/recuperar-clave.component';
import { CodigoVerificacionComponent } from './modulos-sistema/login/codigo-verificacion/codigo-verificacion.component';

import { ListaEmpleadosComponent } from './modulos-sistema/empleados/lista-empleados/lista-empleados.component';
import { RegistrarEmpleadoComponent } from './modulos-sistema/empleados/registrar-empleado/registrar-empleado.component';

import { RestablecerClaveComponent } from './modulos-sistema/login/restablecer-clave/restablecer-clave.component';

import { ListaDemandasComponent } from './modulos-sistema/demandas/lista-demandas/lista-demandas.component';
import { RegistrarDemandaComponent } from './modulos-sistema/demandas/registrar-demanda/registrar-demanda.component';
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

import {ArrayTextFilter } from './servicios/arrayTextFilter.service';
import {FileUploadModule} from 'ng2-file-upload';

import { RegistrarClienteComponent } from './modulos-sistema/clientes/registrar-cliente/registrar-cliente.component';
import { EditarClienteComponent } from './modulos-sistema/clientes/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './modulos-sistema/clientes/listar-cliente/listar-cliente.component';

import { ConvertidorPdfComponent } from './modulos-sistema/pdf/convertidor-pdf/convertidor-pdf.component';

import { EditarEmpleadoComponent } from './modulos-sistema/empleados/editar-empleado/editar-empleado.component';
import { EditarClaveComponent } from './modulos-sistema/usuarios/editar-clave/editar-clave.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaEmpleadosComponent,
    RegistrarEmpleadoComponent,
    RecuperarClaveComponent,
    CodigoVerificacionComponent,
    RestablecerClaveComponent,
    MenuComponent,
    InicioComponent,
    RegistrarDemandaComponent,
    ListaDemandasComponent,
    EditarDemandaComponent,
    VerDemandaComponent,
    ListaTipoDocumentoComponent,
    ListaPaisesComponent,
    ListaDepartamentosComponent,
    ListaCiudadesComponent,
    ListaEspecialidadesComponent,
    ArrayTextFilter,
    RegistrarClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    ConvertidorPdfComponent,
    EditarEmpleadoComponent,
    EditarClaveComponent,
    ListaEstadosDemandaComponent,
    ListaEstadosProcesosComponent,
    ListaInstitucionesLaboralesComponent,
    ListaJuzgadosComponent,
    ListaParentescosComponent,
    ListaCargosComponent,
    ListaTiposProcesosComponent,
    ListaTiposDemandasComponent,

  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, appRutasModules,FileUploadModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
