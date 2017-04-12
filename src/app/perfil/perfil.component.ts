declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ValidatorService} from '../servicios/validator.service';
import {UIService} from '../servicios/ui.service';
import {UsuarioService} from '../servicios/usuario.service';

import {Usuario} from '../modelo/Usuario';

@Component({
    moduleId: module.id,
    templateUrl: 'perfil.component.html'
})

export class PerfilComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    email : any;
    usuario : Usuario;

    constructor(private route: ActivatedRoute, private router: Router, private validator : ValidatorService,
        private ui : UIService, private usuarioService : UsuarioService) {
        this.email = window.localStorage.getItem('email');
        this.usuario = new Usuario(0);
        this.usuarioService.datosUsuario(this.email).subscribe(
            data => {
                console.log(data);
                if (data.codError == 0) {
                  this.usuario.setId(data.contenido.id);
                  this.usuario.setNombre(data.contenido.nombre);
                  this.usuario.setApellidos(data.contenido.apellidos);
                  this.usuario.setEmail(data.contenido.email);

                  this.model.nombre = this.usuario.getNombre();
                  this.model.apellidos = this.usuario.getApellidos();
                  this.model.email = this.usuario.getEmail();
                }
                else {
                    this.ui.mostrarSnack("Error al obtener datos de usuario");
                }
            },
             err => {
                this.ui.mostrarSnack("Error de conexión");
            },
             () => console.log("OK")                  
        ); 
     }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngAfterViewInit() {
        componentHandler.upgradeDom();
    }

    //Comprobar datos
    procederEditar() {
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
        else if (this.model.password != this.model.passwordRep)
        {
          this.ui.mostrarSnack("La contraseña no coincide");
          resultado = false;
        }        

        if (resultado)
        {
          this.editarPerfil();
        }        
    }

    //Servicio de nuevo usuario
    editarPerfil() {
        this.usuario.setNombre(this.model.nombre);
        this.usuario.setApellidos(this.model.apellidos);
        this.usuario.setPassword(this.model.password);

        this.usuarioService.editarUsuario(this.usuario).subscribe(
            data => {
                console.log(data);
                if (data.codError == 0) {
                  window.localStorage.setItem('nombre', this.model.nombre);
                  window.localStorage.setItem('apellidos', this.model.apellidos);
                  this.ui.mostrarSnack("¡Perfil actualizado!");
                }
                else {
                    this.ui.mostrarSnack("Error al actualizar usuario");
                }
            },
             err => {
                this.ui.mostrarSnack("Error de conexión");
            },
             () => console.log("OK")                  
        ); 
    }        

}
