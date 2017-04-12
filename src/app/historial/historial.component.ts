declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {ValidatorService} from '../servicios/validator.service';
import {DeudasService} from '../servicios/deudas.service';
import {UIService} from '../servicios/ui.service';
import {Operacion} from '../modelo/Operacion';
import {Usuario} from '../modelo/Usuario';
import {Deuda} from '../modelo/Deuda';

@Component({
    moduleId: module.id,
    templateUrl: 'historial.component.html'
})

export class HistorialComponent implements OnInit {
    model: any = {};
    parametros : any;
    loading = false;
    returnUrl: string;
    tipoDeuda: number;
    idDeuda : number;
    idUsuario : any;
    deudas: Array<any>;
    cantidad : number;

    constructor(private route: ActivatedRoute, private router: Router, private validator : ValidatorService, private deudasService : DeudasService,
        private ui : UIService) {

        this.idUsuario = window.localStorage.getItem('idUsuario');
        //Obtener deudas
        this.deudasService.deudas(this.idUsuario,0,true).subscribe(
                    data => {
                        //this.movies = data.results; 
                        console.log(data);
                        if (data.codError == 0) {
                            this.procesarDeudas(data.contenido);
                        }
                        else {
                          this.ui.mostrarSnack("Error al obtener deudas");
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

     ngOnDestroy() {

     }

    ngAfterViewInit() {
        componentHandler.upgradeDom();
    }

    atras() {
      this.router.navigate(["/"]);
    }

    //Procesar deudas
    procesarDeudas(deudas : any){
        if (deudas != null)
        {
            //Añadir nombre y apellidos
            for(let deuda of deudas) {
                let idUsuarioOrigen = deuda.usuario.id;
                let idUsuarioDestino = deuda.usuarioDestino.id;

                if (this.idUsuario == idUsuarioOrigen) {
                    deuda.nombreDeudor = deuda.usuarioDestino.nombre+" "+deuda.usuarioDestino.apellidos;
                    deuda.tipo = "(Le debía)";
                }
                else if (this.idUsuario == idUsuarioDestino) {
                    deuda.nombreDeudor = deuda.usuario.nombre+" "+deuda.usuario.apellidos;
                    deuda.tipo = "(Me debía)";
                }
            }

            //Actualizar listado
            this.deudas = deudas;   
        }       
    }

}
