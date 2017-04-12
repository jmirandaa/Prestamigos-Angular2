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
var ui_service_1 = require("../servicios/ui.service");
var usuario_service_1 = require("../servicios/usuario.service");
var Usuario_1 = require("../modelo/Usuario");
var PerfilComponent = (function () {
    function PerfilComponent(route, router, validator, ui, usuarioService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.ui = ui;
        this.usuarioService = usuarioService;
        this.model = {};
        this.loading = false;
        this.email = window.localStorage.getItem('email');
        this.usuario = new Usuario_1.Usuario(0);
        this.usuarioService.datosUsuario(this.email).subscribe(function (data) {
            console.log(data);
            if (data.codError == 0) {
                _this.usuario.setId(data.contenido.id);
                _this.usuario.setNombre(data.contenido.nombre);
                _this.usuario.setApellidos(data.contenido.apellidos);
                _this.usuario.setEmail(data.contenido.email);
                _this.model.nombre = _this.usuario.getNombre();
                _this.model.apellidos = _this.usuario.getApellidos();
                _this.model.email = _this.usuario.getEmail();
            }
            else {
                _this.ui.mostrarSnack("Error al obtener datos de usuario");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    }
    PerfilComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    PerfilComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    //Comprobar datos
    PerfilComponent.prototype.procederEditar = function () {
        var resultado = true;
        if (!this.validator.textoValidoCorto(this.model.nombre)) {
            this.ui.mostrarSnack("Nombre demasiado corto (min 3)");
            resultado = false;
        }
        else if (!this.validator.textoValidoCorto(this.model.apellidos)) {
            this.ui.mostrarSnack("Apellidos demasiado cortos (min 3)");
            resultado = false;
        }
        else if (!this.validator.emailValido(this.model.email)) {
            this.ui.mostrarSnack("Correo electrónico inválido");
            resultado = false;
        }
        else if (!this.validator.textoValido(this.model.password)) {
            this.ui.mostrarSnack("Contraseña demasiado corta (min 5)");
            resultado = false;
        }
        else if (this.model.password != this.model.passwordRep) {
            this.ui.mostrarSnack("La contraseña no coincide");
            resultado = false;
        }
        if (resultado) {
            this.editarPerfil();
        }
    };
    //Servicio de nuevo usuario
    PerfilComponent.prototype.editarPerfil = function () {
        var _this = this;
        this.usuario.setNombre(this.model.nombre);
        this.usuario.setApellidos(this.model.apellidos);
        this.usuario.setPassword(this.model.password);
        this.usuarioService.editarUsuario(this.usuario).subscribe(function (data) {
            console.log(data);
            if (data.codError == 0) {
                window.localStorage.setItem('nombre', _this.model.nombre);
                window.localStorage.setItem('apellidos', _this.model.apellidos);
                _this.ui.mostrarSnack("¡Perfil actualizado!");
            }
            else {
                _this.ui.mostrarSnack("Error al actualizar usuario");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    };
    return PerfilComponent;
}());
PerfilComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'perfil.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService,
        ui_service_1.UIService, usuario_service_1.UsuarioService])
], PerfilComponent);
exports.PerfilComponent = PerfilComponent;
//# sourceMappingURL=perfil.component.js.map