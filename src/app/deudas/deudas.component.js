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
var Operacion_1 = require("../modelo/Operacion");
var Usuario_1 = require("../modelo/Usuario");
var Deuda_1 = require("../modelo/Deuda");
var DeudasComponent = (function () {
    function DeudasComponent(route, router, validator, deudasService, ui) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.validator = validator;
        this.deudasService = deudasService;
        this.ui = ui;
        this.model = {};
        this.loading = false;
        this.parametros = this.route.params.subscribe(function (params) {
            _this.tipoDeuda = params['tipoDeuda'];
            _this.idUsuario = window.localStorage.getItem('idUsuario');
            console.log("tipo: " + _this.tipoDeuda);
            //Obtener deudas
            _this.deudasService.deudas(_this.idUsuario, _this.tipoDeuda, false).subscribe(function (data) {
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
        });
    }
    DeudasComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    DeudasComponent.prototype.ngOnDestroy = function () {
        this.parametros.unsubscribe();
    };
    DeudasComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    DeudasComponent.prototype.atras = function () {
        this.router.navigate(["/"]);
    };
    //Procesar deudas
    DeudasComponent.prototype.procesarDeudas = function (deudas) {
        if (deudas != null) {
            //Añadir nombre y apellidos
            for (var _i = 0, deudas_1 = deudas; _i < deudas_1.length; _i++) {
                var deuda = deudas_1[_i];
                var idUsuarioOrigen = deuda.usuario.id;
                var idUsuarioDestino = deuda.usuarioDestino.id;
                if (this.idUsuario == idUsuarioOrigen) {
                    deuda.nombreDeudor = deuda.usuarioDestino.nombre + " " + deuda.usuarioDestino.apellidos;
                }
                else if (this.idUsuario == idUsuarioDestino) {
                    deuda.nombreDeudor = deuda.usuario.nombre + " " + deuda.usuario.apellidos;
                }
            }
            //Actualizar listado
            this.deudas = deudas;
        }
    };
    //Servicio de nueva operación
    DeudasComponent.prototype.nuevaOperacion = function (tipoOp) {
        var _this = this;
        console.log("idUsuario: " + this.idUsuario + ", idDeuda: " + this.idDeuda + ", tipoDeuda: " + this.tipoDeuda + ", cantidad: " + this.cantidad + ", tipoOp: " + tipoOp);
        //Recuperar datos
        var operacion = new Operacion_1.Operacion();
        var usuario = new Usuario_1.Usuario(this.idUsuario);
        var deuda = new Deuda_1.Deuda(this.idDeuda);
        operacion.setCantidad(this.cantidad);
        operacion.setTipo(tipoOp);
        operacion.setUsuario(usuario);
        operacion.setDeuda(deuda);
        this.deudasService.nuevaOperacion(operacion, this.tipoDeuda).subscribe(function (data) {
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
    };
    //Navegar a nueva deuda
    DeudasComponent.prototype.nuevaDeuda = function () {
        this.router.navigate(['/nuevaDeuda', { tipoDeuda: this.tipoDeuda }]);
    };
    //Métodos de diálogo
    DeudasComponent.prototype.dialogoSaldar = function (idDeuda) {
        var dialogSaldar = document.querySelector('#dialog-d-saldar');
        this.idDeuda = idDeuda;
        dialogSaldar.showModal();
    };
    DeudasComponent.prototype.dialogoAumentar = function (idDeuda) {
        var dialogAumentar = document.querySelector('#dialog-d-aumentar');
        this.idDeuda = idDeuda;
        dialogAumentar.showModal();
    };
    DeudasComponent.prototype.dialogoAceptarSaldar = function () {
        var dialogSaldar = document.querySelector('#dialog-d-saldar');
        console.log("aceptar saldar: " + this.cantidad);
        if (this.cantidad > 0) {
            this.nuevaOperacion(0);
            dialogSaldar.close();
        }
        else {
            this.ui.mostrarSnack("La cantidad a saldar debe ser mayor que 0");
        }
    };
    DeudasComponent.prototype.dialogoAceptarIncrementar = function () {
        var dialogAumentar = document.querySelector('#dialog-d-aumentar');
        console.log("aceptar incrementar: " + this.cantidad);
        if (this.cantidad > 0) {
            this.nuevaOperacion(1);
            dialogAumentar.close();
        }
        else {
            this.ui.mostrarSnack("La cantidad a incrementar debe ser mayor que 0");
        }
    };
    DeudasComponent.prototype.cancelarIncrementar = function () {
        var dialogAumentar = document.querySelector('#dialog-d-aumentar');
        dialogAumentar.close();
    };
    DeudasComponent.prototype.cancelarSaldar = function () {
        var dialogSaldar = document.querySelector('#dialog-d-saldar');
        dialogSaldar.close();
    };
    return DeudasComponent;
}());
DeudasComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'deudas.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService, deudas_service_1.DeudasService,
        ui_service_1.UIService])
], DeudasComponent);
exports.DeudasComponent = DeudasComponent;
//# sourceMappingURL=deudas.component.js.map