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
var ValidatorService = (function () {
    function ValidatorService() {
    }
    //Validar email
    ValidatorService.prototype.emailValido = function (email) {
        var resultado = false;
        var regexpEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if ((email != undefined) && (email.length > 0) && (regexpEmail.test(email))) {
            resultado = true;
        }
        return resultado;
    };
    //Validar texto
    ValidatorService.prototype.textoValido = function (texto) {
        var resultado = false;
        if ((texto != undefined) && (texto.length > 5)) {
            return true;
        }
        return resultado;
    };
    ValidatorService.prototype.textoValidoCorto = function (texto) {
        var resultado = false;
        if ((texto != undefined) && (texto.length > 2)) {
            return true;
        }
        return resultado;
    };
    return ValidatorService;
}());
ValidatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ValidatorService);
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map