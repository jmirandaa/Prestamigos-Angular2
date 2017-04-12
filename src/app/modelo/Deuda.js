"use strict";
var Deuda = (function () {
    function Deuda(id) {
        this.id = id;
    }
    //Getters
    Deuda.prototype.getId = function () {
        return this.id;
    };
    //Setters
    Deuda.prototype.setId = function (id) {
        this.id = id;
    };
    return Deuda;
}());
exports.Deuda = Deuda;
//# sourceMappingURL=Deuda.js.map