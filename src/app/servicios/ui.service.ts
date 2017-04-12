import { Injectable } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Injectable()
export class UIService {


    constructor(private router : Router) {

     }

     //Snackbar
    mostrarSnack(mensaje: string) {
                (function() {
                      'use strict';
                      var snackbarContainer : any = document.querySelector('#snackbar-container');
                      var handler = function(event : any) {
                          };      
                      var data = {
                                message: mensaje,
                                timeout: 5000
                              };
                      snackbarContainer.MaterialSnackbar.showSnackbar(data);      
                    }());
    }

    //Pantalla deudas que debo
    pantallaDebo(){
      this.router.navigate(["/deudas", {tipoDeuda: 2}]); 
    }

    //Pantalla deudas que me deben
    pantallaDeben() {
      this.router.navigate(["/deudas", {tipoDeuda: 1}]); 
    }

    //Pantalla resumen
    pantallaResumen() {
      this.router.navigate(["/resumen"]); 
    }

    //Pantalla historial
    pantallaHistorial() {
      this.router.navigate(["/historial"]); 
    }

    //Pantalla amigos
    pantallaAmigos() {
      this.router.navigate(["/amigos"]); 
    }

    //Pantalla perfil
    pantallaPerfil() {
      this.router.navigate(["/perfil"]); 
    }

    //Serrar sesion
    cerrarSesion(){
        window.localStorage.removeItem('idUsuario');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('nombre');
        window.localStorage.removeItem('apellidos');

        this.router.navigate(["/"]);       
    }

}