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
var validator_service_1 = require("../servicios/validator.service");
var usuario_service_1 = require("../servicios/usuario.service");
var ui_service_1 = require("../servicios/ui.service");
var AmigosComponent = (function () {
    function AmigosComponent(route, router, validator, usuariosService, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.usuariosService = usuariosService;
        this.ui = ui;
        this.model = {};
        this.loading = false;
        this.email = window.localStorage.getItem('email');
        //Obtener deudas
        this.usuariosService.amigos(this.email).subscribe(function (data) {
            //this.movies = data.results; 
            console.log(data);
            if (data.codError == 0) {
                _this.procesarAmigos(data.contenido);
            }
            else {
                _this.ui.mostrarSnack("Error al obtener amigos");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    }
    AmigosComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    AmigosComponent.prototype.ngOnDestroy = function () {
    };
    AmigosComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    AmigosComponent.prototype.atras = function () {
        this.router.navigate(["/"]);
    };
    //Procesar deudas
    AmigosComponent.prototype.procesarAmigos = function (amigos) {
        if (amigos != null) {
            //Actualizar listado
            this.amigos = amigos;
        }
    };
    //Ir a la página de detalles de amigo
    AmigosComponent.prototype.detallesAmigo = function (id, nombre, apellidos, email) {
        console.log("id: " + id + ", nombre: " + nombre + ", apellidos: " + apellidos + ", email: " + email);
        this.router.navigate(["/detallesAmigo", { id: id, nombre: encodeURI(nombre), apellidos: encodeURI(apellidos), email: encodeURI(email) }]);
    };
    return AmigosComponent;
}());
AmigosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'amigos.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService, usuario_service_1.UsuarioService,
        ui_service_1.UIService])
], AmigosComponent);
exports.AmigosComponent = AmigosComponent;
//# sourceMappingURL=amigos.component.js.map