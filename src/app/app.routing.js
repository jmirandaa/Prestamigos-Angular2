"use strict";
var router_1 = require("@angular/router");
var index_1 = require("./login/index");
var index_2 = require("./registro/index");
var index_3 = require("./deudas/index");
var nueva_deuda_component_1 = require("./nueva-deuda/nueva-deuda.component");
var historial_component_1 = require("./historial/historial.component");
var amigos_component_1 = require("./amigos/amigos.component");
var detalles_amigo_component_1 = require("./detalles-amigo/detalles-amigo.component");
var resumen_component_1 = require("./resumen/resumen.component");
var perfil_component_1 = require("./perfil/perfil.component");
var auth_service_1 = require("./servicios/auth.service");
var appRoutes = [
    { path: '', component: index_1.LoginComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'registro', component: index_2.RegistroComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'deudas', component: index_3.DeudasComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'nuevaDeuda', component: nueva_deuda_component_1.NuevaDeudaComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'historial', component: historial_component_1.HistorialComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'amigos', component: amigos_component_1.AmigosComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'detallesAmigo', component: detalles_amigo_component_1.DetallesAmigoComponent },
    { path: 'resumen', component: resumen_component_1.ResumenComponent, canActivate: [auth_service_1.AuthService] },
    { path: 'perfil', component: perfil_component_1.PerfilComponent, canActivate: [auth_service_1.AuthService] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map