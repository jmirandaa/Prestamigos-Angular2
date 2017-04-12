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
    templateUrl: 'deudas.component.html'
})

export class DeudasComponent implements OnInit {
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
        this.parametros = this.route.params.subscribe(params => {
            this.tipoDeuda = params['tipoDeuda'];
            this.idUsuario = window.localStorage.getItem('idUsuario');
            console.log("tipo: "+this.tipoDeuda);

            //Obtener deudas
          this.deudasService.deudas(this.idUsuario,this.tipoDeuda,false).subscribe(
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
                }
                else if (this.idUsuario == idUsuarioDestino) {
                    deuda.nombreDeudor = deuda.usuario.nombre+" "+deuda.usuario.apellidos;
                }
            }

            //Actualizar listado
            this.deudas = deudas;   
        }       
    }

    //Servicio de nueva operación
    nuevaOperacion(tipoOp : number)
    {
        console.log("idUsuario: "+this.idUsuario+", idDeuda: "+this.idDeuda+", tipoDeuda: "+this.tipoDeuda+", cantidad: "+this.cantidad+", tipoOp: "+tipoOp);

        //Recuperar datos
        var operacion = new Operacion();
        var usuario = new Usuario(this.idUsuario);
        var deuda = new Deuda(this.idDeuda);
        operacion.setCantidad(this.cantidad);
        operacion.setTipo(tipoOp);
        operacion.setUsuario(usuario);
        operacion.setDeuda(deuda);

        this.deudasService.nuevaOperacion(operacion, this.tipoDeuda).subscribe(
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

    //Navegar a nueva deuda
    nuevaDeuda() {
        this.router.navigate(['/nuevaDeuda',{tipoDeuda: this.tipoDeuda}]);
    }

    //Métodos de diálogo
    dialogoSaldar(idDeuda : number) {
        var dialogSaldar : any = document.querySelector('#dialog-d-saldar');
        this.idDeuda = idDeuda;
        dialogSaldar.showModal();       
    }

    dialogoAumentar(idDeuda : number) {
        var dialogAumentar : any = document.querySelector('#dialog-d-aumentar');
        this.idDeuda = idDeuda;
        dialogAumentar.showModal();       
    }    

    dialogoAceptarSaldar() {
        var dialogSaldar : any = document.querySelector('#dialog-d-saldar');
        console.log("aceptar saldar: "+this.cantidad);

        if (this.cantidad > 0){
            this.nuevaOperacion(0);
            dialogSaldar.close();
        }
        else{
            this.ui.mostrarSnack("La cantidad a saldar debe ser mayor que 0");
        }
    }

    dialogoAceptarIncrementar() {
        var dialogAumentar : any = document.querySelector('#dialog-d-aumentar');
        console.log("aceptar incrementar: "+this.cantidad);

        if (this.cantidad > 0)
        {
            this.nuevaOperacion(1);
            dialogAumentar.close();
        }
        else{
            this.ui.mostrarSnack("La cantidad a incrementar debe ser mayor que 0");
        }
    }    

    cancelarIncrementar(){
        var dialogAumentar : any = document.querySelector('#dialog-d-aumentar');
        dialogAumentar.close();
    } 

    cancelarSaldar(){
        var dialogSaldar : any = document.querySelector('#dialog-d-saldar');
        dialogSaldar.close();
    }        

}
