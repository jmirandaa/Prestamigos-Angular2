import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegistroComponent } from './registro/index';
import { DeudasComponent } from './deudas/index';
import { NuevaDeudaComponent } from './nueva-deuda/nueva-deuda.component';
import { HistorialComponent } from './historial/historial.component';
import { AmigosComponent } from './amigos/amigos.component';
import { DetallesAmigoComponent } from './detalles-amigo/detalles-amigo.component';
import { ResumenComponent } from './resumen/resumen.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthService} from './servicios/auth.service';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthService]},
    { path: 'login', component: LoginComponent },
	{ path: 'registro', component: RegistroComponent, canActivate: [AuthService] },
	{ path: 'deudas', component: DeudasComponent, canActivate: [AuthService] },
	{ path: 'nuevaDeuda', component : NuevaDeudaComponent, canActivate: [AuthService]},
	{ path: 'historial', component : HistorialComponent, canActivate: [AuthService]},
	{ path: 'amigos', component : AmigosComponent, canActivate: [AuthService]},
	{ path: 'detallesAmigo', component : DetallesAmigoComponent},
	{ path: 'resumen', component : ResumenComponent, canActivate: [AuthService]},
	{ path: 'perfil', component : PerfilComponent, canActivate: [AuthService]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);