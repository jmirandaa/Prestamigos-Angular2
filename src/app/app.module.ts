import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ValidatorService } from '../app/servicios/validator.service';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { LoginComponent } from './login/index';
import { RegistroComponent } from './registro/index';
import { DeudasComponent } from './deudas/index';
import { NuevaDeudaComponent } from './nueva-deuda/index';
import { HistorialComponent } from './historial/index';
import { AmigosComponent } from './amigos/index';
import { DetallesAmigoComponent } from './detalles-amigo/index';
import { ResumenComponent } from './resumen/index';
import { PerfilComponent } from './perfil/index';
import { UsuarioService } from '../app/servicios/usuario.service';
import { DeudasService } from '../app/servicios/deudas.service';
import { UIService } from '../app/servicios/ui.service';
import { AuthService } from '../app/servicios/auth.service';

@NgModule({
  imports:      [ 
  	BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [ 
  	AppComponent,
  	LoginComponent,
    RegistroComponent,
    DeudasComponent,
    NuevaDeudaComponent,
    HistorialComponent,
    AmigosComponent,
    DetallesAmigoComponent,
    ResumenComponent,
    PerfilComponent
  	],
  providers: [
  	ValidatorService, UsuarioService, DeudasService, UIService, AuthService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
