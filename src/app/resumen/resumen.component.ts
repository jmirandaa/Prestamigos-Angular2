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
    templateUrl: 'resumen.component.html'
})

export class ResumenComponent implements OnInit {
    model: any = {};
    parametros : any;
    returnUrl: string;
    idUsuario : any;
    resumen : any;

    constructor(private route: ActivatedRoute, private router: Router, private validator : ValidatorService, private deudasService : DeudasService,
        private ui : UIService) {
        //Inicializar objeto
        this.resumen = new Object();
        this.idUsuario = window.localStorage.getItem('idUsuario');
        //Obtener deudas
        this.deudasService.resumen(this.idUsuario).subscribe(
                    data => {
                        //this.movies = data.results; 
                        console.log(data);
                        if (data.codError == 0) {
                            this.procesarResumen(data.contenido);
                        }
                        else {
                          this.ui.mostrarSnack("Error al obtener resumen");
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

    //Procesar deudas
    procesarResumen(resumen : any){
        if (resumen != null)
        {
            //Actualizar listado
            this.resumen = resumen;
        }       
    }

}
