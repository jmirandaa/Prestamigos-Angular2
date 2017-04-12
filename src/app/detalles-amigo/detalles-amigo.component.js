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
var common_1 = require("@angular/common");
var validator_service_1 = require("../servicios/validator.service");
var usuario_service_1 = require("../servicios/usuario.service");
var ui_service_1 = require("../servicios/ui.service");
var DetallesAmigoComponent = (function () {
    function DetallesAmigoComponent(route, router, location, validator, usuariosService, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.location = location;
        this.validator = validator;
        this.usuariosService = usuariosService;
        this.ui = ui;
        this.model = {};
        this.loading = false;
        this.email = window.localStorage.getItem('email');
        this.parametros = this.route.params.subscribe(function (params) {
            var id = params['id'];
            var nombre = decodeURI(params['nombre']);
            var apellidos = decodeURI(params['apellidos']);
            var email = decodeURI(params['email']);
            _this.amigo = new Object();
            _this.amigo.id = id;
            _this.amigo.nombre = nombre;
            _this.amigo.apellidos = apellidos;
            _this.amigo.email = email;
        });
    }
    DetallesAmigoComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    DetallesAmigoComponent.prototype.ngOnDestroy = function () {
        this.parametros.unsubscribe();
    };
    DetallesAmigoComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    DetallesAmigoComponent.prototype.atras = function () {
        this.location.back();
    };
    return DetallesAmigoComponent;
}());
DetallesAmigoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'detalles-amigo.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, common_1.Location,
        validator_service_1.ValidatorService, usuario_service_1.UsuarioService,
        ui_service_1.UIService])
], DetallesAmigoComponent);
exports.DetallesAmigoComponent = DetallesAmigoComponent;
//# sourceMappingURL=detalles-amigo.component.js.map