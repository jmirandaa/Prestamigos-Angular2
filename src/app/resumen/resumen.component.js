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
var ResumenComponent = (function () {
    function ResumenComponent(route, router, validator, deudasService, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.deudasService = deudasService;
        this.ui = ui;
        this.model = {};
        //Inicializar objeto
        this.resumen = new Object();
        this.idUsuario = window.localStorage.getItem('idUsuario');
        //Obtener deudas
        this.deudasService.resumen(this.idUsuario).subscribe(function (data) {
            //this.movies = data.results; 
            console.log(data);
            if (data.codError == 0) {
                _this.procesarResumen(data.contenido);
            }
            else {
                _this.ui.mostrarSnack("Error al obtener resumen");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    }
    ResumenComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    ResumenComponent.prototype.ngOnDestroy = function () {
    };
    ResumenComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    //Procesar deudas
    ResumenComponent.prototype.procesarResumen = function (resumen) {
        if (resumen != null) {
            //Actualizar listado
            this.resumen = resumen;
        }
    };
    return ResumenComponent;
}());
ResumenComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'resumen.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService, deudas_service_1.DeudasService,
        ui_service_1.UIService])
], ResumenComponent);
exports.ResumenComponent = ResumenComponent;
//# sourceMappingURL=resumen.component.js.map