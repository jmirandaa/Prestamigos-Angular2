import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {KConexion} from '../servicios/KConexion';
import {Usuario} from '../modelo/Usuario';
import 'rxjs/add/operator/map';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class UsuarioService extends KConexion{
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {
        super();
     }

    //Comprobar usuario y contraseña
    login(email : string, password : string) {

        var url = this.URL_BASE+ '/usuarios/login?email=' + encodeURI(email) + '&password=' +encodeURI(password);
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    //Datos usuario
    datosUsuario(email : string) {
        var url = this.URL_BASE+ '/usuarios/usuario?email=' + encodeURI(email);
        var response = this.http.get(url).map(res => res.json());
        return response;        
    }

    //Editar datos de usuario
    editarUsuario(usuario : Usuario) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var url = this.URL_BASE+ '/usuarios/usuario';
        var response = this.http.put(url, JSON.stringify(usuario),options).map(res => res.json ());
        return response;        
    }

    //Listado de amigos
    amigos(email : string) {
        var url = this.URL_BASE+ '/usuarios/amigos?email=' + encodeURI(email);
        var response = this.http.get(url).map(res => res.json());
        return response;        
    }

    //Nuevo amigo
    nuevoInvitado(usuario : Usuario, emailOrigen : string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var url = this.URL_BASE+ '/usuarios/invitado?emailOrigen=' + emailOrigen;
        var response = this.http.post(url, JSON.stringify(usuario),options).map(res => res.json ());
        return response;
    }

    //Nuevo usuario
    nuevoUsuario(usuario : Usuario) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var url = this.URL_BASE+ '/usuarios/usuario';
        var response = this.http.post(url, JSON.stringify(usuario),options).map(res => res.json ());
        return response;
    }

}