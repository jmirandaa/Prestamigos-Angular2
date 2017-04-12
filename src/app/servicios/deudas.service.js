"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require("@angular/http");
var KConexion_1 = require("../servicios/KConexion");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var DeudasService = (function (_super) {
    __extends(DeudasService, _super);
    function DeudasService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    Object.defineProperty(DeudasService, "parameters", {
        get: function () {
            return [[http_1.Http]];
        },
        enumerable: true,
        configurable: true
    });
    //Comprobar usuario y contraseña
    DeudasService.prototype.deudas = function (id, tipo, saldada) {
        var url = this.URL_BASE + '/deudas/todasId?idUsuario=' + id + '&tipo=' + tipo + '&saldada=' + saldada;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    //Resumen
    DeudasService.prototype.resumen = function (id) {
        var url = this.URL_BASE + '/deudas/resumen?idUsuario=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    //Nueva operacion de deuda
    DeudasService.prototype.nuevaOperacion = function (operacion, tipo) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.URL_BASE + '/operaciones/operacion?tipoDeuda=' + tipo;
        var response = this.http.post(url, JSON.stringify(operacion), options).map(function (res) { return res.json(); });
        return response;
    };
    //Nueva deuda
    DeudasService.prototype.nuevaDeuda = function (idOrigen, idDestino, cantidad, concepto, tipo) {
        var url = this.URL_BASE + '/deudas/deuda?idUsuarioOrigen=' + idOrigen + '&idDestino=' + idDestino + '&cantidad=' + cantidad + '&concepto=' + encodeURI(concepto) + '&tipo=' + tipo;
        var response = this.http.post(url, null).map(function (res) { return res.json(); });
        return response;
    };
    return DeudasService;
}(KConexion_1.KConexion));
DeudasService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DeudasService);
exports.DeudasService = DeudasService;
//# sourceMappingURL=deudas.service.js.map