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
var deudas_service_1 = require("../servicios/deudas.service");
var ui_service_1 = require("../servicios/ui.service");
var HistorialComponent = (function () {
    function HistorialComponent(route, router, validator, deudasService, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.deudasService = deudasService;
        this.ui = ui;
        this.model = {};
        this.loading = false;
        this.idUsuario = window.localStorage.getItem('idUsuario');
        //Obtener deudas
        this.deudasService.deudas(this.idUsuario, 0, true).subscribe(function (data) {
            //this.movies = data.results; 
            console.log(data);
            if (data.codError == 0) {
                _this.procesarDeudas(data.contenido);
            }
            else {
                _this.ui.mostrarSnack("Error al obtener deudas");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    }
    HistorialComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    HistorialComponent.prototype.ngOnDestroy = function () {
    };
    HistorialComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    HistorialComponent.prototype.atras = function () {
        this.router.navigate(["/"]);
    };
    //Procesar deudas
    HistorialComponent.prototype.procesarDeudas = function (deudas) {
        if (deudas != null) {
            //Añadir nombre y apellidos
            for (var _i = 0, deudas_1 = deudas; _i < deudas_1.length; _i++) {
                var deuda = deudas_1[_i];
                var idUsuarioOrigen = deuda.usuario.id;
                var idUsuarioDestino = deuda.usuarioDestino.id;
                if (this.idUsuario == idUsuarioOrigen) {
                    deuda.nombreDeudor = deuda.usuarioDestino.nombre + " " + deuda.usuarioDestino.apellidos;
                    deuda.tipo = "(Le debía)";
                }
                else if (this.idUsuario == idUsuarioDestino) {
                    deuda.nombreDeudor = deuda.usuario.nombre + " " + deuda.usuario.apellidos;
                    deuda.tipo = "(Me debía)";
                }
            }
            //Actualizar listado
            this.deudas = deudas;
        }
    };
    return HistorialComponent;
}());
HistorialComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'historial.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService, deudas_service_1.DeudasService,
        ui_service_1.UIService])
], HistorialComponent);
exports.HistorialComponent = HistorialComponent;
//# sourceMappingURL=historial.component.js.map