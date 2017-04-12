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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var validator_service_1 = require("../servicios/validator.service");
var deudas_service_1 = require("../servicios/deudas.service");
var usuario_service_1 = require("../servicios/usuario.service");
var ui_service_1 = require("../servicios/ui.service");
var Usuario_1 = require("../modelo/Usuario");
var NuevaDeudaComponent = (function () {
    function NuevaDeudaComponent(route, router, location, validator, deudasService, usuarioService, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.location = location;
        this.validator = validator;
        this.deudasService = deudasService;
        this.usuarioService = usuarioService;
        this.ui = ui;
        this.model = {};
        this.loading = false;
        this.parametros = this.route.params.subscribe(function (params) {
            _this.tipoDeuda = params['tipoDeuda'];
            _this.idUsuario = window.localStorage.getItem('idUsuario');
            _this.emailOrigen = window.localStorage.getItem('email');
        });
    }
    NuevaDeudaComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    NuevaDeudaComponent.prototype.ngOnDestroy = function () {
        this.parametros.unsubscribe();
    };
    NuevaDeudaComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    //Ir atrás
    NuevaDeudaComponent.prototype.atras = function () {
        this.location.back();
    };
    //Comprobar datos
    NuevaDeudaComponent.prototype.procederNuevaDeuda = function () {
        var resultado = true;
        if (!this.validator.textoValido(this.model.nombre)) {
            this.ui.mostrarSnack("Nombre inválido");
            resultado = false;
        }
        else if (!this.validator.textoValido(this.model.concepto)) {
            this.ui.mostrarSnack("El concepto debe ser mayor de 5");
            resultado = false;
        }
        else if (!(this.model.cantidad > 0)) {
            this.ui.mostrarSnack("La cantidad debe ser positiva");
            resultado = false;
        }
        if (resultado) {
            this.nuevaDeuda();
        }
    };
    //Llamar al servicio de nueva deuda
    NuevaDeudaComponent.prototype.nuevaDeuda = function () {
        var _this = this;
        //Obtener nombre y apellidos
        var nombre = this.model.nombre;
        var split = nombre.split(" ");
        var usuario = new Usuario_1.Usuario(0);
        //Sólo tiene nombre
        if (split.length < 2) {
            usuario.setNombre(nombre);
            usuario.setApellidos("");
        }
        else {
            usuario.setNombre(split[0]);
            var apellidos = "";
            for (var i = 1; i < split.length; i++) {
                if (i > 1) {
                    apellidos += " ";
                }
                apellidos += split[i];
            }
            usuario.setApellidos(apellidos);
        }
        //Servicio nuevo invitado
        this.usuarioService.nuevoInvitado(usuario, this.emailOrigen).subscribe(function (data) {
            console.log(data);
            if (data.codError == 0) {
                var idDestino = data.contenido;
                var origen, destino;
                //console.log("idOrigen: "+this.idUsuario+", idDestino: "+idDestino+", cantidad: "+this.model.cantidad+", concepto: "+this.model.concepto+", tipo: "+this.tipoDeuda);
                //En función del tipo, cambiar el orden de origen y destino
                if (_this.tipoDeuda == 1) {
                    origen = idDestino;
                    destino = _this.idUsuario;
                }
                else if (_this.tipoDeuda == 2) {
                    origen = _this.idUsuario;
                    destino = idDestino;
                }
                //Crear la deuda
                _this.deudasService.nuevaDeuda(origen, destino, _this.model.cantidad, _this.model.concepto, _this.tipoDeuda).subscribe(function (data) {
                    console.log(data);
                    if (data.codError == 0) {
                        //Volver atrás
                        _this.location.back();
                    }
                    else {
                        _this.ui.mostrarSnack("Error al crear deuda");
                    }
                }, function (err) {
                    _this.ui.mostrarSnack("Error de conexión");
                }, function () { return console.log("OK"); });
            }
            else {
                _this.ui.mostrarSnack("Error al añadir amigo");
            }
        }, function (err) {
            _this.ui.mostrarSnack("Error de conexión");
        }, function () { return console.log("OK"); });
        console.log(usuario.getNombre() + " " + usuario.getApellidos());
    };
    return NuevaDeudaComponent;
}());
NuevaDeudaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'nueva-deuda.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, common_1.Location,
        validator_service_1.ValidatorService, deudas_service_1.DeudasService, usuario_service_1.UsuarioService,
        ui_service_1.UIService])
], NuevaDeudaComponent);
exports.NuevaDeudaComponent = NuevaDeudaComponent;
//# sourceMappingURL=nueva-deuda.component.js.map