import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {KConexion} from '../servicios/KConexion';
import {Usuario} from '../modelo/Usuario';
import {Operacion} from '../modelo/Operacion';
import 'rxjs/add/operator/map';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DeudasService extends KConexion{
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
        super();
    }
  
    //Comprobar usuario y contraseña
    deudas(id: number, tipo : number, saldada : boolean) {
        var url = this.URL_BASE + '/deudas/todasId?idUsuario=' + id + '&tipo=' +tipo + '&saldada=' +saldada;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    //Resumen
    resumen(id: number) {
        var url = this.URL_BASE + '/deudas/resumen?idUsuario=' + id;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    //Nueva operacion de deuda
    nuevaOperacion(operacion : Operacion, tipo : number)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var url = this.URL_BASE+ '/operaciones/operacion?tipoDeuda=' + tipo;
        var response = this.http.post(url, JSON.stringify(operacion),options).map(res => res.json ());
        return response;
    }

    //Nueva deuda
    nuevaDeuda(idOrigen : number, idDestino : number, cantidad : number, concepto : string, tipo : number)
    {
         var url = this.URL_BASE + '/deudas/deuda?idUsuarioOrigen=' + idOrigen + '&idDestino=' +idDestino + '&cantidad=' +cantidad +'&concepto=' + encodeURI(concepto) +'&tipo=' + tipo ;
        var response = this.http.post(url, null).map(res => res.json());
        return response;       
    }
}