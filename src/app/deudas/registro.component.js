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
var RegistroComponent = (function () {
    function RegistroComponent(route, router, validator) {
        this.route = route;
        this.router = router;
        this.validator = validator;
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
    return RegistroComponent;
}());
RegistroComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'registro.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, validator_service_1.ValidatorService])
], RegistroComponent);
exports.RegistroComponent = RegistroComponent;
//# sourceMappingURL=registro.component.js.map