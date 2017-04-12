declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ValidatorService} from '../servicios/validator.service';
import {UsuarioService} from '../servicios/usuario.service';
import {UIService} from '../servicios/ui.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    parametros : any;
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute, private router: Router, private validator : ValidatorService,
      private usuarioService : UsuarioService, private uiService : UIService) {

     }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngAfterViewInit() {
        componentHandler.upgradeDom();
    }    

    //Ir a la pantalla de registro
    registro() {
      this.router.navigate(['/registro']);
    }

    //Comprobar datos
    procederLogin() {
        var resultado = true;
        if (!this.validator.emailValido(this.model.email))
        {
          this.uiService.mostrarSnack("Email inválido");
          resultado = false;
        }
        else if (!this.validator.textoValido(this.model.password))
        {
          this.uiService.mostrarSnack("La contraseña debe ser mayor de 5");
          resultado = false;
        }

        if (resultado)
        {
          this.login();
        }
    }

    //Hacer llamada
    login() {
      this.usuarioService.login(this.model.email, this.model.password).subscribe(
                data => {                    
                    console.log(data);
                    if (data.codError == 0) {
                      //Guardar datos
                      window.localStorage.setItem('idUsuario', data.contenido.id);
                      window.localStorage.setItem('email', data.contenido.email);
                      window.localStorage.setItem('nombre', data.contenido.nombre);
                      window.localStorage.setItem('apellidos', data.contenido.apellidos);                      

                      //Ir a pantalla de deudas
                      this.router.navigate(['/deudas',{tipoDeuda: 1}]);
                      
                    }
                    else {
                      //Mensaje error
                      this.uiService.mostrarSnack("Nombre de usuario o contraseña incorrecta");
                    }
                },
                err => {
                    this.uiService.mostrarSnack("Error de conexión")
                },
                () => console.log("OK")
            );
       
    }    

    /*mostrarSnack(mensaje: string) {
                (function() {
                      'use strict';
                      var snackbarContainer : any = document.querySelector('#snackbar-container');
                      var handler = function(event : any) {
                          };      
                      var data = {
                                message: mensaje,
                                timeout: 10000
                              };
                      snackbarContainer.MaterialSnackbar.showSnackbar(data);      
                    }());
    }*/
}
