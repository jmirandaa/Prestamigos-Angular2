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
var UsuarioService = (function (_super) {
    __extends(UsuarioService, _super);
    function UsuarioService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    Object.defineProperty(UsuarioService, "parameters", {
        get: function () {
            return [[http_1.Http]];
        },
        enumerable: true,
        configurable: true
    });
    //Comprobar usuario y contraseña
    UsuarioService.prototype.login = function (email, password) {
        var url = this.URL_BASE + '/usuarios/login?email=' + encodeURI(email) + '&password=' + encodeURI(password);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    //Datos usuario
    UsuarioService.prototype.datosUsuario = function (email) {
        var url = this.URL_BASE + '/usuarios/usuario?email=' + encodeURI(email);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    //Editar datos de usuario
    UsuarioService.prototype.editarUsuario = function (usuario) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.URL_BASE + '/usuarios/usuario';
        var response = this.http.put(url, JSON.stringify(usuario), options).map(function (res) { return res.json(); });
        return response;
    };
    //Listado de amigos
    UsuarioService.prototype.amigos = function (email) {
        var url = this.URL_BASE + '/usuarios/amigos?email=' + encodeURI(email);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    //Nuevo amigo
    UsuarioService.prototype.nuevoInvitado = function (usuario, emailOrigen) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.URL_BASE + '/usuarios/invitado?emailOrigen=' + emailOrigen;
        var response = this.http.post(url, JSON.stringify(usuario), options).map(function (res) { return res.json(); });
        return response;
    };
    //Nuevo usuario
    UsuarioService.prototype.nuevoUsuario = function (usuario) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.URL_BASE + '/usuarios/usuario';
        var response = this.http.post(url, JSON.stringify(usuario), options).map(function (res) { return res.json(); });
        return response;
    };
    return UsuarioService;
}(KConexion_1.KConexion));
UsuarioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map