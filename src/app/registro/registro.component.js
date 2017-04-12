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
var RegistroComponent = (function () {
    function RegistroComponent(route, router, validator, ui, usuarioService) {
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.ui = ui;
        this.usuarioService = usuarioService;
        this.model = {};
        this.loading = false;
    }
    RegistroComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    RegistroComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    RegistroComponent.prototype.atras = function () {
        this.router.navigate(["/"]);
    };
    //Comprobar datos
    RegistroComponent.prototype.procederRegistro = function () {
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
        else if (this.model.email != this.model.emailRep) {
            this.ui.mostrarSnack("El correo electrónico no coincide");
            resultado = false;
        }
        else if (this.model.password != this.model.passwordRep) {
            this.ui.mostrarSnack("La contraseña no coincide");
            resultado = false;
        }
        if (resultado) {
            this.registrarUsuario();
        }
    };
    //Servicio de nuevo usuario
    RegistroComponent.prototype.registrarUsuario = function () {
        var _this = this;
        var usuario = new Usuario_1.Usuario(0);
        usuario.setNombre(this.model.nombre);
        usuario.setApellidos(this.model.apellidos);
        usuario.setEmail(this.model.email);
        usuario.setPassword(this.model.password);
        this.usuarioService.nuevoUsuario(usuario).subscribe(function (data) {
            console.log(data);
            if (data.codError == 0) {
                //Login
                _this.usuarioService.login(_this.model.email, _this.model.password).subscribe(function (data) {
                    console.log(data);
                    if (data.codError == 0) {
                        //Guardar datos
                        window.localStorage.setItem('idUsuario', data.contenido.id);
                        window.localStorage.setItem('email', data.contenido.email);
                        window.localStorage.setItem('nombre', data.contenido.nombre);
                        window.localStorage.setItem('apellidos', data.contenido.apellidos);
                        //Ir a pantalla de deudas
                        _this.router.navigate(['/deudas', { tipoDeuda: 1 }]);
                    }
                    else {
                        //Mensaje error
                        _this.ui.mostrarSnack("Nombre de usuario o contraseña incorrecta");
                    }
                }, function (err) {
                    _this.ui.mostrarSnack("Error de conexión");
                }, function () { return console.log("OK"); });
            }
            else {
                _this.ui.mostrarSnack("Error al crear usuario");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    };
    return RegistroComponent;
}());
RegistroComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'registro.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService,
        ui_service_1.UIService, usuario_service_1.UsuarioService])
], RegistroComponent);
exports.RegistroComponent = RegistroComponent;
//# sourceMappingURL=registro.component.js.map