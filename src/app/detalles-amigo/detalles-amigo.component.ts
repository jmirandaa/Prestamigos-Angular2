declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {ValidatorService} from '../servicios/validator.service';
import {UsuarioService} from '../servicios/usuario.service';
import {UIService} from '../servicios/ui.service';
import {Operacion} from '../modelo/Operacion';
import {Usuario} from '../modelo/Usuario';
import {Deuda} from '../modelo/Deuda';

@Component({
    moduleId: module.id,
    templateUrl: 'detalles-amigo.component.html'
})

export class DetallesAmigoComponent implements OnInit {
    model: any = {};
    parametros : any;
    loading = false;
    returnUrl: string;
    tipoDeuda: number;
    idDeuda : number;
    email : any;
    amigo: any;
    cantidad : number;

    constructor(private route: ActivatedRoute, private router: Router, private location : Location ,
        private validator : ValidatorService, private usuariosService : UsuarioService,
        private ui : UIService) {

        this.email = window.localStorage.getItem('email');
        this.parametros = this.route.params.subscribe(params => {
            let id = params['id'];
            let nombre = decodeURI(params['nombre']);
            let apellidos = decodeURI(params['apellidos']);
            let email = decodeURI(params['email']);

            this.amigo = new Object();
            this.amigo.id = id;
            this.amigo.nombre = nombre;
            this.amigo.apellidos = apellidos;
            this.amigo.email = email;
        });
  
     }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

     ngOnDestroy() {
        this.parametros.unsubscribe();
     }

    ngAfterViewInit() {
        componentHandler.upgradeDom();
    }

    atras() {
      this.location.back();
    }

}
