"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var UIService = (function () {
    function UIService(router) {
        this.router = router;
    }
    //Snackbar
    UIService.prototype.mostrarSnack = function (mensaje) {
        (function () {
            'use strict';
            var snackbarContainer = document.querySelector('#snackbar-container');
            var handler = function (event) {
            };
            var data = {
                message: mensaje,
                timeout: 5000
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }());
    };
    //Pantalla deudas que debo
    UIService.prototype.pantallaDebo = function () {
        this.router.navigate(["/deudas", { tipoDeuda: 2 }]);
    };
    //Pantalla deudas que me deben
    UIService.prototype.pantallaDeben = function () {
        this.router.navigate(["/deudas", { tipoDeuda: 1 }]);
    };
    //Pantalla resumen
    UIService.prototype.pantallaResumen = function () {
        this.router.navigate(["/resumen"]);
    };
    //Pantalla historial
    UIService.prototype.pantallaHistorial = function () {
        this.router.navigate(["/historial"]);
    };
    //Pantalla amigos
    UIService.prototype.pantallaAmigos = function () {
        this.router.navigate(["/amigos"]);
    };
    //Pantalla perfil
    UIService.prototype.pantallaPerfil = function () {
        this.router.navigate(["/perfil"]);
    };
    //Serrar sesion
    UIService.prototype.cerrarSesion = function () {
        window.localStorage.removeItem('idUsuario');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('nombre');
        window.localStorage.removeItem('apellidos');
        this.router.navigate(["/"]);
    };
    return UIService;
}());
UIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], UIService);
exports.UIService = UIService;
//# sourceMappingURL=ui.service.js.map