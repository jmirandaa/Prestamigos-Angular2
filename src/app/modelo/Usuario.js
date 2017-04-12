"use strict";
var Usuario = (function () {
    function Usuario(id) {
        this.id = id;
    }
    //Getters
    Usuario.prototype.getId = function () {
        return this.id;
    };
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.getApellidos = function () {
        return this.apellidos;
    };
    Usuario.prototype.getEmail = function () {
        return this.email;
    };
    //Setters
    Usuario.prototype.setId = function (id) {
        this.id = id;
    };
    Usuario.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Usuario.prototype.setApellidos = function (apellidos) {
        this.apellidos = apellidos;
    };
    Usuario.prototype.setEmail = function (email) {
        this.email = email;
    };
    Usuario.prototype.setPassword = function (password) {
        this.password = password;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map