"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var validator_service_1 = require("../app/servicios/validator.service");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_1 = require("./login/index");
var index_2 = require("./registro/index");
var index_3 = require("./deudas/index");
var index_4 = require("./nueva-deuda/index");
var index_5 = require("./historial/index");
var index_6 = require("./amigos/index");
var index_7 = require("./detalles-amigo/index");
var index_8 = require("./resumen/index");
var index_9 = require("./perfil/index");
var usuario_service_1 = require("../app/servicios/usuario.service");
var deudas_service_1 = require("../app/servicios/deudas.service");
var ui_service_1 = require("../app/servicios/ui.service");
var auth_service_1 = require("../app/servicios/auth.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.LoginComponent,
            index_2.RegistroComponent,
            index_3.DeudasComponent,
            index_4.NuevaDeudaComponent,
            index_5.HistorialComponent,
            index_6.AmigosComponent,
            index_7.DetallesAmigoComponent,
            index_8.ResumenComponent,
            index_9.PerfilComponent
        ],
        providers: [
            validator_service_1.ValidatorService, usuario_service_1.UsuarioService, deudas_service_1.DeudasService, ui_service_1.UIService, auth_service_1.AuthService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map