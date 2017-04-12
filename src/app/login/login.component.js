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
var LoginComponent = (function () {
    function LoginComponent(route, router, validator, usuarioService, uiService) {
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.usuarioService = usuarioService;
        this.uiService = uiService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    //Ir a la pantalla de registro
    LoginComponent.prototype.registro = function () {
        this.router.navigate(['/registro']);
    };
    //Comprobar datos
    LoginComponent.prototype.procederLogin = function () {
        var resultado = true;
        if (!this.validator.emailValido(this.model.email)) {
            this.uiService.mostrarSnack("Email inválido");
            resultado = false;
        }
        else if (!this.validator.textoValido(this.model.password)) {
            this.uiService.mostrarSnack("La contraseña debe ser mayor de 5");
            resultado = false;
        }
        if (resultado) {
            this.login();
        }
    };
    //Hacer llamada
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.usuarioService.login(this.model.email, this.model.password).subscribe(function (data) {
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
                _this.uiService.mostrarSnack("Nombre de usuario o contraseña incorrecta");
            }
        }, function (err) {
            _this.uiService.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService,
        usuario_service_1.UsuarioService, ui_service_1.UIService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map