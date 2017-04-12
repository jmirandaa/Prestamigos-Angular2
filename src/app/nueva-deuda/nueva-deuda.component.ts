declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import {ValidatorService} from '../servicios/validator.service';
import {DeudasService} from '../servicios/deudas.service';
import {UsuarioService} from '../servicios/usuario.service';
import {UIService} from '../servicios/ui.service';
import {Operacion} from '../modelo/Operacion';
import {Usuario} from '../modelo/Usuario';
import {Deuda} from '../modelo/Deuda';

@Component({
    moduleId: module.id,
    templateUrl: 'nueva-deuda.component.html'
})

export class NuevaDeudaComponent implements OnInit {
    model: any = {};
    parametros : any;
    loading = false;
    returnUrl: string;
    tipoDeuda: number;
    idDeuda : number;
    idUsuario : any;
    emailOrigen : any;
    deudas: Array<any>;
    cantidad : number;

    constructor(private route: ActivatedRoute, private router: Router, private location : Location,
        private validator : ValidatorService, private deudasService : DeudasService, private usuarioService : UsuarioService,
        private ui : UIService) {
        this.parametros = this.route.params.subscribe(params => {
            this.tipoDeuda = params['tipoDeuda'];
            this.idUsuario = window.localStorage.getItem('idUsuario');
            this.emailOrigen = window.localStorage.getItem('email');
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

    //Ir atrás
    atras() {
      this.location.back();
    }

    //Comprobar datos
    procederNuevaDeuda() {
        var resultado = true;
        if (!this.validator.textoValido(this.model.nombre))
        {
          this.ui.mostrarSnack("Nombre inválido");
          resultado = false;
        }
        else if (!this.validator.textoValido(this.model.concepto))
        {
          this.ui.mostrarSnack("El concepto debe ser mayor de 5");
          resultado = false;
        }
        else if (!(this.model.cantidad > 0)) {
          this.ui.mostrarSnack("La cantidad debe ser positiva");
          resultado = false;
        }

        if (resultado)
        {
          this.nuevaDeuda();
        }        
    }

    //Llamar al servicio de nueva deuda
    nuevaDeuda() {
        //Obtener nombre y apellidos
        var nombre : string = this.model.nombre;
        var split = nombre.split(" ");

        var usuario : Usuario = new Usuario(0);

        //Sólo tiene nombre
        if (split.length < 2)
        {
            usuario.setNombre(nombre);
            usuario.setApellidos("");
        }
        //Nombre y apellidos
        else
        {
            usuario.setNombre(split[0]);
            var apellidos : string = "";
            for (var i=1;i<split.length;i++)
            {
                if (i > 1)
                {
                    apellidos += " ";
                }
                apellidos += split[i];

            }
            usuario.setApellidos(apellidos);
        }

        //Servicio nuevo invitado
        this.usuarioService.nuevoInvitado(usuario, this.emailOrigen).subscribe(
            data => {
                console.log(data);
                if (data.codError == 0) {
                    let idDestino = data.contenido;
                    var origen : number, destino : number;
                    //console.log("idOrigen: "+this.idUsuario+", idDestino: "+idDestino+", cantidad: "+this.model.cantidad+", concepto: "+this.model.concepto+", tipo: "+this.tipoDeuda);
                    //En función del tipo, cambiar el orden de origen y destino
                    if (this.tipoDeuda == 1){
                        origen = idDestino;
                        destino = this.idUsuario;
                    }
                    else if (this.tipoDeuda == 2){
                        origen = this.idUsuario;
                        destino = idDestino;
                    }    

                    //Crear la deuda
                    this.deudasService.nuevaDeuda(origen, destino, this.model.cantidad, this.model.concepto, this.tipoDeuda).subscribe(
                        data => {
                            console.log(data);
                            if (data.codError == 0) {
                                //Volver atrás
                                this.location.back();
                            }
                            else {
                                this.ui.mostrarSnack("Error al crear deuda");
                            }
                        },
                        err => {
                            this.ui.mostrarSnack("Error de conexión");
                        },
                        () => console.log("OK")                  
                    );                     
                }
                else {
                    this.ui.mostrarSnack("Error al añadir amigo");
                }
            },
            err => {
                this.ui.mostrarSnack("Error de conexión");
            },
            () => console.log("OK")                  
        );         

        console.log(usuario.getNombre()+" "+usuario.getApellidos());
    }
       

}
