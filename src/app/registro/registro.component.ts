declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ValidatorService} from '../servicios/validator.service';
import {UIService} from '../servicios/ui.service';
import {UsuarioService} from '../servicios/usuario.service';

import {Usuario} from '../modelo/Usuario';

@Component({
    moduleId: module.id,
    templateUrl: 'registro.component.html'
})

export class RegistroComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute, private router: Router, private validator : ValidatorService,
        private ui : UIService, private usuarioService : UsuarioService) {

     }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngAfterViewInit() {
        componentHandler.upgradeDom();
    }

    atras() {
      this.router.navigate(["/"]);
    }

    //Comprobar datos
    procederRegistro() {
        var resultado = true;
        if (!this.validator.textoValidoCorto(this.model.nombre))
        {
          this.ui.mostrarSnack("Nombre demasiado corto (min 3)");
          resultado = false;
        }
        else if (!this.validator.textoValidoCorto(this.model.apellidos))
        {
          this.ui.mostrarSnack("Apellidos demasiado cortos (min 3)");
          resultado = false;
        }
        else if (!this.validator.emailValido(this.model.email)) {
          this.ui.mostrarSnack("Correo electrónico inválido");
          resultado = false;
        }
        else if (!this.validator.textoValido(this.model.password)) {
          this.ui.mostrarSnack("Contraseña demasiado corta (min 5)");
          resultado = false;
        }
        else if (this.model.email != this.model.emailRep)
        {
          this.ui.mostrarSnack("El correo electrónico no coincide");
          resultado = false;
        }
        else if (this.model.password != this.model.passwordRep)
        {
          this.ui.mostrarSnack("La contraseña no coincide");
          resultado = false;
        }        

        if (resultado)
        {
          this.registrarUsuario();
        }        
    }

    //Servicio de nuevo usuario
    registrarUsuario() {
        var usuario : Usuario = new Usuario(0);
        usuario.setNombre(this.model.nombre);
        usuario.setApellidos(this.model.apellidos);
        usuario.setEmail(this.model.email);
        usuario.setPassword(this.model.password);

        this.usuarioService.nuevoUsuario(usuario).subscribe(
            data => {
                console.log(data);
                if (data.codError == 0) {
                    //Login
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
                                      this.ui.mostrarSnack("Nombre de usuario o contraseña incorrecta");
                                    }
                                },
                                err => {
                                    this.ui.mostrarSnack("Error de conexión")
                                },
                                () => console.log("OK")
                            );
                }
                else {
                    this.ui.mostrarSnack("Error al crear usuario");
                }
            },
             err => {
                this.ui.mostrarSnack("Error de conexión");
            },
             () => console.log("OK")                  
        ); 
    }        

}
