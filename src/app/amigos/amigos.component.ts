declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {ValidatorService} from '../servicios/validator.service';
import {UsuarioService} from '../servicios/usuario.service';
import {UIService} from '../servicios/ui.service';
import {Operacion} from '../modelo/Operacion';
import {Usuario} from '../modelo/Usuario';
import {Deuda} from '../modelo/Deuda';

@Component({
    moduleId: module.id,
    templateUrl: 'amigos.component.html'
})

export class AmigosComponent implements OnInit {
    model: any = {};
    parametros : any;
    loading = false;
    returnUrl: string;
    tipoDeuda: number;
    idDeuda : number;
    email : any;
    amigos: Array<any>;
    cantidad : number;

    constructor(private route: ActivatedRoute, private router: Router, private validator : ValidatorService, private usuariosService : UsuarioService,
        private ui : UIService) {

        this.email = window.localStorage.getItem('email');
        //Obtener deudas
        this.usuariosService.amigos(this.email).subscribe(
                    data => {
                        //this.movies = data.results; 
                        console.log(data);
                        if (data.codError == 0) {
                            this.procesarAmigos(data.contenido);
                        }
                        else {
                          this.ui.mostrarSnack("Error al obtener amigos");
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
    procesarAmigos(amigos : any){
        if (amigos != null)
        {
            //Actualizar listado
            this.amigos = amigos;   
        }       
    }

    //Ir a la página de detalles de amigo
    detallesAmigo(id : number, nombre : string, apellidos : string, email : string){
        console.log("id: "+id+", nombre: "+nombre+", apellidos: "+apellidos+", email: "+email);
        this.router.navigate(["/detallesAmigo", {id : id, nombre: encodeURI(nombre), apellidos: encodeURI(apellidos), email : encodeURI(email)}]);
    }

}
