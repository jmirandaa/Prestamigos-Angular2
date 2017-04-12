"use strict";
var Operacion = (function () {
    function Operacion() {
    }
    //Setters
    Operacion.prototype.setId = function (id) {
        this.id = id;
    };
    Operacion.prototype.setFechaRegistro = function (fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    };
    Operacion.prototype.setCantidad = function (cantidad) {
        this.cantidad = cantidad;
    };
    Operacion.prototype.setDeuda = function (deuda) {
        this.deuda = deuda;
    };
    Operacion.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Operacion.prototype.setUsuario = function (usuario) {
        this.usuario = usuario;
    };
    //Getters
    Operacion.prototype.getId = function () {
        return this.id;
    };
    Operacion.prototype.getFechaRegistro = function () {
        return this.fechaRegistro;
    };
    Operacion.prototype.getCantidad = function () {
        return this.cantidad;
    };
    Operacion.prototype.getDeuda = function () {
        return this.deuda;
    };
    Operacion.prototype.getTipo = function () {
        return this.tipo;
    };
    Operacion.prototype.getUsuario = function () {
        return this.usuario;
    };
    return Operacion;
}());
exports.Operacion = Operacion;
//# sourceMappingURL=Operacion.js.map